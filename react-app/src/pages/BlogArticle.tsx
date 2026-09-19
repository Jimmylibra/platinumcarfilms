import PageHeader from '../components/PageHeader'
import './PolicyPage.css'

export default function BlogArticle() {
  return (
    <>
      <PageHeader title="How long does paint protection film last" />
      <article className="policy-page section-shell">
        <p className="policy-note">
          Full article body extraction is pending -- the source page's markup
          is deeply nested WordPress page-builder output (32KB) that needs a
          proper cleanup pass rather than a raw dump, so nothing invented is
          shown here in the meantime. See docs/IMPLEMENTATION-STATUS.md.
        </p>
        <img
          src="/assets/original/0569f11089cb-42-1024x1024.webp"
          alt="How long does paint protection film last"
          style={{ width: '100%', borderRadius: 12, marginBottom: 24 }}
        />
      </article>
    </>
  )
}
