import { useContext, useRef } from "react";
import { FormContext } from "./store/form-context";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const inputRef = useRef();
  const formContext = useContext(FormContext);
  formContext.formOpen(false);
  const navigate = useNavigate();
  function handleBack() {
    navigate("/about");
  }
  function handleNext() {
    navigate("/contact");
  }
  function handleSend(e) {
    e.preventDefault();
    navigate("/home/" + inputRef.current.value);
  }
  return (
    <>
      <p>This is Contact Page</p>
      <form className="account">
        <label>Send text to home</label> <br />
        <input type="text" ref={inputRef} />
        <br />
        <br />
        <button onClick={handleSend}>Send</button>
      </form>
      <div className="back-next">
        <span>
          <button onClick={handleBack}> {"<-"} Back</button>
        </span>
        <span>
          <button onClick={handleNext}>Next {"->"} </button>
        </span>
      </div>
    </>
  );
}
