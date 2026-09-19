import html from './policy-content/warranty-policy-review.html?raw'
import PolicyPage from './PolicyPage'

export default function Warranty() {
  return (
    <PolicyPage
      title="Warranty"
      html={html}
      note="Coverage and duration figures below still need client confirmation -- see the content-decision log for the specific conflicts found (transferability, and headlight-film duration vs. the general table)."
    />
  )
}
