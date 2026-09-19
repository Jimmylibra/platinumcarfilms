import { Link } from 'react-router-dom'
import './PageHeader.css'

// breadcrumb: [label, to?][] -- last item with no `to` renders as the current page (no link).
export default function PageHeader({ title, intro, breadcrumb, eyebrow }) {
  return (
    <section className="page-header">
      <div className="page-header-inner">
        {breadcrumb && (
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            {breadcrumb.map(([label, to], i) => (
              <span key={label}>
                {i > 0 && <span className="page-breadcrumb-sep">/</span>}
                {to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <span className="page-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </section>
  )
}
