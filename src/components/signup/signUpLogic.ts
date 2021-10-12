import React from "react";
import { signUpResponse, mixInt } from "../../usefull/interfaces";

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
      localStorage.setItem("token", data.refreshToken);
    } else {
      console.log("Something went wrong...");
    }
  } catch (err) {
    console.log(err);
  }
  console.log(user);
};
