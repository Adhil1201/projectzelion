import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User, LogOut, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import Cart from './Cart';
import Wishlist from './Wishlist';

interface NavbarProps {
  onShowLogin: () => void;
  onShowSignup: () => void;
}

function Navbar({ onShowLogin, onShowSignup }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="logo-container">
            <img src="/images/favicon-32x32.png" alt="Zelion Logo" className="nav-logo" />
            <span className="logo-text">ZELION</span>
          </div>
          
          <ul className={`nav-links ${isOpen ? 'nav-links-open' : ''}`}>
            <li><button onClick={() => scrollToSection('home')}>Home</button></li>
            <li><button onClick={() => scrollToSection('about')}>About</button></li>
            <li><button onClick={() => scrollToSection('products')}>Products</button></li>
            <li><button onClick={() => scrollToSection('shop')}>Shop</button></li>
            <li><button onClick={() => scrollToSection('offers')}>Offers</button></li>
            <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
          </ul>

          <div className="nav-actions">
            {/* Wishlist Button */}
            <button 
              className="nav-action-btn wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
            >
              <Heart size={20} />
              {wishlistState.itemCount > 0 && (
                <span className="cart-badge">{wishlistState.itemCount}</span>
              )}
            </button>

            {/* Cart Button */}
            <button 
              className="nav-action-btn cart-btn"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={20} />
              {cartState.itemCount > 0 && (
                <span className="cart-badge">{cartState.itemCount}</span>
              )}
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div className="user-menu">
                {user.avatar && (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="user-avatar"
                  />
                )}
                <span className="user-name">Hi, {user.name}</span>
                <button 
                  className="nav-action-btn logout-btn"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button 
                  className="nav-action-btn"
                  onClick={onShowLogin}
                >
                  <User size={20} />
                  Login
                </button>
                <button 
                  className="nav-action-btn signup-btn"
                  onClick={onShowSignup}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          <button 
            className="menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Wishlist Sidebar */}
      <Wishlist isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
}

export default Navbar;