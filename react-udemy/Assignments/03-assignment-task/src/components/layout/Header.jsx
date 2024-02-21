import "../../asserts/css/style.css";
import { Link } from "react-router-dom";
import { Context } from "../store/Context";
import { useContext } from "react";
export default function Header() {
  const context = useContext(Context);
  let className = context.active === "login" ? "active" : "";
  return (
    <>
      <header>
        {context.isLoggedIn ? (
          <>
            <div id="header-main">
              <span>
                <Link
                  to={"/home"}
                  className={context.active === "home" ? "active" : ""}
                >
                  Home
                </Link>{" "}
                |
              </span>
              &nbsp;
              <span>
                <Link
                  to={"/post-product"}
                  className={context.active === "post-product" ? "active" : ""}
                >
                  Post Product
                </Link>{" "}
                |
              </span>
              <span>
                &nbsp;
                <Link
                  to={"/about"}
                  className={context.active === "about" ? "active" : ""}
                >
                  About Us
                </Link>
              </span>
            </div>
            <div id="login-header">
              <Link to={"/sign-out"}>Sign Out</Link>
            </div>
          </>
        ) : (
          <div id="login-header">
            <Link
              to={"/login"}
              className={context.active === "login" ? "active" : ""}
            >
              Login
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
