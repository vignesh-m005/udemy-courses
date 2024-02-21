import { Link, useNavigate } from "react-router-dom";
import "../../assests/css/style.css";
import { useContext } from "react";
import { FormContext } from "../store/form-context";

export default function Header() {
  const navigate = useNavigate();
  const formContext = useContext(FormContext);
  function handleLogin() {
    navigate("/login");
  }
  function handleSignup() {
    navigate("/signup");
  }
  function handleLogout() {
    formContext.setLoggedIn(undefined);
    navigate("/home");
  }
  return (
    <header>
      <nav className="front">
        <span>
          <Link to="/home">Home</Link>
        </span>
        <span>
          <Link to="/about">About</Link>
        </span>
        <span>
          <Link to="/contact">Contact</Link>
        </span>
        <span>
          <Link to="/profile">Profile</Link>
        </span>
      </nav>

      <nav className="back">
        {!formContext.loggedIn ? (
          <>
            <span>
              <button onClick={handleLogin}>Log in</button>
            </span>
            <span>
              <button onClick={handleSignup}>Sign Up</button>
            </span>
          </>
        ) : (
          <span>
            <button onClick={handleLogout}>Log out</button>
          </span>
        )}
      </nav>
    </header>
  );
}
