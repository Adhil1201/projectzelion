import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="product-card"
    >
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
        />
        {product.discount && (
          <div className="product-discount-badge">
            -{product.discount}%
          </div>
        )}
        <div className="product-overlay">
          <button 
            className="product-action-btn"
            onClick={() => onQuickView?.(product)}
          >
            <Eye size={18} />
          </button>
          <button className="product-action-btn">
            <Heart size={18} />
          </button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-category">{product.category.toUpperCase()}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-rating">
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
              />
            ))}
          </div>
          <span className="rating-text">({product.reviews})</span>
        </div>

        <div className="product-features">
          {product.features.slice(0, 2).map((feature, index) => (
            <span key={index} className="feature-tag">
              {feature}
            </span>
          ))}
        </div>

        <div className="product-pricing">
          <div className="price-container">
            <span className="current-price">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>

        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart size={18} />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </motion.div>
  );
}

export default ProductCard;