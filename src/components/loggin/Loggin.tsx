import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";
import {
  logInInt,
  mixLogInInt,
  UserInt,
  reduxStateInt,
} from "../../usefull/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentUser } from "../../redux/actions/user";
import "./styles.css";

const Login = ({ history, location, match }: RouteComponentProps) => {
  const [logIn, setLogIn] = useState<logInInt>({
    email: "",
    password: "",
  });

  const user = useSelector((state: reduxStateInt) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setLogIn({
      ...logIn,
      [key]: e.target.value,
    });
  };

  const handleSubmit = async ({ e, logIn }: mixLogInInt) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:3001/users/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logIn),
      });
      if (response.ok) {
        let data = await response.json();
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("token2", data.refreshToken);
        let user = await findUserFromToken(data.accessToken);
        if (user) {
          dispatch(addCurrentUser(user));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const findUserFromToken = async (token: string) => {
    try {
      let response = await fetch("http://localhost:3001/users/me", {
        method: "GET",
        headers: {
          Authorization : `Bearer ${token}`
        }
      });
      let data = await response.json()
      let user: UserInt = data;
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='loggin-cont'>
      <div className='content-loggin-cont'>
        <h1 className='loggin-header py-4'>LOGIN</h1>
        <Form
          onSubmit={(e: React.FormEvent) => {
            handleSubmit({ e, logIn });
            /* setTimeout(function () {
              history.push("/");
            }, 1000); */
            if(user)history.push("/")
          }}>
          <Form.Control
            type='text'
            placeholder='Email'
            className='email-input my-3'
            value={logIn.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e, "email")
            }
          />
          <Form.Control
            type='password'
            placeholder='Password'
            className='password-input my-3'
            value={logIn.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e, "password")
            }
          />
          <Form.Check
            type='checkbox'
            label='Remember me'
            className='check-input my-3'
          />
          <Button type='submit' className='log-in-btn my-2'>
            LOGIN
          </Button>
        </Form>
        <p className='parag-login py-3 m-0'>Or login with</p>
        <Button className='OAuth-btn my-2'>OAuth</Button>
        <p className='not-a-member-p py-4 m-0'>
          Not a member?{" "}
          <Link to='/signup' className='link-register'>
            Sign up now!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
