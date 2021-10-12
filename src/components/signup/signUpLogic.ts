import React from "react";
import { UserInt, mixInt } from "../../usefull/interfaces";

export const submitSignUp = ({ e, user }: mixInt) => {
  e.preventDefault();
  console.log(user);
};
