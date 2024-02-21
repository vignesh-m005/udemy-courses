import { useRef, useState } from "react";
import "../asserts/css/style.css";
import { useContext } from "react";
import { Context } from "./store/Context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const [message, setMessage] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const context = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (context.isLoggedIn) {
      navigate("/home");
    }
  });

  useEffect(() => {
    context.setActive("login");
  });

  let isAllValid = true;
  function validEmailCheck(email) {
    if (email === "") {
      setMessage((prev) => {
        return { ...prev, email: "*Email is required" };
      });
      isAllValid = false;
      emailRef.current.focus();
    } else if (!email.includes("@")) {
      setMessage((prev) => {
        return { ...prev, email: "*Enter a valid email address" };
      });
      isAllValid = false;
      emailRef.current.focus();
    } else {
      setMessage((prev) => {
        return { ...prev, email: "" };
      });
      passwordRef.current.focus();
    }
  }

  function validPasswordCheck(password) {
    if (password === "") {
      setMessage((prev) => {
        return { ...prev, password: "*Password is required" };
      });
      isAllValid = false;
    } else if (password.trim().length < 6) {
      setMessage((prev) => {
        return {
          ...prev,
          password: "*Password size must be greater than 8 characters",
        };
      });
      isAllValid = false;
    } else if (password === password.toLowerCase()) {
      setMessage((prev) => {
        return {
          ...prev,
          password: "*Password must contain atleast one Upper case Character",
        };
      });
      isAllValid = false;
    } else if (password === password.toUpperCase()) {
      setMessage((prev) => {
        return {
          ...prev,
          password: "*Password must contain atleast one Lower case Character",
        };
      });
      isAllValid = false;
    } else if (!/\d/.test(password)) {
      setMessage((prev) => {
        return {
          ...prev,
          password: "*Password must contain atleast one numeric character",
        };
      });
      isAllValid = false;
    } else if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
      setMessage((prev) => {
        return {
          ...prev,
          password: "*Password must contain atleast on special character.",
        };
      });
      isAllValid = false;
    } else {
      setMessage((prev) => {
        return { ...prev, password: "" };
      });
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    validEmailCheck(emailRef.current.value);
    validPasswordCheck(passwordRef.current.value);
    if (isAllValid) {
      context.setIsLoggedIn(true);
      navigate("/home");
    }
  }
  return (
    <form id="login">
      <label>Email Id: &emsp;&emsp;&ensp;</label>
      <span className="input-box">
        <input ref={emailRef} type="text" required autoFocus />
        <pre className="validity">{message.email}&emsp;</pre>
      </span>
      <label>Password: &emsp;&emsp;</label>
      <span className="input-box">
        <input
          ref={passwordRef}
          type={showPassword ? "text" : "password"}
          required
        />
        <pre className="validity">{message.password}</pre>{" "}
      </span>
      <span className="show-pass">
        <label>Show Password</label>
        <input
          id="check"
          type="checkbox"
          value={showPassword}
          onChange={() => setShowPassword((prev) => !prev)}
        />
      </span>
      <br /> <p> </p>
      <button onClick={handleLogin}>Login</button>
    </form>
  );
}
