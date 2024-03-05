import { useRef, useState } from "react";

export default function Login() {
  // const [enteredValues, setEnteredValues] = useState({
  //   email: "",
  //   password: "",
  // });

  const [formIsValid, setFormIsValid] = useState({
    email: false,
    password: false,
  });

  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const emailIsInvalid = !enteredEmail.includes("@");
    const enteredPassword = passwordRef.current.value;
    const passwordIsInvalid = !enteredPassword.includes("@");
    if (emailIsInvalid || passwordIsInvalid) {
      setFormIsValid({
        email: emailIsInvalid,
        password: passwordIsInvalid,
      });
      return;
    }
    setFormIsValid({
      email: emailIsInvalid,
      password: passwordIsInvalid,
    });
    console.log(formIsValid);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" ref={emailRef} />
          <div className="control-error">
            {formIsValid.email && <p>Please enter a valid email</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={passwordRef}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
