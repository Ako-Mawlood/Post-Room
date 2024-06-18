"use client";

import React, { ReactNode } from "react";
import { FcGoogle as Google } from "react-icons/fc";
import { FaApple as Apple } from "react-icons/fa6";
import Facebook from "@/public/Icons/Facebook";
import { FaSquareXTwitter as X } from "react-icons/fa6";

const authOptions = {
  Google,
  Apple,
  Facebook,
  X,
};

interface authOptionsPropsType {
  isNewUser: boolean;
  children: ReactNode;
}
const AuthOptions = ({ isNewUser, children }: authOptionsPropsType) => {
  return (
    <section className="flex flex-col gap-4 items-center w-full text-md p-4 font-semibold">
      {Object.entries(authOptions).map(([name, Icon]) => (
        <button
          key={name}
          className="flex justify-center w-full px-4 py-2 rounded-full bg-transparent border border-gray-200 hover:bg-gray-100 duration-150"
        >
          <Icon className="size-7 mr-auto text-black" />
          <span className="mr-auto">
            {isNewUser ? `Sign in with ${name}` : `Sign up with ${name}`}
          </span>
        </button>
      ))}
      {children}
    </section>
  );
};

export default AuthOptions;
