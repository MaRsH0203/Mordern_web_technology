import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  features: string[];
  materials: string[];
  sustainability: {
    carbonFootprint: string;
    recyclable: boolean;
    biodegradable: boolean;
  };
  inStock: boolean;
  rating: number;
  reviews: number;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${productId}`);
      const data = await response.json();
      console.log('Product details response:', data);
      
      if (data.success) {
        setProduct(data.data);
      } else {
        setError(data.message || 'Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      console.log(`Adding ${quantity} of product ${product.id} to cart`);
      // This would normally send a POST request to add to cart
      alert(`Added ${quantity} ${product.name}(s) to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="loading">Loading product details...</div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="error-message">
            {error || 'Product not found'}
          </div>
          <Link to="/search" className="back-link">
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> / 
          <Link to="/search">Products</Link> / 
          <span>{product.name}</span>
        </nav>

        <div className="product-details">
          <div className="product-image-section">
            <img src={product.image} alt={product.name} className="product-image" />
          </div>

          <div className="product-info-section">
            <div className="product-header">
              <h1>{product.name}</h1>
              <div className="product-meta">
                <span className="category-badge">{product.category}</span>
                <div className="rating">
                  ⭐ {product.rating} ({product.reviews} reviews)
                </div>
              </div>
            </div>

            <div className="product-price">
              <span className="price">${product.price}</span>
              <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
              </span>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <h3>Key Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="sustainability-info">
              <h3>🌱 Sustainability Information</h3>
              <div className="sustainability-grid">
                <div className="sustainability-item">
                  <span>Carbon Footprint:</span>
                  <span>{product.sustainability.carbonFootprint}</span>
                </div>
                <div className="sustainability-item">
                  <span>Recyclable:</span>
                  <span>{product.sustainability.recyclable ? '♻️ Yes' : '❌ No'}</span>
                </div>
                <div className="sustainability-item">
                  <span>Biodegradable:</span>
                  <span>{product.sustainability.biodegradable ? '🌱 Yes' : '❌ No'}</span>
                </div>
              </div>
            </div>

            <div className="materials-info">
              <h3>Materials</h3>
              <div className="materials-list">
                {product.materials.map((material, index) => (
                  <span key={index} className="material-tag">{material}</span>
                ))}
              </div>
            </div>

            <div className="purchase-section">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="add-to-cart-btn"
              >
                {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
