import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import styles from "./CartDetails.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CartDetails() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  async function handleSubmitOrder() {
    try {
      await toast.promise(
        async () => {
          const res = await fetch("http://localhost:5000/api/save_cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cart: cartItems }),
          });
          if (!res.ok) {
            throw new Error("Failed to submit order");
          }
        },
        {
          pending: "Submitting your order...",
          success: "Order submitted successfully!",
          error: "Error submitting your order. Please try again.",
        },
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        }
      );
      clearCart();
      navigate("/");
    } catch (error) {}
  }

  return (
    <div className={styles.cart}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className={styles.cartList}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.cartImage}
                />
                <h3>
                  {item.name} - ${item.price} x {item.quantity}
                </h3>
              </div>
              <button
                className={styles.removeBtn}
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div>
          <h2>
            Total: $
            {cartItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </h2>
          <button className={styles.submitBtn} onClick={handleSubmitOrder}>
            Complete Order
          </button>
        </div>
      )}
    </div>
  );
}
