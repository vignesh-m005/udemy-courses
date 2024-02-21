import { useContext, useEffect, useRef } from "react";
import "../assests/css/style.css";
import { FormContext } from "./store/form-context";
import { Link, useNavigate } from "react-router-dom";
import { USERS } from "../data";
export default function Login() {
  const navigate = useNavigate();
  const userRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();
  const formContext = useContext(FormContext);
  useEffect(() => {
    formContext.formOpen(true);
  }, []);

  function checkLoginValid() {
    for (var i = 0; i < USERS.length; i++) {
      if (USERS[i].userName === userRef.current.value.trim()) {
        if (USERS[i].password === passwordRef.current.value.trim()) {
          formContext.setLoggedIn(USERS[i]);
          return true;
        } else {
          alert("Invalid Password");
          return false;
        }
      }
    }
    alert("Invalid Username");
    return false;
  }

  function handleLogin(e) {
    e.preventDefault();
    if (checkLoginValid()) {
      navigate("/home");
    } else {
      formRef.current.reset();
    }
  }
  return (
    <>
      <form className="account" ref={formRef}>
        <h1>User Login</h1>
        <label>Username:</label>
        <input
          ref={userRef}
          type="text"
          placeholder="Enter Email/Username"
          required
        />{" "}
        <br />
        <br />
        <label>Password:</label>
        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter Password"
          required
        />
        <br />
        <br />
        <button onClick={handleLogin}>Login</button>
        <br />
        <br />
        <p>Don't have an account?</p>
        <Link to="/signup">Create account</Link>
      </form>
    </>
  );
}
