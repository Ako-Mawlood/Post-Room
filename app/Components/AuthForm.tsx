"use client";

import { FcGoogle } from "react-icons/fc";
import { ImSpinner8 } from "react-icons/im";
import { useFormStatus } from "react-dom";
import clsx from "clsx";

const AuthForm = ({ isLoginPage }: { isLoginPage: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <div
      className={clsx("flex flex-col w-full", {
        "opacity-60": pending,
      })}
    >
      <input
        className={`${
          pending ? "cursor-not-allowed " : ""
        }py-2 mb-3 text-sm bg-transparent border border-gray-300 rounded-md px-2 focus:shadow-inner focus:outline-none focus:border-gray-400`}
        placeholder="Email"
        type="email"
        required
        disabled={pending}
        name="email"
      />
      <input
        className={`${
          pending ? "cursor-not-allowed" : ""
        }py-2 mb-3 text-sm bg-transparent border border-gray-300 rounded-md px-2 focus:shadow-inner focus:outline-none focus:border-gray-400`}
        placeholder="Password"
        type="password"
        required
        disabled={pending}
        name="password"
      />
      <button
        className="w-full bg-primary flex justify-center font-semibold items-center text-center py-2 rounded-md text-white hover:opacity-90 "
        type="submit"
        disabled={pending}
      >
        <span className="flex justify-center items-center text-center">
          {pending && <ImSpinner8 className="animate-spin mr-3" size={15} />}
          {isLoginPage ? "Login with Email" : "Sign up with Email"}
        </span>
      </button>
      <div className="w-full py-2 my-4 flex justify-center items-center">
        <span className="w-full border-b border-gray-300"></span>
        <span className=" w-[33rem] text-xs font-semibold uppercase text-center">
          Or countinue with
        </span>
        <span className=" border-b border-gray-300 w-full"></span>
      </div>
      <button
        disabled={pending}
        className="flex justify-center items-center font-semibold w-full py-2 transition duration-100 hover:bg-[#ddddef] rounded-md border border-gray-300"
      >
        {pending ? (
          <ImSpinner8 className="animate-spin" size={15} />
        ) : (
          <FcGoogle size={25} />
        )}
        <span className="text-primary px-2 text-sm">Google</span>
      </button>
    </div>
  );
};

export default AuthForm;
