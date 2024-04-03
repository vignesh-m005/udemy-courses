import { Link, useNavigate } from "react-router-dom";
import "../../assets/style.css";

export default function Header() {
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/login");
  }
  function handleSignup() {
    navigate("/signup");
  }
  function handleLogout() {
    navigate("/home");
  }

  return (
    <header>
      <nav className="front">
        <span>
          <Link to="/home">Home</Link>
        </span>
        <span>
          <Link to="/products">Products</Link>
        </span>
        <span>
          <Link to="/cart">Cart</Link>
        </span>
        <span>
          <Link to="/profile">Profile</Link>
        </span>
        <span>
          <Link to="/add-product">Add Product</Link>
        </span>
      </nav>
      <nav className="back">
        <span>
          <Link to="/login">Login</Link>
        </span>
        <span>
          <Link to="/signup">Sign up</Link>
        </span>
      </nav>
    </header>
  );
}
