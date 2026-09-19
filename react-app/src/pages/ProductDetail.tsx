import { Link, Navigate, useLocation } from 'react-router-dom'
import { useInteractions } from '../replica/InteractionContext'
import { PRODUCTS } from './products-data'
import './ProductDetail.css'

export default function ProductDetail() {
  // Each product has its own literal route (registered per-slug in App.tsx,
  // not a shared ":slug" param) so URLs stay exact real routes matching the
  // plan's route table; deriving the slug from the path keeps this in sync
  // with that registration instead of duplicating it via useParams.
  const slug = useLocation().pathname.replace(/^\/|\/$/g, '')
  const { openQuote } = useInteractions()
  const product = PRODUCTS.find((p) => p.slug === slug)
  if (!product) return <Navigate to="/product" replace />

  return (
    <article className="product-detail">
      <div className="product-detail-hero section-shell">
        <div className="product-detail-copy">
          <p className="breadcrumb"><Link to="/product">Product</Link> / {product.title}</p>
          <h1>{product.title}</h1>
          <p className="lead">{product.description}</p>
          <div className="product-detail-actions">
            <button type="button" className="button" onClick={openQuote}>Request a Quote</button>
            <Link className="text-link" to="/gallery">View Gallery</Link>
          </div>
        </div>
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} loading="eager" />
        </div>
      </div>

      <div className="product-detail-note section-shell">
        <p>
          Full page-specific content (problem/solution copy, feature-benefit
          table, specifications, FAQs) for this product is still pending a
          per-product source-content pass -- see docs/IMPLEMENTATION-STATUS.md.
          The title, summary, and image above are sourced from the site's
          real product data, not placeholder text.
        </p>
      </div>
    </article>
  )
}
