import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route path="/signin">
        <Login />
      </Route>

      <Route path="/register">
        <SignUp />
      </Route>
    </>
  );
};

export default App;
