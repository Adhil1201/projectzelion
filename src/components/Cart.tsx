import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

function Cart({ isOpen, onClose }: CartProps) {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to proceed with checkout');
      return;
    }

    setIsCheckingOut(true);
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Order placed successfully!');
    clearCart();
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cart-overlay"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="cart-sidebar"
          >
            <div className="cart-header">
              <h2 className="cart-title">
                <ShoppingBag size={24} />
                Shopping Cart ({state.itemCount})
              </h2>
              <button className="cart-close-btn" onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <div className="cart-content">
              {state.items.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingBag size={48} />
                  <h3>Your cart is empty</h3>
                  <p>Add some products to get started</p>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {state.items.map((item) => (
                      <div key={item.product.id} className="cart-item">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="cart-item-image"
                        />
                        <div className="cart-item-details">
                          <h4 className="cart-item-name">{item.product.name}</h4>
                          <p className="cart-item-price">₹{item.product.price.toLocaleString()}</p>
                          
                          <div className="quantity-controls">
                            <button
                              className="quantity-btn"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="quantity">{item.quantity}</span>
                            <button
                              className="quantity-btn"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="cart-item-actions">
                          <p className="cart-item-total">
                            ₹{(item.product.price * item.quantity).toLocaleString()}
                          </p>
                          <button
                            className="remove-btn"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cart-summary">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>₹{state.total.toLocaleString()}</span>
                    </div>
                    <div className="summary-row">
                      <span>Shipping:</span>
                      <span>Free</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total:</span>
                      <span>₹{state.total.toLocaleString()}</span>
                    </div>

                    <button
                      className="checkout-btn"
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? (
                        <div className="spinner"></div>
                      ) : (
                        'Proceed to Checkout'
                      )}
                    </button>

                    <button
                      className="clear-cart-btn"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Cart;