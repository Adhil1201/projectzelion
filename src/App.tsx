import React from 'react';
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
import './styles/beam-theme.css';

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <div className="App">
            <Navbar />
            
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