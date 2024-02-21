import { createContext } from "react";

export const Context = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  products: [],
  setProducts: () => {},
  active: "",
  setActive: () => {},
  removeProduct: () => {},
  updateProduct: () => {},
});
