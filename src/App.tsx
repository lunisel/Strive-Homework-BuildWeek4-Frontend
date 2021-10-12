import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, RouteComponentProps } from "react-router-dom";
import Loggin from "./components/loggin/Loggin";
import SignUp from "./components/signup/SignUp";
import Home from "./components/home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route
          exact
          path="/login"
          render={(routerProps: RouteComponentProps) => (
            <Loggin {...routerProps} />
          )}
        />
        <Route
          exact
          path="/signup"
          render={(routerProps: RouteComponentProps) => (
            <SignUp {...routerProps} />
          )}
        />
        <Route
          exact
          path="/"
          render={(routerProps: RouteComponentProps) => (
            <Home {...routerProps} />
          )}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
