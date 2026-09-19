import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useInteractions } from '../replica/InteractionContext'
import SearchResults from './SearchResults'
import './Home.css'

const STATS = [
  { value: '7.5', label: 'Mil Option' },
  { value: '8.5', label: 'Mil Premium' },
  { value: '100', label: '% PPF Base' },
  { value: '24', label: 'Hr B2B Support' },
]

const BANNERS = [
  { src: '/assets/original/c14ff1f0672c-tpu-color-ppf-stand-out-with-color-banner-1.jpg', alt: 'TPU colour-shift paint protection film banner: 180-degree colour PPF, imported material' },
  { src: '/assets/original/9cc41d34386f-become-a-ppf-dealer-platinum-ppf-banner.jpg', alt: 'Become a Platinum PPF dealer banner: join our paint protection film distributor network' },
  { src: '/assets/original/1e247b35c931-paint-protection-film-layer-structure-diagram.jpg', alt: 'Paint protection film layer structure: top-coat, TPU film, and adhesive layers with self-healing and hydrophobic properties' },
  { src: '/assets/original/aeb3d1dd87f5-platinum-window-tint-film-percentage-options-banner.jpg', alt: 'Platinum window film tint percentage options: 70%, 50%, 35%, 20%, 5%' },
]

const FEATURES = [
  { icon: 'fa-layer-group', title: 'Polymer base', image: '/assets/original/eea44f2b1a11-sli1.webp', imageAlt: 'Polymer base visual', advantage: 'Supports elasticity, durability, and paint-surface protection compared with basic film alternatives.', benefit: 'Installers can offer a more professional protection solution with better confidence.' },
  { icon: 'fa-certificate', title: 'Material positioning', image: '/assets/original/1243fec22243-sl2.jpg', imageAlt: 'Material positioning visual', advantage: 'Connects the product to a recognized PPF material ecosystem.', benefit: 'Sellers have a stronger quality story to explain to customers.' },
  { icon: 'fa-link', title: 'Adhesive layer positioning', image: '/assets/original/ea2e0d5fbd73-sl3.jpeg', imageAlt: 'Adhesive layer positioning visual', advantage: 'Supports reliable surface bonding and professional application behavior.', benefit: 'Reduces rework risk and helps installers save time.' },
  { icon: 'fa-wand-magic-sparkles', title: 'Self-healing topcoat', image: '/assets/original/fc3312d84e02-sl4-scaled.jpg', imageAlt: 'Self-healing topcoat visual', advantage: 'Swirl marks and light scratches can recover with heat exposure depending on conditions.', benefit: 'The film maintains a cleaner, aesthetic look.' },
  { icon: 'fa-droplet', title: 'Nanoceramic topcoat', image: '/assets/original/8b6a5f6f7c9a-sl5.jpg', imageAlt: 'Nanoceramic topcoat visual', advantage: 'Enhances gloss, helps water bead off and makes routine cleaning easier.', benefit: 'Easier maintenance as a practical benefit.' },
  { icon: 'fa-eye', title: 'Anti-yellowing and high-clarity focus', image: '/assets/original/material-clarity-car.jpg', imageAlt: 'Car photography from the original material section', advantage: 'Gives aesthetic look to car appearance.', benefit: 'The user feels more confident preserving original paint aesthetics.' },
  { icon: 'fa-ruler', title: 'Thickness options', image: '/assets/original/b2d6a19e5c4f-sl6-scaled.jpg', imageAlt: 'Thickness options visual', advantage: 'More thickness choices for different performance, and needs.', benefit: 'Distributors can serve multiple customer tiers.' },
  { icon: 'fa-box', title: 'OEM/ODM customization', image: '/assets/original/a7c1e3f9d2b8-sl7.jpg', imageAlt: 'OEM/ODM customization visual', advantage: 'Supports branding, packaging, and product-positioning.', benefit: 'Can build own market identity with less operational friction.' },
]

