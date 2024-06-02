"use client";

import { FcGoogle } from "react-icons/fc";
import { ImSpinner8 } from "react-icons/im";
import clsx from "clsx";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaApple } from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";


interface formDataType {
  email: string;
  password: string;
}

const AuthForm = ({ isSignInPage }: { isSignInPage: boolean }) => {

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<formDataType>()
  const url = isSignInPage ? "/api/login" : "/api/register"
  const router = useRouter()

  const onSubmit: SubmitHandler<formDataType> = async (data) => {
    try {
      const res = await axios.post(url, data)
      if (isSignInPage) {
        router.push("/")
      } else {
        router.push('/verify')
      }
    }
    catch (err: any) {
      if (err.response) {
        setError("root", {
          message: err.response.data,
        });
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx("flex flex-col text-sm w-full", {
        "opacity-60": isSubmitting,
      })}>

      {errors.root && <span className="text-red-500 bg-red-500/20 px-2 py-2 mb-2 rounded-sm font-semibold border border-red-300">{errors.root?.message}</span>}
      {!isSignInPage &&
        <div className="flex w-full">
          <input
            className={clsx("py-3 mb-3 bg-transparent border w-1/2 rounded-md px-2 focus:shadow-inner focus:outline-none", {
              "cursor-not-allowed": isSubmitting,
              "border-red-300 focus:border-red-400": errors.email,
              "border-gray-300 focus:border-gray-400": !errors.email
            })}
            placeholder="Name"
            disabled={isSubmitting}
          />
          <input
            className={clsx("py-3 mb-3 bg-transparent border w-1/2 ml-3 rounded-md px-2 focus:shadow-inner focus:outline-none", {
              "cursor-not-allowed": isSubmitting,
              "border-red-300 focus:border-red-400": errors.email,
              "border-gray-300 focus:border-gray-400": !errors.email
            })}
            placeholder="*User name"
            disabled={isSubmitting}
          />
        </div>
      }
      {errors.email && <span className="text-red-500 pb-1 font-semibold">{errors.email?.message}</span>}
      <input
        className={clsx("py-3 mb-3 bg-transparent border rounded-md px-2 focus:shadow-inner focus:outline-none", {
          "cursor-not-allowed": isSubmitting,
          "border-red-300 focus:border-red-400": errors.email,
          "border-gray-300 focus:border-gray-400": !errors.email
        })}
        placeholder="Email"
        disabled={isSubmitting}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address",
          }
        }
        )}
      />
      {
        errors.password && <span className="text-red-500 pb-1 font-semibold">{errors.password.message}</span>
      }
      <input
        className={clsx("py-3 mb-3 bg-transparent border rounded-md px-2 focus:shadow-inner focus:outline-none ", {
          "cursor-not-allowed": isSubmitting,
          "border-red-300 focus:border-red-400": errors.email,
          "border-gray-300 focus:border-gray-400": !errors.email
        })}
        placeholder="Password"
        type="password"
        disabled={isSubmitting}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long"
          }
        }
        )}
      />
      <button
        className="w-full bg-slate-950 flex justify-center font-semibold text-base items-center text-center py-3 rounded-md text-white hover:opacity-90"
        type="submit"
        disabled={isSubmitting}
      >
        <span className="flex justify-center items-center text-center">
          {isSubmitting && <ImSpinner8 className="animate-spin mr-3" size={15} />}
          {isSignInPage ? "Sign in with Email" : "Sign up with Email"}
        </span>
      </button>
      <div className="w-full py-2 my-3 flex justify-center items-center">
        <span className="w-full border-b border-gray-300"></span>
        <span className="w-[33rem] text-xs font-semibold uppercase text-center">
          Or countinue with
        </span>
        <span className="border-b border-gray-300 w-full"></span>
      </div>

      <section className="flex flex-col items-center text-lg text-gray-700 justify-between h-64">
        <button
          disabled={isSubmitting}
          className="flex justify-center p-2 items-center font-bold w-full transition duration-100 hover:bg-[#ddddef] rounded-md border border-gray-300"
        >
          {isSubmitting ? (
            <ImSpinner8 className="animate-spin" size={25} />
          ) : (
            <FaApple className="mr-auto text-black" size={35} />
          )}
          <span className="px-2 mr-auto">Apple</span>
        </button>
        <button
          disabled={isSubmitting}
          className="flex justify-center p-2 items-center font-bold w-full transition duration-100 hover:bg-[#ddddef] rounded-md border border-gray-300"
        >
          {isSubmitting ? (
            <ImSpinner8 className="animate-spin" size={25} />
          ) : (
            <FcGoogle className="mr-auto" size={35} />
          )}
          <span className="px-2 mr-auto">Google</span>
        </button>
        <button
          disabled={isSubmitting}
          className="flex justify-center p-2 items-center font-bold w-full transition duration-100 hover:bg-[#ddddef] rounded-md border border-gray-300"
        >
          {isSubmitting ? (
            <ImSpinner8 className="animate-spin" size={25} />
          ) : (
            <IoLogoFacebook className="mr-auto text-blue-500" size={35} />
          )}
          <span className="px-2 mr-auto">Facebook</span>
        </button>
        <button
          disabled={isSubmitting}
          className="flex justify-center p-2 items-center font-bold w-full transition duration-100 hover:bg-[#ddddef] rounded-md border border-gray-300"
        >
          {isSubmitting ? (
            <ImSpinner8 className="animate-spin" size={25} />
          ) : (
            <FaSquareXTwitter className="mr-auto text-black" size={35} />
          )}
          <span className="px-2 mr-auto">X</span>
        </button>
      </section>
    </form>
  );
};

export default AuthForm;