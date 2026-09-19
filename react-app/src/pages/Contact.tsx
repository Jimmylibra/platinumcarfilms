import PageHeader from '../components/PageHeader'
import StaticForm from '../replica/StaticForm'
import './Contact.css'

export default function Contact() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        intro="Share your product requirements, target market, and expected order quantity to receive the right recommendation before you buy."
      />
      <div className="contact-page section-shell">
        <div className="contact-details">
          <div>
            <h2>Contact</h2>
            <p><a href="tel:+861812245867">+86 181 2245 8657</a></p>
            <p><a href="tel:+8615338077719">+86 153 3807-7719</a></p>
          </div>
          <div>
            <h2>Email</h2>
            <p><a href="mailto:info@platinumcarfilms.com">info@platinumcarfilms.com</a></p>
          </div>
          <div>
            <h2>Address</h2>
            <p>No. 43, Magangling, Shima, Baiyun District, Guangzhou, Guangdong Province, China</p>
            <a
              className="map-link"
              href="https://www.google.com/maps/search/?api=1&query=No.+43+Magangling+Shima+Baiyun+District+Guangzhou"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
        <div className="contact-form-panel">
          <h2>Request a Quote</h2>
          <p>Tell us what you need. Find the right film for your business.</p>
          <StaticForm kind="inquiry" />
        </div>
      </div>
    </>
  )
}
