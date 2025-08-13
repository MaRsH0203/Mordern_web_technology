import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image?: string;
}

const API_BASE = "http://localhost:3000";
const FALLBACK_IMG = "https://via.placeholder.com/300x200?text=EcoCart";

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch products once; derive categories from them
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        if (!res.ok) throw new Error(`Products request failed: ${res.status}`);
        const data: Product[] = await res.json();

        const withImages = data.map((p) => ({
          ...p,
          image: p.image && p.image.trim() ? p.image : FALLBACK_IMG,
        }));

        setProducts(withImages);
        setFilteredProducts(withImages);

        const derivedCats = Array.from(new Set(withImages.map((p) => p.category)));
        setCategories(derivedCats);
      } catch (e: any) {
        // Ignore aborts; show other errors
        if (e?.name !== "AbortError") setError(e?.message ?? "Failed to load products.");
        setProducts([]);
        setFilteredProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter whenever inputs change
  useEffect(() => {
    let list = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    setFilteredProducts(list);
  }, [searchQuery, selectedCategory, products]);

  const resultTitle = useMemo(() => {
    const count = filteredProducts.length;
    return searchQuery || selectedCategory
      ? `Search Results (${count} found)`
      : `All Products (${count})`;
  }, [filteredProducts.length, searchQuery, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="search-page">
      <div className="container">
        <h1>Search Sustainable Products</h1>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-controls">
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Search for eco-friendly products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                🔍 Search
              </button>
            </div>
            <div className="filter-group">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-filter"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>

        <div className="search-results">
          <div className="results-header">
            <h2>{resultTitle}</h2>
            {(searchQuery || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                }}
                className="clear-filters-btn"
              >
                Clear Filters
              </button>
            )}
          </div>

          {loading ? (
            <div className="loading">Loading products...</div>
          ) : error ? (
            <div className="no-results">{error}</div>
          ) : (
            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product._id} className="product-card">
                    <img
                      loading="lazy"
                      src={product.image || FALLBACK_IMG}
                      alt={product.name}
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG;
                      }}
                    />
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-category">{product.category}</p>
                      <p className="product-description">{product.description}</p>
                      <div className="product-footer">
                        <span className="product-price">${product.price}</span>
                        <Link to={`/products/${product._id}`} className="view-product-btn">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>No products found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;