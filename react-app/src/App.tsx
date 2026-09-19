import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Product from './pages/Product'
import ProductDetail from './pages/ProductDetail'
import Product210 from './pages/Product210'
import Gallery from './pages/Gallery'
import Warranty from './pages/Warranty'
import Blog from './pages/Blog'
import BlogArticle from './pages/BlogArticle'
import Contact from './pages/Contact'
import ShippingPolicy from './pages/ShippingPolicy'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import Terms from './pages/Terms'
import LegacyFallback from './pages/LegacyFallback'
import NotFound from './pages/NotFound'
import { PRODUCTS } from './pages/products-data'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about-us" element={<About />} />
        <Route path="product" element={<Product />} />
        <Route path="210-paint-protection-film" element={<Product210 />} />
        {PRODUCTS.filter((p) => p.slug !== '210-paint-protection-film').map((p) => (
          <Route key={p.slug} path={p.slug} element={<ProductDetail />} />
        ))}
        <Route path="gallery" element={<Gallery />} />
        <Route path="warranty" element={<Warranty />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/how-long-does-paint-protection-film-last" element={<BlogArticle />} />
        <Route path="blog/category/ppf" element={<Blog />} />
        <Route path="author/autoboost018" element={<Blog />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path="shipping-policy" element={<ShippingPolicy />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="refund-policy" element={<RefundPolicy />} />
        <Route path="terms-and-conditions" element={<Terms />} />
        <Route path="cart" element={<LegacyFallback title="Cart" />} />
        <Route path="checkout" element={<LegacyFallback title="Checkout" />} />
        <Route path="my-account" element={<LegacyFallback title="My Account" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
