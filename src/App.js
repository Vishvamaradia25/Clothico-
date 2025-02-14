import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymenPage";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow bg-gray-50">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="w-full overflow-hidden">
                      <Home />
                      <AboutUs />
                      <ContactUs />
                    </div>
                  }
                />
                
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/products/:category/:id" element={<ProductDetails />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignUpPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/payment" element={<PaymentPage />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

