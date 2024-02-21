import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./store/Context";

export default function Signout() {
  const navigate = useNavigate();
  const context = useContext(Context);

  useEffect(() => {
    context.setIsLoggedIn(false);
    navigate("/login");
  });

  return <></>;
}
