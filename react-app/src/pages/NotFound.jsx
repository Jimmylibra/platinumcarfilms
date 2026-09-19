import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="section section-shell" style={{ textAlign: 'center' }}>
      <h1>Page not found</h1>
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </div>
  )
}
