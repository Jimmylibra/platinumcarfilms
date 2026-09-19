import PageHeader from '../components/PageHeader'
import './PolicyPage.css'

export default function Terms() {
  return (
    <>
      <PageHeader title="Terms & Conditions" />
      <article className="policy-page section-shell">
        <p className="policy-note">
          The original site's Terms &amp; Conditions page was never filled in with
          real terms &mdash; it still contains the WordPress theme's generic
          placeholder text explaining what a terms page *should* cover, not
          actual business terms. There is nothing here to preserve or migrate.
          This is tracked as a client decision item (see the content-decision
          log): real terms need to be drafted before this route can go live.
        </p>
        <p>Route reserved at <code>/terms-and-conditions/</code>, pending real content.</p>
      </article>
    </>
  )
}
