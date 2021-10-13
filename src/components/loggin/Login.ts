import { useDispatch } from "react-redux";
import { mixLogInInt } from "../../usefull/interfaces";
import { addCurrentUser } from "../../redux/actions/user";

export const handleSubmit = async ({ e, logIn }: mixLogInInt) => {
  e.preventDefault();
  const dispatch = useDispatch();
  try {
    let response = await fetch("http://localhost:3001/users/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logIn),
    });
    if (response.ok) {
      let data = await response.json();
      localStorage.setItem("token", data.refreshToken);
      let user = findUserFromToken(data.refreshToken)
      dispatch(addCurrentUser());
    }
  } catch (err) {
    console.log(err);
  }
};

export const findUserFromEmail = async (email: string) => {
  try {
    let response = 
  } catch (err) {
    console.log(err);
  }
};
