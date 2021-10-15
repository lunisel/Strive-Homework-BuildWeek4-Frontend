import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";
import { submitSignUp, findUserFromToken } from "./signUpLogic";
import { reduxStateInt, UserInt } from "../../usefull/interfaces";
import { addCurrentUser } from "../../redux/actions/user";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";

const SignUp = ({ history, location, match }: RouteComponentProps) => {
  const [user, setUser] = useState<UserInt>({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const userRedux: UserInt | null = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setUser({
      ...user,
      [key]: e.target.value,
    });
  };

  return (
    <div className="signup-cont">
      <div className="content-container-signup">
        <h1 className="signup-header pb-4 pt-2">SIGN-UP</h1>
        <Form
          onSubmit={(e: React.FormEvent) => {
            submitSignUp({ e, user });
            setTimeout(async function () {
              let userFromToken = await findUserFromToken(
                localStorage.getItem("token")
              );
              if (userFromToken) {
                dispatch(addCurrentUser(userFromToken));
                if (userRedux) history.push("/");
              }
            }, 500);
          }}
        >
          <Form.Control
            type="text"
            placeholder="Email..."
            className="email-input my-3"
            value={user.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e, "email")
            }
          />
          <Form.Control
            type="password"
            placeholder="Password..."
            className="password-input my-3"
            value={user.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e, "password")
            }
          />
          <Form.Control
            type="text"
            placeholder="Full name..."
            className="fullName-input my-3"
            value={user.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e, "name")
            }
          />

          <Button type="submit" className="log-in-btn my-2">
            SIGN-UP
          </Button>
        </Form>
        <p className="parag-login py-3 m-0">Or sign-up with</p>
        <Button className="OAuth-btn my-2">OAuth</Button>
        <p className="not-a-member-p pt-4 pb-2 m-0">
          Already a member?{" "}
          <Link to="/login" className="link-login">
            Log in now!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
