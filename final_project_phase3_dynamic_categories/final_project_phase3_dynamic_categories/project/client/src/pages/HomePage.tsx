import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  featured: boolean;
}

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Set the browser tab title
  useEffect(() => {
    document.title = 'EcoCart | Sustainable Shopping';
  }, []);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products?featured=true');
      const data = await response.json();
      console.log('Featured products response:', data);

      if (data.success) setFeaturedProducts(data.data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homepage">
      {/* FULL-SCREEN HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to EcoCart</h1>
          <p>Your one-stop shop for sustainable and eco-friendly products</p>
          <p className="hero-subtitle">
            Make a difference with every purchase. Shop consciously, live sustainably.
          </p>
          <Link to="/search" className="cta-button">Shop Now</Link>
        </div>
        {/* optional decorative panel on large screens */}
        <div className="hero-art" aria-hidden="true" />
      </section>

      <section className="featured-products">
        <div className="container">
          <h2>Featured Sustainable Products</h2>

          {loading ? (
            <div className="loading">Loading featured products...</div>
          ) : (
            <div className="products-grid">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} />
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-category">{product.category}</p>
                      <p className="product-description">{product.description}</p>
                      <div className="product-footer">
                        <span className="product-price">${product.price}</span>
                        <Link to={`/products/${product.id}`} className="view-product-btn">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No featured products available at the moment.</p>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <h2>Why Choose EcoCart?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>🌍 Eco-Friendly</h3>
              <p>All products are carefully selected for their environmental benefits</p>
            </div>
            <div className="feature">
              <h3>♻️ Sustainable</h3>
              <p>Supporting brands that prioritize sustainability and ethical practices</p>
            </div>
            <div className="feature">
              <h3>🌱 Zero Waste</h3>
              <p>Help reduce waste with our curated zero-waste product collection</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;