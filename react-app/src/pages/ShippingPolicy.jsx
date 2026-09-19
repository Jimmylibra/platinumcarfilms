import html from './policy-content/shipping-policy.html?raw'
import PolicyPage from './PolicyPage'

export default function ShippingPolicy() {
  return <PolicyPage title="Shipping Policy" html={html} />
}
