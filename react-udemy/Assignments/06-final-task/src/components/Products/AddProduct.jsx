import React from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../store/product-slice";

export default function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Math.random();
    const formData = new FormData(e.target);
    const product = {
      id,
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      quantity: formData.get("quantity"),
      madeIn: formData.get("madeIn"),
      addedTime: Date.now(),
    };
    try {
      dispatch(productActions.addProduct(product));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h3>ADD NEW PRODUCT</h3>
      <label>Title:</label>
      <br />
      <input id="title" type="text" name="title" placeholder="Enter title" />
      <br />
      <label>Description:</label>
      <br />
      <input
        id="description"
        type="text"
        name="description"
        placeholder="Enter Description"
      />
      <br />
      <label>Price:</label>
      <br />
      <input id="price" type="number" name="price" placeholder="Enter price" />
      <br />
      <label>Available Quantity:</label>
      <br />
      <input
        id="quantity"
        type="number"
        name="quantity"
        placeholder="Enter Available Quantity"
      />
      <br />
      <label>Made In:</label>
      <br />
      <input
        id="madeIn"
        type="text"
        name="madeIn"
        placeholder="Enter Made In"
      />
      <br />
      <br />
      <button type="submit">Add</button>
    </form>
  );
}
