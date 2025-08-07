import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProductDetails from "./components/product-details/ProductDetails";
import CartPage from "./components/MyCart";
import AllProducts from "./components/AllProducts";
import ProductsPage from "./components/Products";
import MobileBottomNav from "./components/BottomNavbar";
import LoginSignupModal from "./components/LoginSignup";
import { useState } from "react";
import Mywishlist from "./components/Mywishlist";

function App() {
    const [showAuthModal, setShowAuthModal] = useState(false);
  return (
     <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header/>
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/allproducts" element={<ProductsPage />} />
            <Route path="/wishlist" element={<Mywishlist />} />
          </Routes>
          <MobileBottomNav onProfileClick={() => setShowAuthModal(true)} />
             <LoginSignupModal
        show={showAuthModal}
        handleClose={() => setShowAuthModal(false)}
      />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
