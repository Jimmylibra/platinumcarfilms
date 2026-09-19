import { Link } from 'react-router-dom'
import { useInteractions } from '../replica/InteractionContext'
import Reveal from '../components/Reveal'
import './ProductPage.css'

// Real content extracted from react-app/public/content/210-paint-protection-film.json
// (the source page's own AST), not invented. Figures/claims preserved
// verbatim pending client review (see docs/CONTENT-DECISION-LOG.md #5).
const FEATURES = [
  ['210-Mil Thickness', '2x thicker than standard films', 'Prevents rock chips; eliminates $400-$800 repairs per chip'],
  ['Self-Healing Technology', 'Scratches disappear via heat', 'No professional correction needed; maintains gloss indefinitely'],
  ['99% UV Blocking', 'Blocks harmful ultraviolet rays', 'Preserves paint color for 10+ years; supports resale value'],
  ['Optical Clarity', 'Zero yellowing or hazing', 'Maintains factory appearance; invisible protection'],
  ['10-Year Warranty', 'Outlasts ceramic coatings', 'Single application protects entire ownership period'],
]

const AUDIENCE = [
  ['Luxury Vehicle Owners', 'Protect $50,000+ investments from depreciation. Maintain resale value through flawless paint preservation.'],
  ['Fleet Managers', 'Reduce maintenance costs across 5-100+ vehicles. Eliminate unexpected chip repairs; minimize downtime.'],
  ['Detailing Professionals', 'Offer premium value-added service. Leverage installer certification and professional support network.'],
  ['New Car Buyers', 'Protect investment immediately. Preserve factory finish against daily driving hazards.'],
]

const COMPARISON = [
  ['Ceramic Coatings', 'Provide hydrophobic properties but zero rock chip defense. Cost $1,500-$4,000; last only 3-5 years. Platinum is superior: blocks UV + prevents chips + lasts 10 years.'],
  ['Competitor 150-Mil Films', 'Thinner polyurethane absorbs less impact. Often yellow within 5-7 years. Platinum’s 210-mil formula is thicker, stays clear longer.'],
  ['Dealership Wax', 'Protects surfaces for 2-3 months only. Requires monthly reapplication ($100-$400 annually). Platinum is single application; 10-year protection.'],
  ['Unprotected Paint', 'Risk $1,500-$3,000+ in combined chip repairs, paint correction, and resale value loss. Platinum ($2,500-$4,500) prevents all three, delivering 3-5x ROI.'],
]

const FAQS = [
  ['What is Platinum 210 paint protection film?', 'A paint protection film manufacturer and supplier who provides PPF for automotive paint protection. The right supplier supports buyers with product options, technical details, customization, and sourcing confidence for professional PPF installation and resale.'],
  ['How does self-healing technology work?', 'Heat-activated polymers respond to sunlight or warm water (80°F+). Minor scratches automatically repair within 24-48 hours. No special products or maintenance required—healing occurs naturally.'],
  ['How long does Platinum 210 last?', '10-year manufacturer warranty under normal driving. Real-world lifespan is typically 12-15 years before minor edge peeling. Most vehicle owners keep cars for 7-10 years, making Platinum lifetime protection.'],
  ['How much does installation cost?', 'Front-end protection (hood, bumper, fenders): $1,200-$1,800. Full-body coverage: $2,500-$4,500 depending on vehicle complexity. Professional installation includes surface preparation, application, and edge sealing. Financing available.'],
  ['Can Platinum 210 be removed?', 'Yes. Professional removal by certified technicians prevents paint damage. Underlying paint remains showroom-pristine, actually superior to unprotected paint on identical vehicles.'],
  ["What's your warranty coverage?", 'Comprehensive 10-year warranty covers yellowing, peeling, and adhesion failure. Transferable to subsequent owners if vehicle is sold. Excludes accident damage or non-certified installation.'],
  ['Why choose Platinum over ceramic coatings?', 'Ceramic protects surfaces ($1,500-$4,000) but cannot prevent rock chips. Platinum provides physical impact defense plus UV protection, lasting 10 years vs. ceramic’s 3-5 years.'],
]

