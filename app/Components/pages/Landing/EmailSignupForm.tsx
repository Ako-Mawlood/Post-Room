import React, { Dispatch, SetStateAction, useEffect } from "react";
import { IoIosArrowRoundBack as ArrowIcon } from "react-icons/io";
import { useForm } from "react-hook-form";
import { ImSpinner8 } from "react-icons/im";
import axios from "@/libs/axiosInstance";
import { Input } from "@/app/components/ui/input";
import clsx from "clsx";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CgDanger } from "react-icons/cg";
import { setCookie } from "cookies-next";

const signupSchema = z.object({
  email: z
    .string()
    .min(1, "Please provide your email address")
    .email("Invalid email address"),
  password: z.string().min(8, "Password should be atleast 8 characters"),
});
type formDataType = z.infer<typeof signupSchema>;

interface EmailSignupFormPropsType {
  setUserEmail: Dispatch<SetStateAction<string>>;
  isSignupFormVisable: boolean;
  setIsSignupFormVisable: Dispatch<SetStateAction<boolean>>;
  setIsVerifyMessageVisable: Dispatch<SetStateAction<boolean>>;
}

const EmailSignupForm = ({
  setUserEmail,
  isSignupFormVisable,
  setIsSignupFormVisable,
  setIsVerifyMessageVisable,
}: EmailSignupFormPropsType) => {
  const {
    handleSubmit,
    getValues,
    register,
    setFocus,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<formDataType>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signupSchema),
  });

  async function handleSignup(data: formDataType) {
    await axios
      .post("/api/register", data)
      .then((res) => {
        setUserEmail(getValues("email"));
        setIsSignupFormVisable(false);
        setIsVerifyMessageVisable(true);
        setCookie("token", res.headers.authorization);
      })
      .catch((err: any) => {
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
  }, [isSignupFormVisable, setFocus]);
  return (
    <main className="flex w-full flex-col items-center gap-12 text-gray-900 sm:w-3/5">
      <div className="flex flex-col gap-6 px-4 text-center">
        <h1 className="text-4xl">Sign up with Email</h1>
        <p className="text-gray-500">
          Enter your email address and Password to create an account, and
          we&#8217;ll send a magic link to your inbox.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleSignup)}
        className="flex w-full flex-col items-center gap-2 px-4"
      >
        {errors.root?.message && (
          <p className="mb-4 w-full rounded-md border border-red-400 bg-red-500/15 p-3 text-xs font-semibold text-red-500">
            {errors.root?.message}
          </p>
        )}
        <label className="item-start flex w-full flex-col gap-2">
          <span>Your email</span>
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
            {errors.email?.message && (
              <CgDanger className="absolute right-2 top-3 size-5 text-red-400" />
            )}
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
              type="password"
              onChangeCapture={() => setError("root", { message: "" })}
              className={clsx("w-full bg-slate-100", {
                "border-gray-300 focus:border-gray-400":
                  !errors.password?.message,
                "border-red-400":
                  errors.password?.message || errors.root?.message,
              })}
            />
            {errors.password?.message && (
              <CgDanger className="absolute right-2 top-3 size-5 text-red-400" />
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
          className="mt-4 flex w-3/4 justify-center rounded-full bg-black py-2 text-gray-100 duration-75 hover:opacity-80 disabled:opacity-50"
        >
          {isSubmitting ? (
            <ImSpinner8 className="animate-spin" size={24} />
          ) : (
            "Sign up"
          )}
        </button>
      </form>{" "}
      <button
        className="flex items-center rounded-full px-4 py-2 duration-150 hover:bg-gray-100"
        disabled={isSubmitting}
        onClick={() => setIsSignupFormVisable(false)}
      >
        <ArrowIcon className="mr-2 size-8" />
        All sign up options
      </button>
    </main>
  );
};

export default EmailSignupForm;
