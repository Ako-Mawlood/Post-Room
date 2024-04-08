import React from "react";
import { FcGoogle } from "react-icons/fc";

import Link from "next/link";
interface authProps {
  isLoginPage: boolean;
  actionFunc: () => void;
}
const AuthFeild = ({ isLoginPage, actionFunc = () => {} }: authProps) => {
  return (
    <>
      <Link
        className="absolute text-primary underline top-8 right-4 hover:bg-[#ececf6] transition duration-100 rounded-md py-2 px-2"
        href={isLoginPage ? "/sign-in" : "/login"}
      >
        {isLoginPage ? "Create new account" : "Login to your account"}
      </Link>
      <section className="w-7/12 text-secondery flex flex-col items-center ">
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
          <input
            className="py-2 mb-3 text-sm bg-transparent border border-gray-200 rounded-md px-2 focus:outline-none focus:shadow-inner  focus:border-gray-400"
            placeholder="name@Example.com"
            type="Email"
            required
            name="email"
          />
          {isLoginPage && (
            <input
              className=" py-2 mb-3 text-sm bg-transparent border border-gray-200  rounded-md px-2  focus:shadow-inner focus:outline-none focus:border-gray-400"
              placeholder="Password"
              type="password"
              required
              name="password"
            />
          )}

          <button
            className="w-full bg-[#1a1a1d] py-2 rounded-md text-white hover:opacity-90 "
            type="submit"
          >
            {isLoginPage ? "Login with Email" : "Sign in with Email"}
          </button>
        </form>

        <div className="w-full py-2 my-4 flex justify-center items-center">
          <span className="w-full border-b border-gray-200 "></span>
          <span className=" w-[33rem] text-xs font-semibold  text-center">
            OR COUNTINUE WITH
          </span>
          <span className=" border-b border-gray-200 w-full"></span>
        </div>
        <button className="flex justify-center items-center w-full py-2 transition duration-100 hover:bg-[#ececf6] rounded-md border border-gray-200">
          <FcGoogle size={25} />
          <span className="text-primary font-bold px-2 text-sm">Google</span>
        </button>
        <p className="text-center mt-4">
          By clicking countinue, you will agree to our{" "}
          <span className="underline">Terms of services</span> and{" "}
          <span className="underline"> Privacy Policy</span>
        </p>
      </section>
    </>
  );
};

export default AuthFeild;
