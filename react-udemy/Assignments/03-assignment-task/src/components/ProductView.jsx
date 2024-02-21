import { useNavigate, useParams } from "react-router-dom";
import "../asserts/css/style.css";
import { useContext, useEffect } from "react";
import { Context } from "./store/Context";
export default function ProductView() {
  const { id } = useParams();
  const context = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!context.isLoggedIn) {
      navigate("/login");
    }
  });

  useEffect(() => {
    context.setActive("home");
  });

  const product = context.products.filter(
    (product) => product.id === Number(id)
  )[0];

  return (
    <ol id="product-view">
      <li>{product.title}</li>
      <li>{product.price}</li>
      <li>{product.category}</li>
      <li>{product.availableQuantity}</li> <br />
      <br />
      <li>{product.description}</li>
    </ol>
  );
}