const COMPARISON = [
  ['Quality', 'Material-focused PPF positioning with quality-control messaging and product documentation placeholders.', 'Often sold mainly on low price with limited sourcing transparency.', 'Better quality clarity helps buyers reduce supplier risk.'],
  ['Durability', 'Built around scratch resistance, environmental protection, and long-term paint preservation messaging.', 'May fail faster under sunlight, washing, road debris, or poor maintenance.', 'Durability supports repeat sales and fewer complaints.'],
  ['Cost Efficiency', 'Higher perceived value through performance, customization, and supplier support.', 'Lower upfront cost may create hidden costs through rework and returns.', 'Buyers protect margins by reducing avoidable problems.'],
  ['Warranty Confidence', 'Can be strengthened with product warranty terms and test-result documentation.', 'Warranty details may be unclear, weak, or hard to verify.', 'Clear proof helps distributors sell with confidence.'],
  ['Customization', 'OEM/ODM options can support private-label branding and product-market fit.', 'Generic rolls may offer little packaging or branding flexibility.', 'Private-label buyers can build stronger market identity.'],
  ['Installation Performance', 'Focuses on adhesive behavior, clarity, thickness options, and installer confidence.', 'Can be difficult to reposition, stretch, or finish cleanly.', 'Installers save time and improve customer satisfaction.'],
  ['Long-Term Value', 'Supports premium positioning for protection, aesthetics, and maintenance value.', 'May create short-term savings but lower long-term trust.', 'Better long-term value helps repeat B2B purchasing.'],
]

const AUDIENCE = [
  { icon: 'fa-truck', title: 'If you are a PPF Distributor', body: 'You need reliable supply, product consistency, and a stronger sales story. PlatinumPPF helps by combining material-focused positioning with B2B supplier support.', cta: 'Request Wholesale Price' },
  { icon: 'fa-toolbox', title: 'If you are a Detailing Studios / Installers', body: 'You need a film that supports clean installation, customer confidence, and repeat service revenue. PlatinumPPF helps by focusing on clarity, self-healing behavior, hydrophobic performance, and durability.', cta: 'Order a Sample' },
  { icon: 'fa-tag', title: 'If you are an OEM / Private-Label Buyer', body: 'You need customization, brand control, and scalable sourcing. PlatinumPPF helps through OEM/ODM customization options and flexible product positioning.', cta: 'Start OEM/ODM Inquiry' },
  { icon: 'fa-shop', title: 'If you are an Automotive Film Reseller', body: 'You need a product line that can be explained clearly to buyers. PlatinumPPF helps by connecting features to commercial benefits such as protection, finish, and long-term value.', cta: 'Get Product Catalog' },
  { icon: 'fa-palette', title: 'Are you a Car Enthusiasts', body: 'Need variety, visual appeal, and supplier flexibility. PlatinumPPF is here supporting a broader automotive film ecosystem beyond only clear PPF.', cta: 'Compare Product Options' },
]

const FAQS = [
  { q: 'Who is a paint protection film supplier?', a: 'A paint protection film manufacturer and supplier who provides PPF for automotive paint protection. The right supplier supports buyers with product options, technical details, customization, and sourcing confidence for professional PPF installation and resale.' },
  { q: 'How does Platinum Paint Protection Film work?', a: 'Paint Protection Film works as a transparent protective layer over vehicle paint. It helps reduce damage from light scratches, stone chips, stains, and environmental exposure while keeping the original paint finish visible.' },
  { q: 'How does PlatinumPPF work?', a: 'PlatinumPPF works as a transparent protective membrane preventing light scratches, stone chips, stains, and environmental exposure from deteriorating the original paint.' },
  { q: 'What is the difference between 7.5 mil and 8.5 or 9.5 mil PPF?', a: 'The difference is mainly film thickness and positioning. A 7.5 mil option may fit buyers who want balanced protection and price, while an 8.5 mil and above options may support buyers seeking a thicker premium protection story.' },
  { q: 'Is PPF better than PVC paint protection film?', a: 'PPF offers stronger elasticity, clearer finish potential, and better self-healing behavior than many PVC alternatives.' },
  { q: 'Do PlatinumPPF products are tested?', a: 'On request independent third-party lab reports, supplier material documentation, and real installation feedback can be provided.' },
  { q: 'Can PlatinumPPF be customized?', a: 'Yes, OEM/ODM customization may be available for B2B buyers.' },
  { q: 'Is PlatinumPPF available for wholesale?', a: 'Yes. Ask for wholesale pricing directly from PlatinumPPF by sharing thickness preference, target market, order quantity, and branding needs so the team can recommend the right product option.' },
  { q: 'Do you offer global shipping supply support?', a: 'Yes. PlatinumPPF supports direct supplier communication for buyers in global markets.' },
]

