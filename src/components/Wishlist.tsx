import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
}

function Wishlist({ isOpen, onClose }: WishlistProps) {
  const { state, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (productId: string) => {
    const wishlistItem = state.items.find(item => item.product.id === productId);
    if (wishlistItem) {
      addToCart(wishlistItem.product);
      removeFromWishlist(productId);
    }
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
                <Heart size={24} />
                Wishlist ({state.itemCount})
              </h2>
              <button className="cart-close-btn" onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <div className="cart-content">
              {state.items.length === 0 ? (
                <div className="empty-cart">
                  <Heart size={48} />
                  <h3>Your wishlist is empty</h3>
                  <p>Add some products you love</p>
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
                          <p className="wishlist-date">
                            Added {item.addedAt.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="cart-item-actions">
                          <button
                            className="add-to-cart-from-wishlist"
                            onClick={() => handleAddToCart(item.product.id)}
                          >
                            <ShoppingCart size={16} />
                          </button>
                          <button
                            className="remove-btn"
                            onClick={() => removeFromWishlist(item.product.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cart-summary">
                    <button
                      className="clear-cart-btn"
                      onClick={clearWishlist}
                    >
                      Clear Wishlist
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

export default Wishlist;