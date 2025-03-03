"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosArrowRoundBack as ArrowIcon } from "react-icons/io";
import { useForm } from "react-hook-form";
import { ImSpinner8 } from "react-icons/im";
import axiosInstance from "@/libs/axiosInstance";
import {
  LuEye as ShowPassword,
  LuEyeOff as HidePassword,
} from "react-icons/lu";
import clsx from "clsx";
import { Input } from "@/app/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { ResetPassword } from "./ResetPassword";

const signinSchema = z.object({
  email: z
    .string()
    .min(1, "Please provide your email address")
    .email("Invalid email address"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

type formDataType = z.infer<typeof signinSchema>;

interface emailSigninFormPropsType {
  setIsSigninFormVisible: Dispatch<SetStateAction<boolean>>;
}

const EmailSigninForm = ({
  setIsSigninFormVisible,
}: emailSigninFormPropsType) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<formDataType>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signinSchema),
  });

  async function handleSignin(data: formDataType) {
    await axiosInstance
      .post("/api/login", data)
      .then((res) => {
        setCookie("token", res.headers.authorization, {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
        router.push("/blogs");
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          setError("root", {
            message:
              "You are probably disconnected, Please check your internet connection",
          });
        } else {
          setError("root", { message: err?.response?.data });
        }
      });
  }

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return (
    <main className="flex w-full flex-col items-center gap-12 text-gray-900">
      <div className="x-4 flex flex-col gap-6 text-center">
        <h1 className="text-4xl">Sign in with Email</h1>
        <p className="text-gray-400">
          Enter your Email and Password below to sign in
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleSignin)}
        className="flex w-full flex-col items-center gap-2 px-4"
      >
        {errors.root?.message && (
          <p className="mb-4 w-full rounded-md border border-red-400 bg-red-500/15 p-3 text-xs font-semibold text-red-500">
            {errors.root?.message}
          </p>
        )}
        <label className="item-start flex w-full flex-col gap-2">
          <span>Email address</span>
          {errors.email?.message && (
            <p className="text-xs font-semibold text-red-500">
              {errors.email?.message}
            </p>
          )}
          <div className="relative w-full">
            <Input
              {...register("email")}
              disabled={isSubmitting}
              autoComplete="off"
              type="text"
              onChangeCapture={() => setError("root", { message: "" })}
              className={clsx("w-full bg-slate-100 text-start", {
                "border-gray-300 focus:border-gray-400": !errors.email?.message,
                "border-red-400": errors.email?.message || errors.root?.message,
              })}
            />
          </div>
        </label>
        <label className="flex w-full flex-col items-start gap-2">
          <span>Password</span>
          {errors.password?.message && (
            <p className="text-xs font-semibold text-red-500">
              {errors.password?.message}
            </p>
          )}
          <div className="relative w-full">
            <Input
              {...register("password")}
              disabled={isSubmitting}
              type={isPasswordVisible ? "text" : "password"}
              onChangeCapture={() => setError("root", { message: "" })}
              className={clsx("w-full bg-slate-100", {
                "border-gray-300 focus:border-gray-400":
                  !errors.password?.message,
                "border-red-400":
                  errors.password?.message || errors.root?.message,
              })}
            />
            {isPasswordVisible ? (
              <HidePassword
                className="absolute right-2 top-2 size-5 cursor-pointer"
                onClick={() => setIsPasswordVisible(false)}
              />
            ) : (
              <ShowPassword
                className="absolute right-2 top-2 size-5 cursor-pointer"
                onClick={() => setIsPasswordVisible(true)}
              />
            )}
          </div>
        </label>

        <button
          disabled={
            isSubmitting ||
            !!errors.root?.message ||
            errors.password?.message !== undefined ||
            errors.email?.message !== undefined
          }
          className="mt-4 flex w-full justify-center rounded-full bg-black py-2 text-gray-100 duration-75 hover:opacity-80 disabled:opacity-50"
        >
          {isSubmitting ? (
            <ImSpinner8 className="animate-spin" size={24} />
          ) : (
            "Sign in"
          )}
        </button>
      </form>
      <div className="flex items-center gap-1">
        <span className="text-gray-500">Forgot your password? </span>
        <ResetPassword />
      </div>

      <button
        disabled={isSubmitting}
        onClick={() => setIsSigninFormVisible(false)}
        className="flex w-fit items-center rounded-full p-2 px-4 duration-75 hover:bg-gray-100"
      >
        <ArrowIcon className="mr-2 size-8" />
        All sign in options
      </button>
    </main>
  );
};

export default EmailSigninForm;
