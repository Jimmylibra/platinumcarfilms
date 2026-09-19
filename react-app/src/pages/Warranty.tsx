import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import './Warranty.css'

// Real content extracted from content/warranty.json's own source AST, not
// the editorial-review HTML draft. Preserved as-is including source
// inconsistencies (flagged below and in docs/CONTENT-DECISION-LOG.md) --
// not silently corrected.
const COVERED = [
  'Yellowing or discoloration caused by UV degradation of film material',
  'Delamination — film separating from its backing or adhesive layers',
  'Bubbling or blistering not caused by external mechanical impact',
  'Cracking or splitting arising from material brittleness',
  'Adhesive failure under normal driving and environmental conditions',
]
const EXCLUDED = [
  'Physical damage from rock chips, road debris, or vehicle collisions',
  'Edge lifting as it may be due to many external reasons',
  'Scratches or abrasions caused by improper washing or detailing',
  'Chemical damage from non-approved cleaning products or fuel spills',
  'Staining from bird droppings, tree sap left untreated',
  'Intentional removal or tampering by an uncertified technician',
  'Normal wear and surface micro-marring from daily driving',
]
const DURATION = [
  ['TPU Paint Protection Film', '7.5/8.5/9.5 mil', '4-10 Years'],
  ['Window Tint Film', '2 mils', '3-10 Years'],
  ['Headlight Paint Protection Film', '7.5 mil', '2-5 Years'],
]
const CONDITIONS = [
  ['Certified Installation', 'Film must be installed by a certified PPF professional following Platinum Car Films installation guidelines. Surface preparation, room temperature, and application technique affect coverage validity.'],
  ['Approved Maintenance', 'Clean using pH-neutral automotive soap and soft microfibre cloths. Avoid solvent-based cleaners, abrasive compounds, and automatic brush car washes within the first weeks after installation.'],
  ['Authorised Product', 'Warranty applies only to genuine Platinum Car Films product purchased through an authorized distributor. Grey-market film is not covered.'],
  ['Personal Vehicle Use', 'Standard terms apply to personal and light commercial use. Fleet and high-mileage commercial applications may require a separate written warranty agreement.'],
  ['Proof of Purchase', 'A valid proof of purchase and installer certification record must be retained and provided at the time of any warranty claim. Digital records also accepted.'],
  ['Timely Reporting', 'Defects must be reported within 7 days of discovery. Delayed reporting that results in further damage may affect claim eligibility.'],
]
const VOIDS = [
  'Non-certified installation — film applied by an unqualified installer without following the official installation process.',
  'Chemical contamination — exposure to solvent-based cleaners, fuel, brake fluid, or other harsh chemicals.',
  'Physical impact or collision damage — damage from road accidents, vandalism, deep rock chips, or any external mechanical force.',
  'Removal by non-certified technician — DIY or improper removal that causes paint damage does not fall under warranty responsibility.',
  'Abrasive washing methods — automatic brush car washes, pressure washers applied too close, or abrasive sponges that scratch the film.',
  'Non-approved overlay products — applying non-approved waxes, sealants, or coatings over the film that cause chemical interaction.',
  'Untreated environmental contamination — bird droppings, tree sap, or industrial fallout left on the surface for extended periods causing etching.',
  'Expired warranty period — claims submitted after the product-specific warranty period has elapsed will not be eligible.',
  'Warranty is non-transferable to the next owner of the vehicle.',
]
const CLAIM_STEPS = [
  ['Document the Defect', 'Take clear, well-lit photographs of the affected area from multiple angles. Include a reference object (coin or ruler) to show scale. Note when you first observed the issue.'],
  ['Gather Your Records', 'Locate your original proof of purchase, the name and contact of your certified installer, and the installation date.'],
  ['Contact Platinum Car Films', 'Submit your claim by WhatsApp (+86 181 2245 8657 or +86 153 3807-7719), or via platinumcarfilms.com/contact-us/. Include photographs, purchase details, and installer information.'],
  ['Claim Review', 'A Platinum Car Films representative will review your submission within 3-5 business days. We may ask for additional photos or request a physical inspection by a certified partner.'],
  ['Resolution', 'If approved, Platinum Car Films will arrange: replacement film supply, re-installation credit, or a pro-rated refund based on the remaining warranty period at the time of the claim.'],
]
const LIMITATIONS = [
  ['Remedy is limited to film or installation', 'Platinum Car Films’ liability is limited to supplying replacement film, re-installation credit, or a pro-rated refund. We are not liable for repainting costs, vehicle downtime, or third-party losses.'],
  ['No warranty on underlying paint condition', 'This warranty covers the film itself. It does not warrant the vehicle’s underlying paint, clearcoat, or primer. Any pre-existing paint defects visible through the film are not covered.'],
  ['No consequential or indirect damages', 'Platinum Car Films is not liable for indirect, incidental, or consequential damages including loss of use, depreciation in vehicle value, or costs incurred by the claimant.'],
  ['Governing jurisdiction', 'This warranty is governed by the applicable laws of the jurisdiction in which the product was purchased and installed. Disputes shall first be referred to Platinum Car Films for resolution.'],
]
const FAQS: [string, string][] = [
  ['What does the Platinum Car Films PPF warranty cover?', 'Manufacturing defects including yellowing beyond the accepted rate (less than 2% annually is acceptable), bubbling or cracking from material failure, and adhesive failure under normal conditions. It does not cover physical damage, improper installation, or chemical misuse.'],
  ['How long is the warranty on Platinum 210 PPF?', 'The Platinum PPF products carry a 2-10-year manufacturer warranty from the date of professional installation — the longest in the Platinum Car Films range, reflecting product thickness and formulation.'],
  ['Does the warranty cover yellowing?', 'Every membrane / PPF is prone to yellowing caused by UV degradation, however yellowing at up to 2% annually is internally accepted as a normal phenomenon. Platinum Car Films covers yellowing beyond that rate.'],
  ['Is the warranty valid if I install the film myself?', 'No. The warranty requires installation by a certified PPF professional. DIY installation voids coverage because improper surface preparation or technique can cause premature film failure.'],
  ['Can I use a ceramic coating over Platinum Car Films PPF?', 'In most cases yes — applying a compatible ceramic coating over PPF is common professional practice. Only PPF-compatible ceramic products should be used. Consult your installer before applying.'],
  ['Is the warranty transferable when I sell my vehicle?', 'No. It is a non-transferable warranty.'],
  ['Does the warranty apply globally?', 'Yes. The warranty applies globally to products purchased through authorized distributors. Claims can be submitted digitally or by email regardless of location.'],
]

