import { mixLogInInt } from "../../usefull/interfaces";

export const handleSubmit = async ({ e, logIn }: mixLogInInt) => {
  e.preventDefault();
  try {
    let response = await fetch("http://localhost:3001/users/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logIn),
    });
    if (response.ok) {
      let data = await response.json();
      localStorage.setItem("token", data.refreshToken);
    }
  } catch (err) {
    console.log(err);
  }
};
