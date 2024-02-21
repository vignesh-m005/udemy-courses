import { useContext, useEffect } from "react";
import { FormContext } from "./store/form-context";
import { Navigate } from "react-router-dom";
export default function Profile() {
  const formContext = useContext(FormContext);
  useEffect(() => {
    formContext.formOpen(false);
  }, []);

  return (
    <>
      {formContext.loggedIn ? (
        <div>
          <p>Name: {formContext.loggedIn.fullName}</p>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
