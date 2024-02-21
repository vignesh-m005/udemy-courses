import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "./store/Context";
export default function ListProduct({ product }) {
  const navigate = useNavigate();
  const context = useContext(Context);
  let description = product.description;
  if (product.description.length > 100) {
    description = product.description.substring(0, 100) + "...";
  }

  function handleEdit() {
    navigate("/post-product", { state: product });
  }

  function handleRemove() {
    const index = context.products.indexOf(product);
    context.removeProduct(index);
    navigate("/home");
  }

  return (
    <>
      <div id="list-container">
        <div id="title-price">
          <p>
            <Link to={"/product-view/" + product.id}>{product.title} </Link>
          </p>
          <p>{product.price}</p>
        </div>
        <div id="list-others">
          <span>Desc:</span> {description} <br />
          <span>Available Qty:</span> {product.availableQuantity} <br />
          <span>Category: </span> {product.category}
        </div>
        <div id="edit-list">
          <button type="button" className="close" onClick={handleRemove}>
            <span>&times;</span>
          </button>
          <br />
          <button className="edit" onClick={handleEdit}>Edit</button>
        </div>
      </div>
    </>
  );
}
