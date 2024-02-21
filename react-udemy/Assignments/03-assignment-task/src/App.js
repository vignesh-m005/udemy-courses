import "./App.css";
import Login from "./components/Login";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Context } from "./components/store/Context";
import { useState } from "react";
import Home from "./components/Home";
import PostProduct from "./components/PostProduct";
import ProductView from "./components/ProductView";
import Signout from "./components/Signout";

const initialProducts = JSON.parse(localStorage.getItem("products"));
const initialLoggedIn = localStorage.getItem("isLoggedIn") === "true";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn || false);
  const [products, setProducts] = useState(initialProducts || []);
  const [active, setActive] = useState("");

  function handleSetProducts(product) {
    setProducts((prev) => {
      const newProducts = [...prev, product];
      console.log(newProducts);
      localStorage.setItem("products", JSON.stringify(newProducts));
      return newProducts;
    });
  }

  function handleRemoveProduct(index) {
    if (index > -1) {
      products.splice(index, 1);
    }
    localStorage.setItem("products", JSON.stringify(products));
  }

  function handleUpdate(products) {
    setProducts(() => {
      localStorage.setItem("products", JSON.stringify(products));
      return products;
    });
  }

  function handleSetLoggedIn(value) {
    setIsLoggedIn(value);
    localStorage.setItem("isLoggedIn", value);
  }

  return (
    <div className="App">
      <Context.Provider
        value={{
          isLoggedIn: isLoggedIn,
          setIsLoggedIn: handleSetLoggedIn,
          products: products,
          setProducts: handleSetProducts,
          active: active,
          setActive: setActive,
          removeProduct: handleRemoveProduct,
          updateProduct: handleUpdate,
        }}
      >
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/post-product" element={<PostProduct />} />
            <Route path="/product-view/:id" element={<ProductView />} />
            <Route path="/sign-out" element={<Signout />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
      <Footer />
    </div>
  );
}

export default App;
