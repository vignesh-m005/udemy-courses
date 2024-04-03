import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Profile from "./components/auth/Profile";
import Header from "./components/layout/Header";
import AddProduct from "./components/Products/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, sendProducts } from "./store/product-actions";
import ProductsList from "./components/Products/ProductsList";
import { fetchCarts, sendCarts } from "./store/cart-actions";
import Cart from "./components/cart/Cart";

let isInitial = true;

function App() {
  const product = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCarts());
  }, [dispatch]);

  useEffect(() => {
    if (!isInitial) {
      if (product.changed) {
        dispatch(sendProducts(product.products));
      }
      if (cart.changed) {
        dispatch(sendCarts(cart.cartItems));
      }
    }
    isInitial = false;
  }, [product, dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/product/:productId?" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
