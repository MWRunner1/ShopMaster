//Context for products
import { createContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/products");
      if (!res.ok) {
        throw new Error("Server error");
      }
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      setError("⚠️ Could not load products. Try again?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, loading, error, fetchProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
