import './PageHeader.css'

export default function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="page-header">
      <div className="page-header-inner">
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </section>
  )
}
