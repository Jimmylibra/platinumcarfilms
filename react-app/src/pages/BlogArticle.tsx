import PageHeader from '../components/PageHeader'
import article from './design-data/blog-article.json'
import './BlogArticle.css'

interface ArticleSection { heading: string; paragraphs: string[]; list: string[] }
interface ArticleData {
  title: string
  introParagraphs: string[]
  introList: string[]
  sections: ArticleSection[]
  faqs: [string, string][]
}

// Real content extracted from the article's own source AST in
// content/blog__how-long-does-paint-protection-film-last.json -- not
// invented. The source title ("How long does paint protection film last")
// doesn't match its actual body (a DIY installation how-to guide) -- a
// known title/body mismatch logged in docs/CONTENT-DECISION-LOG.md,
// preserved as-is rather than silently retitled.
const data = article as ArticleData

export default function BlogArticle() {
  return (
    <>
      <PageHeader title={data.title} />
      <article className="blog-article section-shell">
        <img
          src="/assets/original/0569f11089cb-42-1024x1024.webp"
          alt={data.title}
          className="blog-article-hero"
        />
        {data.introParagraphs.map((p, i) => <p key={i}>{p}</p>)}
        {data.introList.length > 0 && (
          <ul>{data.introList.map((x) => <li key={x}>{x}</li>)}</ul>
        )}

        {data.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            {s.list.length > 0 && <ul>{s.list.map((x) => <li key={x}>{x}</li>)}</ul>}
          </section>
        ))}

        {data.faqs.length > 0 && (
          <section className="blog-article-faq">
            <h2>FAQ</h2>
            <div className="blog-faq-list">
              {data.faqs.map(([q, a], i) => (
                <details className="faq-item" key={q} open={i === 0}>
                  <summary>{q}<i className="fa-solid fa-plus faq-toggle" aria-hidden="true" /></summary>
                  <div className="faq-body"><p>{a}</p></div>
                </details>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
