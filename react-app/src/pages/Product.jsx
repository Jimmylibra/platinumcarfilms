import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { PRODUCTS } from './products-data'
import './Product.css'

export default function Product() {
  return (
    <>
      <PageHeader
        breadcrumb={[['Home', '/'], ['Product']]}
        title="Product"
        intro="Eight paint protection film and window tint products for installers, distributors, and OEM buyers."
      />
      <div className="product-directory section-shell">
        {PRODUCTS.map((p) => (
          <Link className="product-card" to={`/${p.slug}`} key={p.slug}>
            <div className="product-card-image"><img src={p.image} alt={p.title} loading="lazy" /></div>
            <div className="product-card-body">
              <div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
              <i className="fa-solid fa-arrow-right product-card-arrow" aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
