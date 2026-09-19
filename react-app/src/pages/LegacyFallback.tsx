import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useInteractions } from '../replica/InteractionContext'
import './PolicyPage.css'

export default function LegacyFallback({ title }: { title: string }) {
  const { openQuote } = useInteractions()
  return (
    <>
      <PageHeader title={title} />
      <div className="policy-page section-shell" style={{ textAlign: 'center' }}>
        <p>This function isn't available in this static preview version of the site.</p>
        <p>
          <Link to="/product">Browse Products</Link>
          {' · '}
          <button type="button" className="text-link" style={{ display: 'inline', padding: 0, background: 'none', border: 0, cursor: 'pointer' }} onClick={openQuote}>
            Contact Sales
          </button>
        </p>
      </div>
    </>
  )
}
