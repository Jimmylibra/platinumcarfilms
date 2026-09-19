import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import './PolicyPage.css'

export default function Terms() {
  return (
    <>
      <PageHeader title="Terms & Conditions" />
      <article className="policy-page section-shell">
        <p>Terms are not available in this preview.</p>
        <p>
          The original site's Terms &amp; Conditions page was never filled in
          with real terms &mdash; it still contains the WordPress theme's
          generic placeholder text explaining what a terms page should
          cover, not actual business terms. Real terms need to be drafted
          and approved before this route can go live (tracked in the
          content-decision log).
        </p>
        <p><Link to="/contact-us">Contact Us</Link></p>
      </article>
    </>
  )
}