const TOC = [
  ['w03', 'What Is Covered'],
  ['w04', 'Warranty Duration by Product'],
  ['w05', 'Warranty Conditions'],
  ['w06', 'What Voids the Warranty'],
  ['w07', 'How to Make a Warranty Claim'],
  ['w08', 'Limitations of Liability'],
  ['w09', 'Frequently Asked Questions'],
  ['w10', 'Submit a Claim or Ask a Question'],
]

export default function Warranty() {
  return (
    <>
      <PageHeader
        title="Platinum Car Films PPF Warranty"
        intro="We stand behind every roll of paint protection film we manufacture. This policy explains exactly what is covered, for how long, under what conditions, and how to make a claim."
      />
      <div className="warranty-page">
        <div className="section-shell warranty-badges">
          <span>Up to 10-Year Coverage</span>
          <span>Non-Transferable</span>
          <span>24/7 Claim Support</span>
        </div>

        <nav className="section-shell warranty-toc" aria-label="On this page">
          <span className="warranty-toc-label">On this page</span>
          <div className="warranty-toc-links">
            {TOC.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </div>
        </nav>

        <section id="w03" className="warranty-section warranty-alt">
          <div className="section-shell warranty-covered-grid">
            <div>
              <h2>Covered — Manufacturing Defects</h2>
              <ul>{COVERED.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div>
              <h2>Not Covered — Exclusions</h2>
              <ul>{EXCLUDED.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
        </section>

        <section id="w04" className="warranty-section">
          <div className="section-shell">
            <h2>Warranty Duration by Product</h2>
            <div className="warranty-table-wrap">
              <table className="warranty-table">
                <thead><tr><th>Product</th><th>Thickness</th><th>Warranty</th></tr></thead>
                <tbody>
                  {DURATION.map((row) => <tr key={row[0]}>{row.map((c, i) => <td key={i}>{c}</td>)}</tr>)}
                </tbody>
              </table>
            </div>
            <p className="warranty-note">OEM/ODM product lines may carry separate warranty terms as agreed in writing at time of order.</p>
          </div>
        </section>

        <section id="w05" className="warranty-section warranty-alt">
          <div className="section-shell">
            <h2>Warranty Conditions</h2>
            <ol className="warranty-conditions">
              {CONDITIONS.map(([title, body]) => <li key={title}><strong>{title}.</strong> {body}</li>)}
            </ol>
          </div>
        </section>

        <section id="w06" className="warranty-section">
          <div className="section-shell warranty-reading">
            <h2>What Voids the Warranty</h2>
            <ul>{VOIDS.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </section>

        <section id="w07" className="warranty-section warranty-alt">
          <div className="section-shell">
            <h2>How to Make a Warranty Claim</h2>
            <ol className="warranty-claim-steps">
              {CLAIM_STEPS.map(([title, body], i) => (
                <li key={title}><span className="warranty-step-num">{String(i + 1).padStart(2, '0')}</span><div><strong>{title}</strong><p>{body}</p></div></li>
              ))}
            </ol>
          </div>
        </section>

        <section id="w08" className="warranty-section warranty-reading-section">
          <div className="section-shell warranty-reading">
            <h2>Limitations of Liability</h2>
            {LIMITATIONS.map(([title, body]) => (
              <div key={title} className="warranty-limitation"><h4>{title}</h4><p>{body}</p></div>
            ))}
          </div>
        </section>

        <section id="w09" className="warranty-section warranty-alt">
          <div className="section-shell warranty-reading">
            <h2>Frequently Asked Questions</h2>
            <div className="warranty-faq-list">
              {FAQS.map(([q, a], i) => (
                <details className="faq-item" key={q} open={i === 0}>
                  <summary>{q}<i className="fa-solid fa-plus faq-toggle" aria-hidden="true" /></summary>
                  <div className="faq-body"><p>{a}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="w10" className="warranty-cta">
          <div className="section-shell">
            <h2>Submit a Claim or Ask a Question</h2>
            <div className="warranty-contact-grid">
              <div><h4>WhatsApp</h4><p><a href="https://wa.me/8618122458657">+86 181 2245 8657</a><br /><a href="https://wa.me/8615338077719">+86 153 3807-7719</a></p></div>
              <div><h4>Email</h4><p><a href="mailto:info@platinumcarfilms.com">info@platinumcarfilms.com</a></p></div>
              <div><h4>Claim Form</h4><p><Link to="/contact-us">Contact Us</Link></p></div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
