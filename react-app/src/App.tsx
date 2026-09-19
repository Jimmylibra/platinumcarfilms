import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Product from './pages/Product'
import Gallery from './pages/Gallery'
import Warranty from './pages/Warranty'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import ShippingPolicy from './pages/ShippingPolicy'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about-us" element={<About />} />
        <Route path="product" element={<Product />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="warranty" element={<Warranty />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path="shipping-policy" element={<ShippingPolicy />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="refund-policy" element={<RefundPolicy />} />
        <Route path="terms-and-conditions" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
