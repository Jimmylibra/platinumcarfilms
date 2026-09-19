import { Link } from 'react-router-dom'
import StaticForm from '../replica/StaticForm'
import './Footer.css'

const SOCIALS = [
  { icon: 'fa-facebook-f', label: 'Facebook' },
  { icon: 'fa-x-twitter', label: 'X' },
  { icon: 'fa-instagram', label: 'Instagram' },
  { icon: 'fa-youtube', label: 'YouTube' },
  { icon: 'fa-pinterest-p', label: 'Pinterest' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-about">
          <img className="footer-logo" src="/assets/original/64f0dbbda455-logo.png" alt="Platinum PPF" />
          <p>
            Platinum Car Films is a Chinese PPF manufacturer offering
            self-healing paint protection film with wholesale pricing and
            OEM customization for distributors, installers, and automotive
            resellers globally.
          </p>
          <div className="footer-social" aria-label="Social links">
            {SOCIALS.map((s) => (
              <span key={s.icon} className="social-icon" aria-label={s.label} title={`${s.label} (link not captured in source)`}>
                <i className={`fa-brands ${s.icon}`} aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Contact Info</h4>
          <p>
            <strong>Contact</strong>
            <br />
            <a href="tel:+861812245867">+86 181 2245 8657</a>
            <br />
            <a href="tel:+8615338077719">+86 153 3807-7719</a>
          </p>
          <p>
            <strong>Email</strong>
            <br />
            <a href="mailto:info@platinumcarfilms.com">info@platinumcarfilms.com</a>
          </p>
          <p>
            <strong>Address</strong>
            <br />
            No. 43, Magangling, Shima, Baiyun District, Guangzhou, Guangdong Province, China
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/product">Product</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/warranty">Warranty</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact-us">Contact Us</Link>
        </div>

        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>Subscribe For Newsletters</p>
          <StaticForm kind="newsletter" />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-legal">
          <Link to="/shipping-policy">Shipping Policy</Link>
          <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/refund-policy">Refund Policy</Link>
        </div>
        <span className="copyright">© {new Date().getFullYear()} PLATINUMCARFILMS.COM</span>
      </div>
    </footer>
  )
}
