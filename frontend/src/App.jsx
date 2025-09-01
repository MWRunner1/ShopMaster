import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ProductCatalog from "./components/ProductCatalog";
import { CartProvider } from "./store/CartContext";
import { ProductsProvider } from "./store/ProductsContext";
import CartDetails from "./pages/CartDetails";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <ProductsProvider>
          <CartProvider>
            <Header />
            <main className="main-app">
              <div className="main-content">
                <Routes>
                  <Route path="/" element={<ProductCatalog />} />
                  <Route path="/cart" element={<CartDetails />} />
                </Routes>
              </div>
            </main>
            <ToastContainer />
          </CartProvider>
        </ProductsProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