const PARTNERS = [
  '/assets/original/33f53a1abb53-1-1.webp',
  '/assets/original/c78d479fbabf-2-1.webp',
  '/assets/original/216418ec8398-3-1.webp',
  '/assets/original/5ecf17b12271-4-1.webp',
  '/assets/original/fa581cbc4eb9-5-2.webp',
  '/assets/original/ba8a8fc07f96-6-2.webp',
  '/assets/original/167bc57b8379-7-1.webp',
]

function StatsStrip() {
  return (
    <section className="stats" aria-label="Key figures">
      <div className="stats-row">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function BannerSlider() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const go = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: index * track.clientWidth, behavior: reduced ? 'auto' : 'smooth' })
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => setActive(Math.round(track.scrollLeft / Math.max(1, track.clientWidth)))
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="banners" aria-roledescription="carousel" aria-label="Product and dealer banners">
      <div className="banner-track" ref={trackRef}>
        {BANNERS.map((b) => (
          <figure className="banner-slide" key={b.src}><img src={b.src} alt={b.alt} loading="lazy" /></figure>
        ))}
      </div>
      <div className="banner-controls">
        <button type="button" className="banner-prev" aria-label="Previous banner" onClick={() => go((active - 1 + BANNERS.length) % BANNERS.length)}>‹</button>
        <div className="banner-dots" aria-label="Banner slides">
          {BANNERS.map((b, i) => (
            <button key={b.src} type="button" aria-label={`Go to banner ${i + 1}`} aria-pressed={i === active} onClick={() => go(i)} />
          ))}
        </div>
        <button type="button" className="banner-next" aria-label="Next banner" onClick={() => go((active + 1) % BANNERS.length)}>›</button>
      </div>
    </section>
  )
}

