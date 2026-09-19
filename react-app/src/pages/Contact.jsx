import PageHeader from '../components/PageHeader'
import StaticForm from '../replica/StaticForm'
import './Contact.css'

// Real content from content/contact-us.json's own source AST.
export default function Contact() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        intro="Platinum Paint Protection Film is a high-performance automotive film solution for buyers searching for a reliable paint protection film supplier with a dependable product path."
      />
      <div className="contact-page section-shell">
        <div className="contact-details">
          <h2>Get In Touch</h2>
          <div>
            <h3>Phone</h3>
            <p><a href="tel:+861812245867">+86 181 2245 8657</a></p>
            <p><a href="tel:+8615338077719">+86 153 3807-7719</a></p>
          </div>
          <div>
            <h3>Email</h3>
            <p><a href="mailto:info@platinumcarfilms.com">info@platinumcarfilms.com</a></p>
          </div>
          <div>
            <h3>Support</h3>
            <p>Support forum for over 24h</p>
          </div>
          <div>
            <h3>Address</h3>
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
          <h2>Send Us an Email</h2>
          <p>Do you have questions about how we can help your company? Send us an email and we&rsquo;ll get in touch shortly.</p>
          <StaticForm kind="inquiry" />
        </div>
      </div>
    </>
  )
}
