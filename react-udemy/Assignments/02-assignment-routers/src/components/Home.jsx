import { useContext, useEffect, useMemo } from "react";
import { FormContext } from "./store/form-context";
import { useNavigate, useParams } from "react-router-dom";

export default function Home() {
  const formContext = useContext(FormContext);
  useEffect(() => {
    formContext.formOpen(false);
  }, []);

  const navigate = useNavigate();
  let { text } = useParams();

  function handleBack() {
    navigate("/home");
  }
  function handleNext() {
    navigate("/about");
  }
  return (
    <>
      <p>This is Home Page</p>
      {text && <p>Received message: {text}</p>}
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
