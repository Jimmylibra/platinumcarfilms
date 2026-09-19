import html from './policy-content/refund-policy.html?raw'
import PolicyPage from './PolicyPage'

export default function RefundPolicy() {
  return <PolicyPage title="Refund Policy" html={html} />
}
