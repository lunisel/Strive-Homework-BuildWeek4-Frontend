import { signUpResponse, mixInt, UserInt } from "../../usefull/interfaces";

export const submitSignUp = async ({ e, user }: mixInt) => {
  e.preventDefault();
  try {
    let response = await fetch("http://localhost:3001/users/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      let data: signUpResponse = await response.json();
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("token2", data.refreshToken);
    } else {
      console.log("Something went wrong...");
    }
  } catch (err) {
    console.log(err);
  }
  console.log(user);
};

export const findUserFromToken = async (token: string | null) => {
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