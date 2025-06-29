import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { Product } from '../types/Product';

function ProductGrid() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', 'bat', 'ball', 'equipment', 'kit'];

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterProducts(category, searchTerm);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterProducts(selectedCategory, term);
  };

  const filterProducts = (category: string, search: string) => {
    let filtered = products;

    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }

    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <section className="product-grid-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="product-grid-header"
        >
          <h2 className="section-title">Our Products</h2>
          <p className="section-subtitle">
            Discover our premium collection of cricket equipment designed for champions
          </p>
        </motion.div>

        {/* Filters */}
        <div className="product-filters">
          <div className="search-container">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filters">
            <Filter size={20} />
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;