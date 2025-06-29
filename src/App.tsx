import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import ProductGrid from './components/ProductGrid';
import Offers from './components/Offers';
import ScrollVelocity from './components/ScrollVelocity';
import Contact from './components/Contact';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import './styles/beam-theme.css';

type PageType = 'main' | 'login' | 'signup';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('main');

  const handleShowLogin = () => setCurrentPage('login');
  const handleShowSignup = () => setCurrentPage('signup');
  const handleBackToMain = () => setCurrentPage('main');

  if (currentPage === 'login') {
    return (
      <AuthProvider>
        <LoginPage 
          onBack={handleBackToMain}
          onSwitchToSignup={handleShowSignup}
        />
      </AuthProvider>
    );
  }

  if (currentPage === 'signup') {
    return (
      <AuthProvider>
        <SignupPage 
          onBack={handleBackToMain}
          onSwitchToLogin={handleShowLogin}
        />
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <div className="App">
            <Navbar 
              onShowLogin={handleShowLogin}
              onShowSignup={handleShowSignup}
            />
            
            <section id="home">
              <Home />
            </section>

            <section id="about">
              <About />
            </section>

            <section id="products">
              <Products />
            </section>

            <section id="shop">
              <ProductGrid />
            </section>

            <section id="offers">
              <Offers />
            </section>

            <ScrollVelocity
              texts={["ZELION", "CRICKET", "CHAMPIONS"]}
              numCopies={8}
              velocity={60}
            />

            <section id="contact">
              <Contact />
            </section>
          </div>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;