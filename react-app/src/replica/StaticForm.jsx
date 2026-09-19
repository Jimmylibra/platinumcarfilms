import { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'

export default function StaticForm({ kind }) {
  const id = useId()
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  if (kind === 'search') return <form className="replica-search" role="search" onSubmit={event => {
    event.preventDefault()
    const query = String(new FormData(event.currentTarget).get('s') || '').trim()
    navigate(`/?s=${encodeURIComponent(query)}`)
  }}><label className="screen-reader-text" htmlFor={id}>Search the website</label><input id={id} name="s" type="search" placeholder="Search…" required /><button type="submit" aria-label="Search"><Icon name="search" /></button></form>

  return <form className={`replica-form replica-form--${kind}`} onSubmit={event => {
    event.preventDefault()
    setMessage(kind === 'newsletter' ? 'This is a preview. Your email has not been subscribed.' : 'This is a preview. Your inquiry has not been sent. Please use the sales email or WhatsApp link to contact the team.')
  }}>
    {kind === 'inquiry' && <div className="replica-form-grid">
      <label htmlFor={`${id}-name`}>Name <span aria-hidden="true">*</span><input id={`${id}-name`} name="name" autoComplete="name" placeholder="Enter your name" required /></label>
      <label htmlFor={`${id}-company`}>Company name <span aria-hidden="true">*</span><input id={`${id}-company`} name="company" autoComplete="organization" placeholder="Company name" required /></label>
    </div>}
    <div className={kind === 'inquiry' ? 'replica-form-grid' : 'replica-newsletter-fields'}>
      <label htmlFor={`${id}-email`}>{kind === 'inquiry' ? 'Email *' : 'Email address'}<input id={`${id}-email`} name="email" autoComplete="email" type="email" placeholder="Enter your email" required /></label>
      {kind === 'inquiry' ? <label htmlFor={`${id}-phone`}>WhatsApp number *<input id={`${id}-phone`} name="phone" autoComplete="tel" type="tel" placeholder="Include country code" required /></label> : <button className="replica-button" type="submit">Subscribe</button>}
    </div>
    {kind === 'inquiry' && <><label htmlFor={`${id}-message`}>Describe the product you need<textarea id={`${id}-message`} name="message" rows={4} placeholder="Product, quantity, and any other requirements" /></label><button className="replica-button" type="submit">Preview inquiry</button></>}
    <p className="replica-form-note">Static preview — {kind === 'newsletter' ? 'subscription' : 'submission'} is not connected.</p>
    {message && <p role="status" className="replica-form-feedback">{message}</p>}
  </form>
}
