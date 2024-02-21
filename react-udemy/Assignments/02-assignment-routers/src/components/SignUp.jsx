import { useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "./store/form-context";
import { Link, useNavigate } from "react-router-dom";
import { USERS } from "../data";

export default function SignUp() {
  const navigate = useNavigate();
  const email = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const passwordRef = useRef();
  const formRef = useRef();
  const formContext = useContext(FormContext);
  useEffect(() => {
    formContext.formOpen(true);
  });

  function checkAllFieldsValid() {
    if (email.current.value === "" || !email.current.value.includes("@"))
      return "Enter a valid email address";
    else if (firstName.current.value === "") return "First name is required";
    else if (lastName.current.value === "") return "Last name is required";
    else {
      const password = passwordRef.current.value;
      if (password.trim().length < 8)
        return "Password size must be greater than 8 characters";
      else if (password === password.toLowerCase())
        return "Password must contain atleast one Upper case Character";
      else if (password === password.toUpperCase())
        return "Password must contain atleast one Lower case Character";
      else if (!/\d/.test(password))
        return "Password must contain atleast one numeric character";
      else if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password))
        return "Password must contain atleast on special character.";
      else return "";
    }
  }

  function createUser(user) {
    let userExists = false;
    USERS.forEach((user) => {
      userExists = userExists || user.userName === email.current.value;
    });
    if (userExists) {
      return "User with same email already exists.";
    } else {
      USERS.push(user);
      return "";
    }
  }

  function handleSignup(e) {
    e.preventDefault();
    let user = {
      id: Math.round(Math.random() * Number.MAX_SAFE_INTEGER),
      userName: email.current.value,
      fullName: firstName.current.value + " " + lastName.current.value,
      password: passwordRef.current.value,
    };
    let message = checkAllFieldsValid();
    if (message !== "") {
      alert(message);
    } else {
      message = createUser(user);
      if (message !== "") {
        alert(message);
        formRef.current.reset();
      } else {
        formContext.setLoggedIn(user);
        navigate("/profile");
        // formContext.formOpen(false);
      }
    }
  }
  return (
    <>
      <form className="account" ref={formRef}>
        <h1>Create Account</h1>
        <label>Email:</label>
        <br />
        <input ref={email} type="text" placeholder="Enter Email" />
        <br />
        <br />
        <label>First Name:</label>
        <br />
        <input
          ref={firstName}
          type="text"
          placeholder="Enter First Name"
        />{" "}
        <br />
        <br />
        <label>Last Name:</label> <br />
        <input ref={lastName} type="text" placeholder="Enter Last Name" />{" "}
        <br />
        <br />
        <label>Password:</label> <br />
        <input ref={passwordRef} type="password" placeholder="Enter Password" />
        <br />
        <br />
        <button onClick={handleSignup}>Sign Up</button>
        <br />
        <br />
        <p>
          Continue without signup <Link to="/home">Home</Link>
        </p>
      </form>
    </>
  );
}
