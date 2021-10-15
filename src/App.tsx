import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter,
  Route,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import Loggin from "./components/loggin/Loggin";
import SignUp from "./components/signup/SignUp";
import Home from "./components/home/Home";
import { useSelector } from "react-redux";
import { UserInt, reduxStateInt } from "./usefull/interfaces";

function App() {
  const user = useSelector((state: reduxStateInt) => state.user.currentUser);

  return (
    <div className='App'>
      <BrowserRouter>
        <Route
          exact
          path='/login'
          render={(routerProps: RouteComponentProps) => (
            <Loggin {...routerProps} />
          )}
        />
        <Route
          exact
          path='/signup'
          render={(routerProps: RouteComponentProps) => (
            <SignUp {...routerProps} />
          )}
        />
        <Route exact path='/'>
          {user ? (
            <Route
              exact
              path='/'
              render={(routerProps: RouteComponentProps) => (
                <Home {...routerProps} />
              )}
            />
          ) : (
            <Redirect to='/login' />
          )}
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
