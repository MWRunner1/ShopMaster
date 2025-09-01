import { useContext } from "react";
import styles from "./ProductModal.module.css";
import { CartContext } from "../store/CartContext";

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useContext(CartContext);

  if (!product) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modalCloseBtn} onClick={onClose}>
          &times;
        </button>
        <div className={styles.modalContent}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.modalImage}
          />
          <div className={styles.modalDetails}>
            <h2>{product.name}</h2>
            <p className={styles.modalPrice}>${product.price}</p>
            <p>{product.description}</p>
            {/* You can add more details here, like a "Add to Cart" button */}
            <button
              className={styles.modalAddToCart}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
