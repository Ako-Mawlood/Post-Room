import React from "react";

const Button = ({ type = "button" }: { type: "button" | "submit" | "reset" }) => {
  return <button type={type}>SubmitButton</button>;
};

export default Button;
