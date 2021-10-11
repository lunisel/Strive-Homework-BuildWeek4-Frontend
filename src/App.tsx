import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, RouteComponentProps } from "react-router-dom";
import Login from "./components/loggin/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route
          exact
          path="/login"
          render={(routerProps: RouteComponentProps) => <Login {...routerProps} />}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
