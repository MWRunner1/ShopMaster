import { useContext } from "react";
import styles from "./Header.module.css";
import { CartContext } from "../store/CartContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { totalItems } = useContext(CartContext);
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link className={styles.headerLogo} to={"/"}>
          <img src="/cart.svg" alt="Cart" className={styles.cartIcon} />
          <h1 className={styles.title}>ShopMaster </h1>
        </Link>
        <Link className={styles.cartInfo} to={"/cart"}>
          <p>🛒 {totalItems} items</p>
        </Link>
      </div>
    </header>
  );
}
