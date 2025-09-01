import { useContext, useMemo, useState } from "react";
import styles from "./ProductCatalog.module.css";
import ProductCard from "./ProductCard";
import { ProductsContext } from "../store/ProductsContext";
import { CartContext } from "../store/CartContext";
import ProductModal from "./ProductModal";

export default function ProductCatalog() {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("name-asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  //context for products
  const { products, loading, error, fetchProducts } =
    useContext(ProductsContext);

  const sortOptions = [
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  function handleCategoryChange(e) {
    setCategory(e.target.value);
    setPage(1);
  }

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setPage(newPage);
  }

  function openModal(product) {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedProduct(null);
    setIsModalOpen(false);
  }

  // Number of products to display per page
  const itemsPerPage = 20;

  const categories = useMemo(
    () => [
      "All",
      ...new Set(products.map((product) => product.product_category.name)),
    ],
    [products]
  );

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sort) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return sorted;
  }, [products, sort]);

  const filteredProducts = useMemo(
    () =>
      sortedProducts.filter((product) => {
        if (category === "All") return true;
        return product.product_category.name === category;
      }),
    [sortedProducts, category]
  );
  const currentProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <div className={styles.errorContainer}>
          <p>Error loading products: {error}</p>
          <button onClick={fetchProducts}>Retry</button>
        </div>
      ) : (
        <>
          <div className={styles.filterContainer}>
            <div className={styles.filterGroup}>
              <label htmlFor="category">Filter by Category: </label>
              <select
                className={styles.categorySelector}
                id="category"
                value={category}
                onChange={(e) => handleCategoryChange(e)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <span className={styles.selectArrow}></span>
            </div>
            <div className={styles.filterGroup}>
              <label htmlFor="sort">Sort by: </label>
              <select
                className={styles.sortSelector}
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className={styles.selectArrow}></span>
            </div>
          </div>
          <ul className={styles.productCatalog}>
            {currentProducts.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => openModal(product)}
                />
              );
            })}
          </ul>
          <div className={styles.pagination}>
            <button
              className={styles.pageButton}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className={styles.pageButton}
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
          {isModalOpen && (
            <ProductModal product={selectedProduct} onClose={closeModal} />
          )}
        </>
      )}
    </div>
  );
}