export default function Product210() {
  const { openQuote } = useInteractions()

  return (
    <article className="product-page">
      {/* P01 */}
      <section className="pp-intro section-shell">
        <div className="pp-intro-copy">
          <p className="breadcrumb"><Link to="/product">Product</Link> / 210 Paint Protection Film</p>
          <h1>Platinum 210 Paint Protection Film: Professional-Grade Defense for Your Vehicle</h1>
          <p className="lead">Platinum 210 paint protection film is a premium, self-healing polyurethane coating that shields your vehicle&rsquo;s paint from rock chips, UV damage, and environmental contaminants. Unlike thin films or ceramic coatings, our 210-mil formula provides superior impact resistance while maintaining crystal-clear optical transparency. Whether you drive a luxury sedan or manage a corporate fleet, Platinum 210 delivers invisible, long-lasting protection that preserves paint condition and resale value for a decade.</p>
          <ul className="pp-promise-list">
            <li>Schedule Free Consultation: Low-friction entry point</li>
            <li>View Installation Gallery: Social proof &amp; case studies</li>
            <li>Get Your Quote: High-intent conversion</li>
          </ul>
          <div className="pp-actions">
            <button type="button" className="button" onClick={openQuote}>Get Your Quote</button>
            <Link className="text-link" to="/gallery">View Installation Gallery</Link>
          </div>
        </div>
        <div className="pp-intro-media-wrap">
          <div className="pp-intro-media">
            <img src="/assets/original/5a41b9f14f0b-Platinum-210-Paint-Protection-Film-Professional-Grade-Defense-for-Your-Vehicle.png" alt="Platinum 210 paint protection film product poster" loading="eager" />
          </div>
        </div>
      </section>

      {/* P02 */}
      <section className="pp-section pp-alt">
        <div className="section-shell">
          <h2>How Vehicle Owners Are Losing Paint Value Without Protection</h2>
          <div className="pp-stat-row">
            <div className="pp-stat"><strong>$400-$800</strong><span>Rock Chips at Highway Speeds &mdash; repair exposure per chip.</span></div>
            <div className="pp-stat"><strong>40-50%</strong><span>Luxury Vehicle Value Loss &mdash; within five years without strong protection.</span></div>
            <div className="pp-stat"><strong>3x</strong><span>Compounding Costs &mdash; repair bills, paint correction, and resale value loss.</span></div>
          </div>
          <p>Your vehicle&rsquo;s paint faces constant threats: rock chips at highway speeds ($400-$800 per repair), UV oxidation that dulls color depth, and environmental contaminants that etch surfaces. Without protection, luxury vehicles lose 40-50% value within five years&mdash;and preventable paint damage accelerates this decline significantly.</p>
          <p>Traditional solutions fall short: ceramic coatings ($1,500-$4,000) protect surfaces but cannot prevent rock chips; dealership wax packages wash away in months; DIY films bubble and misalign. Each chip requires expensive paint correction, and accumulated damage destroys resale appeal. Unprotected vehicles experience compounding costs: repair bills stack up while market value plummets.</p>
        </div>
      </section>

      {/* P03 */}
      <section className="pp-section">
        <Reveal className="section-shell pp-solution">
          <div>
            <h2>Why Platinum 210 Paint Protection Film Is the Professional Solution</h2>
            <p>Because paint damage directly impacts resale value, Platinum 210 creates an invisible barrier that absorbs impact energy before it reaches clearcoat. Our 210-mil polyurethane formula features self-healing technology&mdash;minor scratches vanish automatically within 24-48 hours via heat exposure. Unlike ceramic coatings, PPF provides physical impact defense; unlike competitor films, Platinum maintains crystal clarity for 10 years without yellowing or hazing.</p>
          </div>
          <div className="pp-solution-media">
            <img src="/assets/original/39e055f61004-69.webp" alt="Car, film rolls and close-up composite" loading="lazy" />
          </div>
        </Reveal>
      </section>

      {/* P04 */}
      <section className="pp-section pp-alt">
        <div className="section-shell">
          <h2>Feature-Advantage-Benefit Analysis</h2>
          <div className="pp-table-wrap">
            <table className="pp-table">
              <thead><tr><th>Feature</th><th>Advantage</th><th>Business Benefit</th></tr></thead>
              <tbody>
                {FEATURES.map((row) => <tr key={row[0]}>{row.map((c, i) => <td key={i}>{c}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
          <p className="pp-table-note">Platinum 210 outperforms all alternatives. Ceramic coatings lack physical impact resistance&mdash;a rock chip still damages paint. Competitor 150-mil films are 33% thinner, reducing durability. Dealership packages wash away in months. DIY kits cause bubbling and misalignment. Only Platinum 210 combines 10-year physical protection, self-healing capability, and optical transparency.</p>
        </div>
      </section>

      {/* P05 */}
      <section className="pp-section">
        <Reveal className="section-shell">
          <h2>Who Benefits Most from Platinum 210?</h2>
          <div className="pp-audience-grid">
            {AUDIENCE.map(([title, body]) => (
              <div className="pp-audience-card" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
                <button type="button" className="text-link" onClick={openQuote}>Get Your Quote</button>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* P06 */}
      <section className="pp-section pp-alt">
        <div className="section-shell">
          <h2>Platinum 210 vs. Traditional Paint Protection</h2>
          <div className="pp-table-wrap">
            <table className="pp-table">
              <tbody>
                {COMPARISON.map(([label, body]) => (
                  <tr key={label}><td className="pp-table-label">{label}</td><td>{body}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* P07 */}
      <section className="pp-section">
        <div className="section-shell pp-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="pp-faq-list">
            {FAQS.map(([q, a], i) => (
              <details className="faq-item" key={q} open={i === 0}>
                <summary>{q}<i className="fa-solid fa-plus faq-toggle" aria-hidden="true" /></summary>
                <div className="faq-body"><p>{a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* P08 */}
      <section className="pp-cta">
        <div className="section-shell">
          <h2>Ready to Protect Your Vehicle&rsquo;s Paint Investment?</h2>
          <p>Join thousands of vehicle owners who preserve paint value with Platinum 210. Our advanced self-healing technology, crystal-clear durability, and 10-year warranty ensure your vehicle maintains a flawless finish&mdash;protecting both your paint and your resale value.</p>
          <div className="pp-cta-actions">
            <div><h3>Schedule Your Free Consultation</h3><p>No cost, no obligation. Our technicians evaluate your vehicle and provide custom protection plan.</p><button type="button" className="button" onClick={openQuote}>Schedule Consultation</button></div>
            <div><h3>View Before-&amp;-After Gallery</h3><p>See Platinum 210 protecting luxury vehicles from real-world rock chips and environmental damage.</p><Link className="text-link" to="/gallery">View Gallery</Link></div>
            <div><h3>Get Your Custom Quote</h3><p>Instant pricing based on vehicle type and coverage preferences. Financing available.</p><button type="button" className="button" onClick={openQuote}>Get Quote</button></div>
          </div>
        </div>
      </section>

      {/* P09 */}
      <nav className="pp-related section-shell" aria-label="Related products">
        <Link to="/190-micron-ppf">190 Micron PPF</Link>
        <Link to="/gloss-black-paint-protection-film-190-microns">Gloss Black PPF 190 Microns</Link>
        <Link to="/product">All products</Link>
      </nav>
    </article>
  )
}
