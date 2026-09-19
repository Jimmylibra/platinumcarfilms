import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-about">
          <div className="brand">
            Platinum<span className="brand-accent">PPF</span>
          </div>
          <p>
            Paint protection film manufacturing and B2B supply for
            installers, distributors, resellers, and private-label buyers.
          </p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/about-us">About Us</Link>
          <Link to="/product">Product</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/warranty">Warranty</Link>
        </div>

        <div className="footer-col">
          <h4>Business</h4>
          <Link to="/contact-us">Wholesale Pricing</Link>
          <Link to="/contact-us">OEM / ODM</Link>
          <Link to="/blog">Blog</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <a href="mailto:info@platinumcarfilms.com">
            info@platinumcarfilms.com
          </a>
          <span>No. 43, Magangling, Shima, Baiyun District, Guangzhou</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} PLATINUMCARFILMS.COM</span>
        <div className="footer-legal">
          <Link to="/shipping-policy">Shipping Policy</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/refund-policy">Refund Policy</Link>
          <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  )
}
