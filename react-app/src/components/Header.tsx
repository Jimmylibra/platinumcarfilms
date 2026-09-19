import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useInteractions } from '../replica/InteractionContext'
import './Header.css'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about-us', label: 'About Us' },
  { to: '/product', label: 'Product' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/warranty', label: 'Warranty' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact-us', label: 'Contact Us' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { openQuote } = useInteractions()

  // close the mobile menu on route change / resize back to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header className={`site-header ${menuOpen ? 'menu-open' : ''}`}>
      <div className="site-header-inner">
        <NavLink to="/" className="brand" aria-label="Platinum PPF home" onClick={() => setMenuOpen(false)}>
          <img src="/assets/original/64f0dbbda455-logo.png" alt="Platinum PPF" />
        </NavLink>

        <div className="mobile-menu-panel">
          <nav className={`site-nav ${menuOpen ? 'open' : ''}`} aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="quote-btn"
            onClick={() => { setMenuOpen(false); openQuote() }}
          >
            Get a Quote
          </button>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}
