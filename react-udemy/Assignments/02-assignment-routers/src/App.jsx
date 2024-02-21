import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Header from "./components/Layout/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useState } from "react";
import { FormContext } from "./components/store/form-context";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(undefined);
  function handleForm(value) {
    setFormOpen(value);
  }
  return (
    <FormContext.Provider
      value={{
        formOpen: handleForm,
        setLoggedIn: setLoggedIn,
        loggedIn: loggedIn,
      }}
    >
      <div className="App">
        <BrowserRouter>
          {!formOpen && <Header />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home/:text?" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </div>
    </FormContext.Provider>
  );
}

export default App;
