import PageHeader from '../components/PageHeader'
import './PolicyPage.css'

export default function PolicyPage({ title, html, note }: { title: string; html: string; note?: string }) {
  return (
    <>
      <PageHeader title={title} />
      <article className="policy-page section-shell">
        {note && <p className="policy-note">{note}</p>}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </>
  )
}
