import html from './policy-content/privacy-policy.html?raw'
import PolicyPage from './PolicyPage'

export default function PrivacyPolicy() {
  return <PolicyPage title="Privacy Policy" html={html} />
}
