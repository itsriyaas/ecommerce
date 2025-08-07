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

function App() {
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
          </Routes>
         
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
