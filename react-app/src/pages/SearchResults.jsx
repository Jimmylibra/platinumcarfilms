import { Link, useSearchParams } from 'react-router-dom'
import { PRODUCTS } from './products-data'
import './SearchResults.css'

const PAGES = [
  { route: '/about-us', title: 'About Us', description: "A paint protection film manufacturer and supplier for installers, distributors, and OEM buyers." },
  { route: '/product', title: 'Product', description: 'Eight paint protection film and window tint products.' },
  { route: '/gallery', title: 'Gallery', description: 'Installation photos.' },
  { route: '/warranty', title: 'Warranty', description: 'Warranty coverage, exclusions, and duration.' },
  { route: '/blog', title: 'Blog', description: 'Articles on paint protection film.' },
  { route: '/contact-us', title: 'Contact Us', description: 'Request a quote, phone, email, and address.' },
  ...PRODUCTS.map((p) => ({ route: `/${p.slug}`, title: p.title, description: p.description })),
]

export default function SearchResults() {
  const [params] = useSearchParams()
  const query = (params.get('s') || '').trim()
  const results = query
    ? PAGES.filter((p) => (p.title + ' ' + p.description).toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <div className="search-results section-shell">
      <h1>{query ? `Search results for "${query}"` : 'Search'}</h1>
      {!query && <p>Type a search term to find pages and products.</p>}
      {query && (
        <p className="result-count">{results.length} result{results.length === 1 ? '' : 's'}</p>
      )}
      {query && results.length === 0 && (
        <div className="no-results">
          <p>No matches for "{query}".</p>
          <p><Link to="/product">Browse Products</Link> &middot; <Link to="/contact-us">Contact Us</Link></p>
        </div>
      )}
      <ul className="result-list">
        {results.map((r) => (
          <li key={r.route}>
            <Link to={r.route}>{r.title}</Link>
            <p>{r.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
