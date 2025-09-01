import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    toast(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      style: {
        border: "1px solid #4BB543",
        color: "#4BB543",
      },
    });
  }

  function removeFromCart(productId) {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.id === productId);
      if (item.quantity === 1) {
        return prevItems.filter((item) => item.id !== productId);
      } else {
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  }

  function clearCart() {
    setCartItems([]);
  }

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, totalItems, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
