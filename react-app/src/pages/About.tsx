import { Link } from 'react-router-dom'
import { useInteractions } from '../replica/InteractionContext'
import './About.css'

// Real content extracted from react-app/public/content/about-us.json's own
// source AST -- not invented. AB05 ("Built on World-Class Materials") has
// no body text in the source itself (only the heading); shown as-is rather
// than inventing supplier copy, per the plan's rule against filling
// missing source sections.
const STATS = ['10+ Years Manufacturing', '24/7 Customer Support', 'OEM Custom Branding', '10+ Global Shipping']

const SUPPLY = [
  ['Paint Protection Film (PPF)', 'Polyurethane TPU films — clear, gloss black, satin, matte, and colour variants. 190 microns to 8.5 mil thickness. All films are durable and self-healing.'],
  ['Athermal & Window Film', 'Heat-rejection and solar control films for automotive glazing. Reduces interior temperature and UV exposure across all climatic conditions.'],
  ['Colour TPU PPF', 'An extensive range of tinted and colour-shift TPU films — Sahara Yellow, Crimson, Liquid Metallic, Dracaena Red, Pepper White, and more.'],
  ['OEM / ODM Custom Branding', 'We manufacture under your brand. Custom labels, packaging, and film specifications available. Dedicated to offering complete OEM/ODM customization.'],
  ['Product Selection Assistance', 'We match the right product to your specific application and climate. Our team consults and supports clients at every stage — from enquiry to delivery.'],
  ['Direct Warehouse Shipping', 'All orders ship directly from our factory warehouse in China. Online parcel tracking on every shipment. Fast delivery, no third-party delays.'],
]

const QUALITY = [
  ['01', 'Measuring & Testing Equipment', 'All batches are tested using calibrated measurement equipment before release. Thickness, adhesion, optical clarity, and self-healing performance are assessed against internal benchmarks.'],
  ['02', 'Combined Foreign & Local Technologies', 'Our production processes integrate internationally developed techniques with locally optimised manufacturing — balancing performance innovation with consistent, repeatable quality.'],
  ['03', 'World-Brand Raw Materials', 'Lubrizol and Covestro TPU inputs ensure batch-to-batch material consistency that generic or commodity TPU cannot provide. Every roll starts from the same verified source material.'],
  ['04', 'Product Certification & Professional Inspection', 'Each product line undergoes professional inspection and is supported by product certification. Buyers requiring documentation for import compliance or B2B procurement can request it.'],
]

const BENEFITS = [
  ['Only Proven Products', 'No untested or unverified film formulations. Every product in our range has been tested against our internal performance benchmarks before release.'],
  ['Direct Deliveries from China', 'We ship directly from our factory warehouse. No third-party middlemen, no distribution delays. Straight from production to your door.'],
  ['Competitive Prices', 'Factory-direct cost structure means trade buyers receive pricing that reflects our actual manufacturing costs — not distributor markups.'],
  ['Support & Fast Delivery', 'Customer service available 24/7. Responsive support across time zones, with fast despatch and online parcel tracking on every order.'],
  ['OEM Branding Options', 'Your brand, our product, our manufacturing. Custom labels, packaging, and specifications available for distributors and installers.'],
  ['Product Selection Assistance', 'Tell us your requirements and climate conditions — we recommend the correct specification for your application.'],
]

const AUDIENCE = [
  ['PPF Installation Studios', 'Professional detailing workshops and PPF installers who need consistent quality stock and reliable replenishment cycles.'],
  ['Importers & Distributors', 'Regional automotive film importers seeking factory-direct pricing and the ability to build their own private-label product range.'],
  ['OEM Brand Partners', 'Brands requiring private-label film under their own packaging and identity. Full OEM/ODM manufacturing with custom specifications.'],
  ['Fleet Operators', 'Corporate vehicle operators seeking volume pricing on protective film to maintain appearance and reduce maintenance costs.'],
  ['Automotive Dealerships', 'New car dealerships adding paint protection as a value-added service, requiring consistent stock and competitive per-roll pricing.'],
]

