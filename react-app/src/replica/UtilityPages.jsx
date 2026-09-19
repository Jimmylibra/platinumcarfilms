import { Link, useLocation } from 'react-router-dom'
import StaticForm from './StaticForm'

export function SearchResults({ entries }) {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const query = params.get('s')?.trim() || ''
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  const results = query ? entries.filter(page => !page.legacy && !page.route.startsWith('/author/') && !page.route.includes('/category/') && terms.every(term => `${page.title} ${page.searchText}`.toLowerCase().includes(term))) : []
  const totalPages = Math.max(1, Math.ceil(results.length / 9))
  const current = Math.max(1, Math.min(totalPages, Number(params.get('page')) || 1))
  return <main id="main-content" className="replica-utility"><h1>{query ? `Search results for “${query}”` : 'Search the website'}</h1><StaticForm kind="search" /><p>{query ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Search products, film information, and articles.'}</p>{query && !results.length && <div className="replica-empty"><h2>Nothing found</h2><p>Try another product name or a shorter search.</p></div>}<div className="replica-results">{results.slice((current - 1) * 9, current * 9).map(page => <article key={page.route}>{page.image && <Link to={page.route} tabIndex={-1} aria-hidden="true"><img src={page.image} alt="" loading="lazy" /></Link>}<h2><Link to={page.route}>{page.title}</Link></h2><p>{page.description}</p><Link to={page.route}>Read more</Link></article>)}</div>{totalPages > 1 && <nav className="replica-pagination" aria-label="Search results pages">{Array.from({ length: totalPages }, (_, i) => <Link key={i} aria-current={current === i + 1 ? 'page' : undefined} to={`/?s=${encodeURIComponent(query)}&page=${i + 1}`}>{i + 1}</Link>)}</nav>}</main>
}

export function MissingPage({ legacy = false }) {
  return <main id="main-content" className="replica-utility replica-empty"><h1>{legacy ? 'Contact our sales team' : 'Page not found'}</h1><p>{legacy ? 'For product pricing and orders, please contact Platinum Car Films directly.' : 'The page you’re looking for could not be found.'}</p><Link className="replica-button" to={legacy ? '/contact-us/' : '/'}>{legacy ? 'Contact Us' : 'Back to Home'}</Link></main>
}
