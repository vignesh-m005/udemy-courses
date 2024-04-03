import { useDispatch } from "react-redux";
import Card from "../UI/Card.jsx";
import "./ProductItem.css";
import { cartActions } from "../../store/cart-slice.js";
import { productActions } from "../../store/product-slice.js";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const isProductAvailable = product.quantity > 0;
  function cartClickHandler(e) {
    e.preventDefault();
    const id = Math.random();
    const newCart = {
      id,
      productId: product.id,
      user: 2,
    };
    dispatch(cartActions.addItemToCart(newCart));
    dispatch(
      productActions.updateProduct({
        ...product,
        quantity: product.quantity - 1,
      })
    );
  }

  return (
    <>
      <Card className="product-item">
        <div className="product-item__description">
          <h2>{product.title}</h2>
          <div className="product-item__price">₹ {product.price}</div>
        </div>
        <div className="product-item-quantity">{product.quantity}</div>
        <button onClick={cartClickHandler} disabled={!isProductAvailable}>
          Add to Cart
        </button>
        &emsp;
      </Card>
    </>
  );
};

export default ProductItem;
