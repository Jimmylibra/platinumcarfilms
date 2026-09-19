import { Link } from 'react-router-dom'
import { useInteractions } from '../replica/InteractionContext'
import { PRODUCTS } from './products-data'
import { PRODUCT_IMAGES } from './product-images'
import data190 from './design-data/products/190-micron-ppf.json'
import dataHeadlight from './design-data/products/headlight-paint-protection-film.json'
import dataMatte from './design-data/products/matte-paint-protection-film.json'
import dataSatin from './design-data/products/satin-paint-protection-film.json'
import dataGlossBlack from './design-data/products/gloss-black-paint-protection-film-190-microns.json'
import dataWindowTint from './design-data/products/window-tint-film-for-cars-platinum-car-films.json'
import dataColor from './design-data/products/color-ppf-for-car.json'
import './ProductPage.css'

interface ProductContent {
  slug: string
  intro: { h1: string; lead: string; promises: string[] }
  problem: { title: string; stats: [string, string][]; paragraphs: string[] }
  solution: { title: string; body: string[] }
  features: { title: string; rows: string[][]; note: string }
  audience: { title: string; cards: [string, string][] }
  comparison: { title: string; rows: [string, string][] }
  faq: { title: string; intro: string; items: [string, string][] }
  cta: { title: string; intro: string; actions: [string, string][] }
}

// Real content extracted from each product's own source AST in
// content/<slug>.json (see tools scratch extraction, reproducible), not
// invented. Some products' source genuinely lacks a comparison section
// (headlight, satin, gloss-black) -- that section is omitted rather than
// filled with placeholder text, per the plan's "missing source sections
// are not permission to invent replacements."
const DATA: Record<string, ProductContent> = {
  '190-micron-ppf': data190 as unknown as ProductContent,
  'headlight-paint-protection-film': dataHeadlight as unknown as ProductContent,
  'matte-paint-protection-film': dataMatte as unknown as ProductContent,
  'satin-paint-protection-film': dataSatin as unknown as ProductContent,
  'gloss-black-paint-protection-film-190-microns': dataGlossBlack as unknown as ProductContent,
  'window-tint-film-for-cars-platinum-car-films': dataWindowTint as unknown as ProductContent,
  'color-ppf-for-car': dataColor as unknown as ProductContent,
}

export default function ProductPageGeneric({ slug }: { slug: string }) {
  const { openQuote } = useInteractions()
  const data = DATA[slug]
  const meta = PRODUCTS.find((p) => p.slug === slug)
  const images = PRODUCT_IMAGES[slug]
  if (!data || !meta) return null

  const otherProducts = PRODUCTS.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <article className="product-page">
      <section className="pp-intro section-shell">
        <div className="pp-intro-copy">
          <p className="breadcrumb"><Link to="/product">Product</Link> / {meta.title}</p>
          <h1>{data.intro.h1}</h1>
          <p className="lead">{data.intro.lead}</p>
          {data.intro.promises.length > 0 && (
            <ul className="pp-promise-list">
              {data.intro.promises.map((p) => <li key={p}>{p}</li>)}
            </ul>
          )}
          <div className="pp-actions">
            <button type="button" className="button" onClick={openQuote}>Request a Quote</button>
            <Link className="text-link" to="/gallery">View Gallery</Link>
          </div>
        </div>
        <div className="pp-intro-media">
          <img src={images?.hero ?? meta.image} alt={meta.title} loading="eager" />
        </div>
      </section>

      <section className="pp-section pp-alt">
        <div className="section-shell">
          <h2>{data.problem.title}</h2>
          {data.problem.stats.length > 0 && (
            <div className="pp-stat-row">
              {data.problem.stats.map(([title, detail]) => (
                <div className="pp-stat" key={title}><strong>{title}</strong><span>{detail}</span></div>
              ))}
            </div>
          )}
          {data.problem.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      <section className="pp-section">
        <div className={`section-shell ${images?.solution ? 'pp-solution' : ''}`}>
          <div>
            <h2>{data.solution.title}</h2>
            {data.solution.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          {images?.solution && (
            <div className="pp-solution-media">
              <img src={images.solution} alt={`${meta.title} detail`} loading="lazy" />
            </div>
          )}
        </div>
      </section>

      <section className="pp-section pp-alt">
        <div className="section-shell">
          <h2>{data.features.title}</h2>
          <div className="pp-table-wrap">
            <table className="pp-table">
              <thead><tr><th>Feature</th><th>Advantage</th><th>Business Benefit</th></tr></thead>
              <tbody>
                {data.features.rows.map((row, i) => (
                  <tr key={i}>{row.map((c, j) => <td key={j}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.features.note && <p className="pp-table-note">{data.features.note}</p>}
        </div>
      </section>

      <section className="pp-section">
        <div className="section-shell">
          <h2>{data.audience.title}</h2>
          <div className="pp-audience-grid">
            {data.audience.cards.map(([title, body]) => (
              <div className="pp-audience-card" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
                <button type="button" className="text-link" onClick={openQuote}>Get a Quote</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {data.comparison.rows.length > 0 && (
        <section className="pp-section pp-alt">
          <div className="section-shell">
            <h2>{data.comparison.title}</h2>
            <div className="pp-table-wrap">
              <table className="pp-table">
                <tbody>
                  {data.comparison.rows.map(([label, body], i) => (
                    <tr key={i}>{label && <td className="pp-table-label">{label}</td>}<td>{body}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {data.faq.items.length > 0 && (
        <section className="pp-section">
          <div className="section-shell pp-faq">
            <h2>{data.faq.title}</h2>
            <div className="pp-faq-list">
              {data.faq.items.map(([q, a], i) => (
                <details className="faq-item" key={q} open={i === 0}>
                  <summary>{q}<i className="fa-solid fa-plus faq-toggle" aria-hidden="true" /></summary>
                  <div className="faq-body"><p>{a}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pp-cta">
        <div className="section-shell">
          <h2>{data.cta.title}</h2>
          {data.cta.intro && <p>{data.cta.intro}</p>}
          {data.cta.actions.length > 0 && (
            <div className="pp-cta-actions">
              {data.cta.actions.map(([title, body]) => (
                <div key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <button type="button" className="button" onClick={openQuote}>Get a Quote</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <nav className="pp-related section-shell" aria-label="Related products">
        {otherProducts.map((p) => <Link key={p.slug} to={`/${p.slug}`}>{p.title}</Link>)}
        <Link to="/product">All products</Link>
      </nav>
    </article>
  )
}
