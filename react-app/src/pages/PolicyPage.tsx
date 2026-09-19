import PageHeader from '../components/PageHeader'
import './PolicyPage.css'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function PolicyPage({ title, html, note }: { title: string; html: string; note?: string }) {
  // Give each h2 a stable id and build a matching contents list from the
  // same pass, so the anchors always match what's actually in the body
  // (per plan 16C L02: "Plain anchor list matching headings below").
  const headings: { id: string; text: string }[] = []
  const htmlWithIds = html.replace(/<h2>(.*?)<\/h2>/g, (_match, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').trim()
    const id = slugify(text)
    headings.push({ id, text })
    return `<h2 id="${id}">${inner}</h2>`
  })

  return (
    <>
      <PageHeader title={title} />
      <article className="policy-page section-shell">
        {note && <p className="policy-note">{note}</p>}
        {headings.length > 3 && (
          <nav className="policy-toc" aria-label="On this page">
            <span className="policy-toc-label">On this page</span>
            <ol>
              {headings.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}
            </ol>
          </nav>
        )}
        <div dangerouslySetInnerHTML={{ __html: htmlWithIds }} />
      </article>
    </>
  )
}
