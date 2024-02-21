import { useContext } from "react";
import { Context } from "./store/Context";
import "../asserts/css/style.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ListProduct from "./ListProduct";

export default function Home() {
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

  return (
    <>
      <div id="add-prod">
        <button
          onClick={() => {
            navigate("/post-product");
          }}
        >
          Add Product
        </button>
      </div>

      {context.products.length > 0 ? (
        <div className="home">
          {context.products.map((product) => {
            return <ListProduct key={product.id} product={product} />;
          })}
        </div>
      ) : (
        <p id="no-product">No Products available to show.</p>
      )}
    </>
  );
}
