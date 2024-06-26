import React, {Dispatch, SetStateAction, useEffect} from "react"
import {IoIosArrowRoundBack as ArrowIcon} from "react-icons/io"
import {useForm} from "react-hook-form"
import {ImSpinner8} from "react-icons/im"
import axios from "@/libs/axios"
import {Input} from "@/app/Components/ui/input"
import clsx from "clsx"
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {CgDanger} from "react-icons/cg"

const signupSchema = z.object({
  email: z.string().min(1, "Please provide your email address").email("Invalid email address"),
  password: z.string().min(8, "Password should be atleast 8 characters"),
})
type formDataType = z.infer<typeof signupSchema>

interface EmailSignupFormPropsType {
  setUserEmail: Dispatch<SetStateAction<string>>
  isSignupFormVisable: boolean
  setIsSignupFormVisable: Dispatch<SetStateAction<boolean>>
  setIsVerifyMessageVisable: Dispatch<SetStateAction<boolean>>
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
    formState: {isSubmitting, errors},
  } = useForm<formDataType>({
    defaultValues: {email: "", password: ""},
    resolver: zodResolver(signupSchema),
  })

  async function handleSignup(data: formDataType) {
    await axios
      .post("/api/register", data)
      .then(() => {
        setUserEmail(getValues("email"))
        setIsSignupFormVisable(false)
        setIsVerifyMessageVisable(true)
      })
      .catch((err: any) => {
        if (err.message === "Network Error") {
          setError("root", {message: "You are probably disconnected, Please check your internet connection"})
        } else {
          setError("root", {message: err?.response?.data})
        }
      })
  }

  useEffect(() => {
    setFocus("email")
  }, [isSignupFormVisable])

  return (
    <main className="flex flex-col items-center gap-12 w-full sm:w-1/2">
      <div className="flex flex-col gap-6 text-center px-4">
        <h1 className="text-4xl">Sign up with Email</h1>
        <p>
          Enter your email address and Password to create an account, and we&#8217;ll send a magic link to
          your inbox.
        </p>
      </div>
      <form onSubmit={handleSubmit(handleSignup)} className="flex flex-col items-center gap-2 w-full px-4">
        {errors.root?.message && (
          <p className="w-full bg-red-500/15 border border-red-400 text-red-500 p-3 mb-4 text-xs font-semibold rounded-md">
            {errors.root?.message}
          </p>
        )}
        <label className="flex flex-col gap-2 item-start w-full">
          <span>Your email</span>
          {errors.email?.message && (
            <p className="text-red-500 text-xs font-semibold">{errors.email?.message}</p>
          )}
          <div className="w-full relative">
            <Input
              {...register("email")}
              disabled={isSubmitting}
              autoComplete="off"
              type="text"
              onChangeCapture={() => setError("root", {message: ""})}
              className={clsx("w-full text-start bg-slate-100", {
                "border-gray-300 focus:border-gray-400": !errors.email?.message,
                "border-red-400": errors.email?.message || errors.root?.message,
              })}
            />
            {errors.email?.message && <CgDanger className="size-5 absolute right-2 top-3 text-red-400" />}
          </div>
        </label>
        <label className="flex flex-col gap-2 items-start w-full">
          <span>Password</span>
          {errors.password?.message && (
            <p className="text-red-500 text-xs font-semibold">{errors.password?.message}</p>
          )}
          <div className="w-full relative">
            <Input
              {...register("password")}
              disabled={isSubmitting}
              type="password"
              onChangeCapture={() => setError("root", {message: ""})}
              className={clsx("w-full bg-slate-100", {
                "border-gray-300 focus:border-gray-400": !errors.password?.message,
                "border-red-400": errors.password?.message || errors.root?.message,
              })}
            />
            {errors.password?.message && <CgDanger className="size-5 absolute right-2 top-3 text-red-400" />}
          </div>
        </label>

        <button
          disabled={
            isSubmitting ||
            !!errors.root?.message ||
            errors.password?.message !== undefined ||
            errors.email?.message !== undefined
          }
          className="flex justify-center py-2 w-3/4 mt-4 bg-black disabled:opacity-50 text-gray-100 rounded-full hover:opacity-80 duration-75"
        >
          {isSubmitting ? <ImSpinner8 className="animate-spin" size={24} /> : "Sign up"}
        </button>
      </form>{" "}
      <button
        className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-full duration-150"
        disabled={isSubmitting}
        onClick={() => setIsSignupFormVisable(false)}
      >
        <ArrowIcon className="mr-2 size-8" />
        All sign in options
      </button>
    </main>
  )
}

export default EmailSignupForm