export default function About() {
  const { openQuote } = useInteractions()

  return (
    <article className="about-page">
      {/* AB01 */}
      <section className="ab-title section-shell">
        <p className="breadcrumb">About Us</p>
        <h1>About Us</h1>
      </section>

      {/* AB02 */}
      <section className="ab-section">
        <div className="section-shell ab-intro">
          <div>
            <h2>We Are a Team Passionate About Car Protection</h2>
            <p>PlatinumPPF (Platinum Car Films) specialises in the supply and sale of high-tech automotive films — polyurethane PPF, athermal, tinting, and other protective solutions for professional installers, distributors, and OEM buyers.</p>
            <div className="ab-stat-grid">
              {STATS.map((s) => <div key={s} className="ab-stat">{s}</div>)}
            </div>
          </div>
          <div className="ab-media">
            <img src="/assets/original/b92a52a790ac-31.webp" alt="Stack of Platinum product boxes" loading="lazy" />
          </div>
        </div>
      </section>

      {/* AB03 */}
      <section className="ab-section ab-alt">
        <div className="section-shell ab-reading">
          <h2>Reliability, Aesthetics, and a Professional Approach</h2>
          <p>Our approach is attention to detail — from selecting the best raw materials to consulting and supporting clients at every stage. Whether you are a professional installer or a first-time distributor, we support your business with reliable supply and technical guidance.</p>
          <p>Regardless of whether you need protection from rock chips, ultraviolet radiation, or interior overheating, we have a solution for any task and climatic condition.</p>
          <div className="ab-callouts">
            <span>10 Years Car Film Maker</span>
            <span>1-Stop One-Stop Service</span>
          </div>
        </div>
      </section>

      {/* AB04 */}
      <section className="ab-section">
        <div className="section-shell">
          <h2>What We Supply</h2>
          <div className="ab-supply-grid">
            {SUPPLY.map(([title, body]) => (
              <div className="ab-supply-item" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AB05 */}
      <section className="ab-section ab-alt">
        <div className="section-shell ab-reading">
          <h2>Built on World-Class Materials</h2>
          <p className="ab-note">Lubrizol and Covestro TPU inputs are named directly in our quality-control process below (section 03) — the source page does not include separate supplier-names copy for this section beyond that.</p>
        </div>
      </section>

      {/* AB06 */}
      <section className="ab-section">
        <div className="section-shell ab-quality">
          <div className="ab-quality-media">
            <img src="/assets/original/28808e794687-53.webp" alt="Production equipment" loading="lazy" />
            <p className="ab-media-caption">Equipment shown in supplied gallery.</p>
          </div>
          <div>
            <h2>How We Consistently Control Quality</h2>
            <p>We are fully committed to maintaining high product quality for each client by implementing thorough control measures throughout production, packaging, and on-time delivery.</p>
            <div className="ab-quality-rail">
              {QUALITY.map(([num, title, body]) => (
                <div className="ab-quality-item" key={num}>
                  <span className="ab-quality-num">{num}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AB07 */}
      <section className="ab-section ab-alt">
        <div className="section-shell">
          <h2>With Us You Get</h2>
          <div className="ab-benefit-grid">
            {BENEFITS.map(([title, body]) => (
              <div key={title}><h3>{title}</h3><p>{body}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* AB08 */}
      <section className="ab-section">
        <div className="section-shell">
          <h2>Who We Work With</h2>
          <p className="ab-intro-line">We serve professional buyers who need a reliable supply partner. Whether you are placing a first sample order or building a long-term supply relationship, every account gets the same factory-direct pricing and support.</p>
          <div className="ab-audience-list">
            {AUDIENCE.map(([label, body]) => (
              <div className="ab-audience-row" key={label}>
                <span className="ab-audience-label">{label}</span>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AB09 */}
      <section className="ab-cta">
        <div className="section-shell">
          <h2>Start a Conversation</h2>
          <p>We welcome enquiries from buyers, distributors, installers, and OEM partners globally. Tell us what you need and we will match you to the right product, specification, and pricing.</p>
          <div className="ab-cta-actions">
            <button type="button" className="button" onClick={openQuote}>Get a Quote</button>
            <Link className="text-link" to="/contact-us">Contact Us</Link>
          </div>
        </div>
      </section>
    </article>
  )
}
