import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { LearningResourcesPage } from './pages/LearningResourcesPage';
import { StudyTipsPage } from './pages/StudyTipsPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { CartProvider } from './contexts/CartContext';
import ScrollToTop from './utils/ScrollToTop';
import { TUTOR_NAME, navLinks } from './data';

const AppRoutes: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen transition-all duration-300 ease-in-out">
      <Header tutorName={TUTOR_NAME} navLinks={navLinks} />
      <main className="flex-grow relative overflow-hidden">
        <div className="transition-all duration-500 ease-in-out">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/learning-resources" element={<LearningResourcesPage />} />
            <Route path="/study-tips" element={<StudyTipsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            {/* Add product detail page route if needed in the future */}
            {/* <Route path="/store/product/:productId" element={<ProductDetailPage />} /> */}
          </Routes>
        </div>
      </main>
      <Footer tutorName={TUTOR_NAME} />
    </div>
  );
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="scroll-smooth scroll-padding-top">
          <AppRoutes />
        </div>
      </CartProvider>
    </HashRouter>
  );
};

export default App;
