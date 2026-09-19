import PageHeader from '../components/PageHeader'

export default function ShippingPolicy() {
  return (
    <>
      <PageHeader title="Shipping Policy" />
      {/* TODO: real shipping policy content, not placeholder text — this was
          one of the top findings in the QA audit of the original site */}
      <div className="section section-shell" />
    </>
  )
}
