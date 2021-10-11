import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, RouteComponentProps } from "react-router-dom";
import Loggin from "./components/loggin/Loggin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route
          exact
          path="/login"
          render={(routerProps: RouteComponentProps) => <Loggin {...routerProps} />}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
