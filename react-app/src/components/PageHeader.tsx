import { Link } from 'react-router-dom'
import './PageHeader.css'

type PageHeaderProps = {
  title: string
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="section-shell">
        <h1>{title}</h1>
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{title}</span>
        </div>
      </div>
    </div>
  )
}
