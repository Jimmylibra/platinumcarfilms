import PageHeader from '../components/PageHeader'
import './About.css'

const PARTNERS = [
  '/assets/original/33f53a1abb53-1-1.webp',
  '/assets/original/c78d479fbabf-2-1.webp',
  '/assets/original/216418ec8398-3-1.webp',
  '/assets/original/5ecf17b12271-4-1.webp',
  '/assets/original/fa581cbc4eb9-5-2.webp',
  '/assets/original/ba8a8fc07f96-6-2.webp',
  '/assets/original/167bc57b8379-7-1.webp',
]

export default function About() {
  return (
    <>
      <PageHeader
        title="About Us"
        intro="A paint protection film manufacturer and supplier for installers, distributors, and OEM buyers."
      />
      <section className="about-profile section-shell">
        <div className="about-grid">
          <div className="about-copy">
            <h2>What We Supply</h2>
            <p className="lead">Our range covers the full spectrum of automotive protective film. Every product is shipped directly from our factory warehouse in China.</p>
            <ul>
              <li>We use advance technology to develop durable Paint Protection Films (PPF) of 7.5 to 10.5mils and from glossy transparent to semi transparent, satin, matte, and colour variants.</li>
              <li>We also have a rainbow collection of Colour TPU PPF — Solid Colors, Liquid Metallic Colors, Two Tone Colors, Chromatic Colors and the list continues…</li>
              <li>Architectural and Auto Window Tint Film – UV Resistant, Heat-Rejection and Privacy Protection. Effectively reduces interior temperature and UV exposure across all climatic conditions.</li>
              <li>Dedicated to offering complete OEM/ODM customization options at competitive prices. We manufacture under your brand, labels, packaging.</li>
              <li>Product Selection Assistance – We match the right product for your business growth, suiting your market's need and climate suitability. Our team consults and supports clients at every stage — from enquiry to delivery.</li>
            </ul>
            <p className="alt-copy">Our company specializes in the production, R&amp;D, and sales of high-quality paint protection film (PPF) and window tint film. We are committed to becoming a global technology leader in the automotive film industry, "redefining new standards in film technology with masterful craftsmanship." We continuously introduce advanced international production equipment, enhance our independent R&amp;D capabilities, and implement strict quality control measures — dedicated to offering competitively priced quality products along with complete OEM/ODM customization options.</p>
          </div>
          <div className="about-media">
            <img src="/assets/original/d7fa741fa075-111_7_11zon-scaled.webp" alt="Platinum Car Films factory production line" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="about-partners section-shell">
        <h2 className="centered">Our Partner</h2>
        <div className="about-partner-grid">
          {PARTNERS.map((src, i) => (
            <div className="about-partner-item" key={src}><img src={src} alt={`Partner flag ${i + 1}`} loading="lazy" /></div>
          ))}
        </div>
      </section>
    </>
  )
}
