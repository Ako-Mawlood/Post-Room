import React from "react";
import AuthForm from "./AuthForm";

import Link from "next/link";
interface authProps {
  isLoginPage: boolean;
  actionFunc: any;
}
const AuthFeild = ({ isLoginPage, actionFunc }: authProps) => {
  return (
    <>
      <Link
        className="absolute text-primary underline top-8 right-4 hover:bg-[#ddddef] transition duration-100 rounded-md py-2 px-2"
        href={isLoginPage ? "/sign-in" : "/login"}
      >
        {isLoginPage ? "Create new account" : "Login to your account"}
      </Link>
      <section className="w-9/12  sm:w-7/12 text-secondery flex flex-col items-center ">
        <h1 className="text-2xl  font-bold  text-[#09090b]">
          {isLoginPage ? "Login to your account " : "Create new account"}
        </h1>
        <p className=" text-sm font-semibold my-5 text-gray-400">
          {!isLoginPage
            ? "Enter your Email below to create new account"
            : "Enter your Email and password below to login"}
        </p>
        <form
          action={actionFunc}
          className="flex flex-col w-full justify-between"
        >
          <AuthForm isLoginPage={isLoginPage} actionFunc={actionFunc} />
        </form>
        <p className="text-center mt-4">
          By continuing, you will agree to our{" "}
          <span className="underline">Terms of services</span> and{" "}
          <span className="underline"> Privacy Policy</span>
        </p>
      </section>
    </>
  );
};

export default AuthFeild;