function MaterialStory() {
  const [active, setActive] = useState(0)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const suppressUntil = useRef(0)

  useEffect(() => {
    const ratios = new Array(FEATURES.length).fill(0)
    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < suppressUntil.current) return
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target as HTMLElement)
          if (index === -1) return
          ratios[index] = entry.isIntersecting ? entry.intersectionRatio : 0
        })
        let best = -1
        let bestRatio = 0
        ratios.forEach((r, i) => { if (r > bestRatio) { bestRatio = r; best = i } })
        if (best !== -1) setActive(best)
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-30% 0px -30% 0px' }
    )
    cardRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const selectFeature = (index: number) => {
    setActive(index)
    suppressUntil.current = Date.now() + 700
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    cardRefs.current[index]?.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <section className="material" id="material">
      <div className="material-copy">
        <span className="kicker kicker-icon"><i className="fa-solid fa-shield-halved" aria-hidden="true" />PPF material story</span>
        <h2>Why Platinum Paint Protection<br />Film Is the Right Solution</h2>
        <p>Platinum PPF is positioned for buyers who want to reduce supplier uncertainty and move toward a more dependable sourcing model. Instead of treating film as a simple commodity, Platinum PPF focuses on quality, performance, customization, and B2B buying confidence.</p>
        <Link className="text-link" to="/product">Explore film specifications <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" /></Link>
      </div>

      <div className="ppf-grid">
        <div className="ppf-visual">
          <div className="ppf-image-stack">
            {FEATURES.map((f, i) => (
              <div className={`ppf-product-image ${i === active ? 'is-active' : ''}`} key={f.title}>
                <img src={f.image} alt={f.imageAlt} loading={i === 0 ? 'eager' : 'lazy'} />
              </div>
            ))}
          </div>
          <div className="ppf-progress-track" aria-hidden="true">
            <span className="ppf-progress-bar" style={{ width: `${((active + 1) / FEATURES.length) * 100}%` }} />
          </div>
          <p className="ppf-active-title" aria-live="off">{FEATURES[active].title}</p>
        </div>

        <div className="ppf-cards" aria-label="PPF material features">
          {FEATURES.map((f, i) => (
            <article
              className={`ppf-card ${i === active ? 'is-active' : ''}`}
              key={f.title}
              ref={(el) => { cardRefs.current[i] = el }}
              onClick={() => selectFeature(i)}
            >
              {/* The button covers only the header for a sane accessible
                  name (just the feature title, not the full advantage/
                  benefit paragraphs read out as one giant button label).
                  The onClick above on the whole card is what makes the
                  copy-grid area clickable too, without changing the
                  button's semantics. */}
              <button type="button" className="ppf-card-trigger" aria-pressed={i === active} onClick={(e) => { e.stopPropagation(); selectFeature(i) }}>
                <span className="ppf-card-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="ppf-card-inner">
                  <span className="ppf-icon" aria-hidden="true"><i className={`fa-solid ${f.icon}`} /></span>
                  <span className="ppf-card-text">
                    <span className="ppf-card-kicker">Feature / NLP Entity</span>
                    <span className="ppf-card-title">{f.title}</span>
                  </span>
                </span>
              </button>
              <div className="ppf-copy-grid">
                <div className="ppf-copy-box"><span className="ppf-copy-label">Advantage</span><p>{f.advantage}</p></div>
                <div className="ppf-copy-box"><span className="ppf-copy-label">Human Benefit</span><p>{f.benefit}</p></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const listRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const items = Array.from(listRef.current?.querySelectorAll('.faq-item') ?? [])
    const handler = (event: Event) => {
      const item = event.currentTarget as HTMLDetailsElement
      if (item.open) items.forEach((other) => { if (other !== item) (other as HTMLDetailsElement).open = false })
    }
    items.forEach((item) => item.addEventListener('toggle', handler))
    return () => items.forEach((item) => item.removeEventListener('toggle', handler))
  }, [])

  return (
    <section className="faq" id="faq">
      <div className="faq-grid">
        <div className="faq-intro">
          <span className="kicker">FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <p>Everything B2B buyers ask before partnering with a PPF supplier.</p>
        </div>
        <div className="faq-list" ref={listRef}>
          {FAQS.map((item, i) => (
            <details className="faq-item" key={item.q} open={i === 0}>
              <summary>{item.q}<i className="fa-solid fa-plus faq-toggle" aria-hidden="true" /></summary>
              <div className="faq-body"><p>{item.a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const { openQuote } = useInteractions()
  const [params] = useSearchParams()
  if (params.has('s')) return <SearchResults />

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-media"><img src="/assets/original/782a526bace2-31-optimized.jpg" alt="Black sports car showing its rear quarter and paint finish" fetchPriority="high" /></div>
        <div className="scrim" />
        <div className="hero-copy">
          <p className="intro"><span className="dot" aria-hidden="true" />PPF Protection Film Supplier</p>
          <h1>Paint Protection Film <em>Manufacturer and Supplier</em> for Installers, Distributors, and OEM Buyers</h1>
          <p className="description">Platinum Paint Protection Film is a high-performance automotive film solution for buyers searching for a reliable paint protection film supplier with a dependable product path.</p>
          <div className="actions">
            <button type="button" className="button" onClick={openQuote}>Request Wholesale Price <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" /></button>
            <a className="text-link" href="#profile">Explore PPF Range <i className="fa-solid fa-arrow-right" aria-hidden="true" /></a>
          </div>
        </div>
        <div className="float-badges" aria-hidden="true">
          <span className="badge"><i className="dot" />Self-Healing Topcoat</span>
          <span className="badge"><i className="dot" />OEM/ODM Ready</span>
          <span className="badge"><i className="dot" />Hydrophobic Finish</span>
        </div>
        <a className="scroll-cue" href="#profile"><span className="scroll-line" />Explore the range</a>
      </section>

      <StatsStrip />

      <section className="profile alt" id="profile">
        <div className="profile-grid">
          <div className="profile-copy">
            <span className="kicker">Company Profile</span>
            <h2>What We Supply</h2>
            <p className="lead">Our range covers the full spectrum of automotive protective film. Every product is shipped directly from our factory warehouse in China.</p>
            <ul className="supply-list">
              <li>We use advance technology to develop durable Paint Protection Films (PPF) of 7.5 to 10.5mils and from glossy transparent to semi transparent, satin, matte, and colour variants.</li>
              <li>We also have a rainbow collection of Colour TPU PPF — Solid Colors, Liquid Metallic Colors, Two Tone Colors, Chromatic Colors and the list continues…</li>
              <li>Architectural and Auto Window Tint Film – UV Resistant, Heat-Rejection and Privacy Protection. Effectively reduces interior temperature and UV exposure across all climatic conditions.</li>
              <li>Dedicated to offering complete OEM/ODM customization options at competitive prices. We manufacture under your brand, labels, packaging.</li>
              <li>Product Selection Assistance – We match the right product for your business growth, suiting your market's need and climate suitability. Our team consults and supports clients at every stage — from enquiry to delivery.</li>
            </ul>
            <p className="alt-copy">Our company specializes in the production, R&amp;D, and sales of high-quality paint protection film (PPF) and window tint film. We are committed to becoming a global technology leader in the automotive film industry, "redefining new standards in film technology with masterful craftsmanship." We continuously introduce advanced international production equipment, enhance our independent R&amp;D capabilities, and implement strict quality control measures — dedicated to offering competitively priced quality products along with complete OEM/ODM customization options.</p>
          </div>
          <div className="profile-media">
            <img src="/assets/original/d7fa741fa075-111_7_11zon-scaled.webp" alt="Platinum Car Films factory production line" loading="lazy" />
          </div>
        </div>
      </section>

      <BannerSlider />

      <MaterialStory />

      <section className="comparison alt" id="comparison">
        <div className="section-heading">
          <span className="kicker centered">Comparison</span>
          <h2>Paint Protection Film Supplier vs Traditional Alternatives</h2>
        </div>
        <div className="compare-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Criteria</th><th>Platinum Paint Protection Film</th><th>Traditional / Low-Quality Alternative</th><th>Buyer Impact</th></tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="audience" id="audience">
        <div className="section-heading">
          <span className="kicker centered">Who It's For</span>
          <h2>Platinum PPF Serves All!</h2>
        </div>
        <div className="audience-grid">
          {AUDIENCE.map((a) => (
            <article className="audience-card" key={a.title}>
              <i className={`fa-solid ${a.icon} audience-icon`} aria-hidden="true" />
              <h3>{a.title}</h3>
              <p>{a.body}</p>
              <Link className="text-link" to="/contact-us">{a.cta} <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
      </section>

      <Faq />

      <section className="partners" id="partners">
        <div className="section-heading">
          <h2 className="centered-heading">Our Partner</h2>
        </div>
        <div className="partner-track">
          {PARTNERS.map((src, i) => (
            <div className="partner-item" key={src}><img src={src} alt={`Partner flag ${i + 1}`} loading="lazy" /></div>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div>
          <span className="kicker">Get Started</span>
          <h2>Ready to Choose Platinum Paint Protection Film?</h2>
          <p>Choosing the right PPF supplier should make your business easier to grow, not harder to manage. PlatinumPPF helps installers, distributors, resellers, and OEM buyers sourcing PPF with a clearer product story, customization options, and supplier support built around commercial confidence.</p>
          <p>Share your product requirements, target market, and expected order quantity to receive the right recommendation before you buy. Whether you need wholesale pricing, a sample, a product catalog, or an OEM/ODM discussion, the next step is simple and low-risk.</p>
          <div className="actions">
            <button type="button" className="button" onClick={openQuote}>Start OEM/ODM Inquiry <i className="fa-solid fa-rocket" aria-hidden="true" /></button>
            <a className="button button-outline" href="mailto:info@platinumcarfilms.com">Email Sales Team <i className="fa-solid fa-envelope" aria-hidden="true" /></a>
          </div>
        </div>
      </section>

    </>
  )
}
