import { useContext, useEffect } from "react";
import { FormContext } from "./store/form-context";
import { useNavigate } from "react-router-dom";

export default function About() {
  const formContext = useContext(FormContext);
  formContext.formOpen(false);
  const navigate = useNavigate();

  function handleBack() {
    navigate("/home");
  }
  function handleNext() {
    navigate("/contact");
  }
  return (
    <>
      <p>This is About Page</p>
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
