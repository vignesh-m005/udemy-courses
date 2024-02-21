import { createContext } from "react";

export const FormContext = createContext({
  formOpen: () => {},
  setLoggedIn: () => {},
  loggedIn: undefined,
});
