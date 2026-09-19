import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import './PolicyPage.css'

export default function Terms() {
  return (
    <>
      <PageHeader breadcrumb={[['Home', '/'], ['Terms & Conditions']]} title="Terms & Conditions" />
      <article className="policy-page section-shell">
        <p>Terms &amp; Conditions are not yet available. Please contact us directly with any questions.</p>
        <p><Link to="/contact-us">Contact Us</Link></p>
      </article>
    </>
  )
}
