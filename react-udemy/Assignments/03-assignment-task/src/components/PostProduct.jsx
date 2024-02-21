import { useContext, useState } from "react";
import "../asserts/css/style.css";
import { Context } from "./store/Context";
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function PostProduct() {
  const [message, setMessage] = useState({
    title: "",
    price: "",
    description: "",
    availableQuantity: "",
    category: "",
  });
  const titleRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();
  const quantityRef = useRef();
  const categoryRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(Context);
  useEffect(() => {
    if (!context.isLoggedIn) {
      navigate("/login");
    }
  });
  useEffect(() => {
    context.setActive("post-product");
  });
  let product;
  let isUpdate = location.state !== null;
  if (location.state === null) {
    product = {
      title: "",
      description: "",
      price: "",
      availableQuantity: "",
      category: "",
    };
  } else {
    let price = location.state.price;
    product = {
      ...location.state,
      price: Number(price),
      availableQuantity: Number(location.state.availableQuantity),
    };
  }
  function generateId() {
    return Math.round(Math.random() * 100000000000);
  }
  let isAllValid = true;
  let focus = true;
  function validProductCheck() {
    if (titleRef.current.value === "") {
      setMessage((prev) => {
        return { ...prev, title: "*Title is required" };
      });
      titleRef.current.focus();
      focus = false;
      isAllValid = false;
    }
    if (priceRef.current.value === "") {
      setMessage((prev) => {
        return { ...prev, price: "*Price is required" };
      });
      isAllValid = false;
      if (focus) {
        priceRef.current.focus();
        focus = false;
      }
    }
    if (descRef.current.value === "") {
      setMessage((prev) => {
        return { ...prev, description: "*Description is required" };
      });
      isAllValid = false;
      if (focus) {
        descRef.current.focus();
        focus = false;
      }
    }
    if (quantityRef.current.value === "") {
      setMessage((prev) => {
        return { ...prev, availableQuantity: "*Quantity is required" };
      });
      isAllValid = false;
      if (focus) {
        quantityRef.current.focus();
        focus = false;
      }
    }
    if (categoryRef.current.value === "") {
      setMessage((prev) => {
        return { ...prev, category: "*Category is required" };
      });
      isAllValid = false;
      if (focus) {
        categoryRef.current.focus();
        focus = false;
      }
    }
  }
  function handlePost(e) {
    e.preventDefault();
    validProductCheck();
    if (isAllValid) {
      const product = {
        id: generateId(),
        title: titleRef.current.value,
        price: priceRef.current.value,
        description: descRef.current.value,
        availableQuantity: quantityRef.current.value,
        category: categoryRef.current.value,
      };
      context.setProducts(product);
      navigate("/home");
    }
  }

  function handleUpdate(e) {
    e.preventDefault();
    for (var i = 0; i < context.products.length; i++) {
      if (context.products[i].id === product.id) {
        context.products[i] = {
          id: product.id,
          title: titleRef.current.value,
          price: priceRef.current.value,
          description: descRef.current.value,
          availableQuantity: quantityRef.current.value,
          category: categoryRef.current.value,
        };
        break;
      }
    }
    context.updateProduct(context.products);
    navigate("/home");
  }

  function handleTitle(e) {
    titleRef.current.value = e.target.value.replace(/[^a-z]/gi, "");
    if (titleRef.current.value !== "") {
      setMessage((prev) => {
        return { ...prev, title: "" };
      });
    }
  }

  return (
    <form id="post-product">
      <label>Title: &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;</label>
      <span className="input-box">
        <input
          ref={titleRef}
          type="text"
          pattern="[A-Za-z]"
          defaultValue={product.title}
          onChange={handleTitle}
          required
          autoFocus
        />
        <pre className="validity">{message.title}&emsp;</pre>
      </span>

      <label>Price: &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;</label>
      <span className="input-box">
        <input
          ref={priceRef}
          type="number"
          defaultValue={product.price}
          onFocus={() => {
            setMessage((prev) => {
              return { ...prev, price: "" };
            });
          }}
          required
        />
        <pre className="validity">{message.price}&emsp;</pre>
      </span>

      <label>Description: &emsp;&emsp;&ensp;</label>
      <span className="input-box">
        <input
          ref={descRef}
          type="text"
          defaultValue={product.description}
          onFocus={() => {
            setMessage((prev) => {
              return { ...prev, description: "" };
            });
          }}
          required
        />
        <pre className="validity">{message.description}&emsp;</pre>
      </span>

      <label>Available Qty: &emsp;&emsp;</label>
      <span className="input-box">
        <input
          ref={quantityRef}
          type="number"
          defaultValue={product.availableQuantity}
          onFocus={() => {
            setMessage((prev) => {
              return { ...prev, availableQuantity: "" };
            });
          }}
          required
        />
        <pre className="validity">{message.availableQuantity}&emsp;</pre>
      </span>

      <label>Category: &emsp;&emsp;&emsp;&emsp;</label>
      <span className="input-box">
        <input
          ref={categoryRef}
          type="text"
          defaultValue={product.category}
          onFocus={() => {
            setMessage((prev) => {
              return { ...prev, category: "" };
            });
          }}
          required
        />
        <pre className="validity">{message.category}&emsp;</pre>
      </span>
      <br />
      {isUpdate ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={handlePost}>Post</button>
      )}
    </form>
  );
}
