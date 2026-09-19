import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import './Blog.css'

export default function Blog() {
  return (
    <>
      <PageHeader title="Blog" intro="Articles on paint protection film for buyers, installers, and distributors." />
      <div className="blog-index section-shell">
        <Link className="blog-card" to="/blog/how-long-does-paint-protection-film-last">
          <div className="blog-card-image">
            <img
              src="/assets/original/0569f11089cb-42-1024x1024.webp"
              alt="How long does paint protection film last"
              loading="lazy"
            />
          </div>
          <div className="blog-card-body">
            <h3>How long does paint protection film last</h3>
            <p>Read the full article for install life, care, and durability factors.</p>
            <span className="text-link">Read article &rarr;</span>
          </div>
        </Link>
        <p className="blog-note">
          This is the one real article available from the source site. Category
          and author archives reuse this same listing (see /blog/category/ppf/
          and /author/autoboost018/), matching the source's actual content
          volume rather than padding the layout with invented posts.
        </p>
      </div>
    </>
  )
}
