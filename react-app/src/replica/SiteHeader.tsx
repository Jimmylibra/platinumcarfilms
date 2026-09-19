import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useInteractions } from './InteractionContext'
import Icon from './Icon'

const links = [['/', 'Home'], ['/about-us/', 'About Us'], ['/product/', 'Product'], ['/gallery/', 'Gallery'], ['/warranty/', 'Warranty'], ['/blog/', 'Blog'], ['/contact-us/', 'Contact Us']]

export default function SiteHeader({ logo }: { logo: string }) {
  const [open, setOpen] = useState(false)
  const { openQuote } = useInteractions()
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', escape)
    return () => document.removeEventListener('keydown', escape)
  }, [])
  return <header className="replica-header"><div className="replica-header-inner">
    <NavLink to="/" className="replica-logo" aria-label="Platinum Car Films home" onClick={() => setOpen(false)}><img src={logo} alt="Platinum Car Films" width="170" height="60" /></NavLink>
    <nav id="site-navigation" className={`replica-navigation ${open ? 'is-open' : ''}`} aria-label="Main navigation">{links.map(([href, label]) => <NavLink key={href} to={href} end={href === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}</nav>
    <button className="replica-button replica-header-quote" onClick={() => { setOpen(false); openQuote() }}>Get a Quote</button>
    <button className="replica-menu-toggle" aria-controls="site-navigation" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
  </div></header>
}
