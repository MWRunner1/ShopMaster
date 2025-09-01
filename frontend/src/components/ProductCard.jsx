import { useContext } from "react";
import styles from "./ProductCard.module.css";
import { CartContext } from "../store/CartContext";

export default function ProductCard({ product, onClick }) {
  const { addToCart } = useContext(CartContext);

  return (
    <li className={styles.product} key={product.id}>
      <img
        onClick={onClick}
        className={styles.productImage}
        src={product.image}
        alt={product.name}
        loading="lazy"
      />
      <div className={styles.productDetails}>
        <h2>{product.name}</h2>
        <p>${product.price}</p>
        <p>{product.product_category.name}</p>
        <button onClick={onClick}>Learn More</button>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </li>
  );
}
