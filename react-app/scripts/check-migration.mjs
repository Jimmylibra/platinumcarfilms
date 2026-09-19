import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'

const root = process.cwd()
const publicRoot = path.join(root, 'public')
const entries = JSON.parse(fs.readFileSync(path.join(publicRoot, 'content/index.json'), 'utf8'))
const shared = JSON.parse(fs.readFileSync(path.join(publicRoot, 'content/shared.json'), 'utf8'))
assert.equal(entries.length, 25)
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
const errors = []
const originalError = console.error
console.error = (...args) => { errors.push(args.map(String).join(' ')); originalError(...args) }
let nodes = 0, media = 0, accordions = 0, gallery = 0
const routes = new Set(entries.map(page => page.route))
function walk(node, route) {
  if (typeof node === 'string') return
  nodes++
  assert.ok(!['script', 'iframe', 'object', 'embed'].includes(node.tag), `${route}: executable embed`)
  assert.ok(!Object.keys(node.attrs).some(key => key.startsWith('on')), `${route}: event attribute`)
  for (const field of ['src', 'href']) {
    const value = node.attrs[field]
    if (!value) continue
    assert.ok(!value.toLowerCase().startsWith('javascript:'), `${route}: javascript URL`)
    if (value.startsWith('/assets/')) {
      assert.ok(fs.existsSync(path.join(publicRoot, value)), `${route}: missing ${value}`)
      media++
    }
    if (field === 'href' && value.startsWith('/') && !value.startsWith('/assets/')) {
      const parsed = new URL(value, 'https://local.test')
      const normalized = parsed.pathname === '/' ? '/' : parsed.pathname.replace(/\/$/, '') + '/'
      assert.ok(routes.has(normalized), `${route}: unknown link ${value}`)
    }
  }
  if (node.kind === 'accordion') accordions++
  if (node.kind === 'gallery-item' && route === '/gallery/') gallery++
  for (const value of [node.fullImage, node.thumbnail].filter(Boolean)) assert.ok(fs.existsSync(path.join(publicRoot, value)), `Missing gallery resource ${value}`)
  node.children.forEach(child => walk(child, route))
}
try {
  const { default: Renderer } = await vite.ssrLoadModule('/src/replica/ContentRenderer.tsx')
  for (const entry of entries) {
    const data = JSON.parse(fs.readFileSync(path.join(publicRoot, entry.file), 'utf8'))
    walk(data.content, entry.route)
    for (const stylesheet of data.styles) assert.ok(fs.existsSync(path.join(publicRoot, stylesheet)))
    const html = renderToStaticMarkup(React.createElement(MemoryRouter, null, React.createElement(Renderer, { node: data.content })))
    assert.ok(html.length > 100, `${entry.route}: empty rendered content`)
    assert.ok(!html.includes('<script'), `${entry.route}: script output`)
    if (!entry.legacy) assert.ok(!html.includes('[woocommerce_'), `${entry.route}: shortcode output`)
  }
  walk(shared.footer, 'footer')
  renderToStaticMarkup(React.createElement(MemoryRouter, null, React.createElement(Renderer, { node: shared.footer })))
  assert.equal(gallery, 136)
  assert.ok(accordions > 50)
  assert.equal(errors.length, 0, `React render warnings: ${errors.length}`)
  console.log(JSON.stringify({ pages: entries.length, nodes, mediaReferences: media, accordions, galleryItems: gallery, reactWarnings: errors.length }, null, 2))
} finally {
  console.error = originalError
  await vite.close()
}
