import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <section className="hero">
      <div className="section-shell hero-inner">
        <div className="eyebrow">PPF Protection Film Supplier</div>
        <h1>
          Paint Protection Film{' '}
          <span className="accent">Manufacturer and Supplier</span> for
          Installers, Distributors, and OEM Buyers
        </h1>
        <p className="description">
          Platinum Paint Protection Film is a high-performance automotive
          film solution for buyers searching for a reliable paint
          protection film supplier with a dependable product path.
        </p>
        <div className="cta-wrap">
          <Link className="primary" to="/contact-us">
            Request Wholesale Price
          </Link>
          <Link className="secondary" to="/product">
            Explore PPF Range
          </Link>
        </div>
      </div>
    </section>
  )
}
