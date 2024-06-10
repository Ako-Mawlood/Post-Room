import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import {Input} from "../../../ui/input"
import {Button} from "../../../ui/button"
import {IoIosArrowRoundBack as ArrowIcon} from "react-icons/io"
import {useForm} from "react-hook-form"
import clsx from "clsx"
import {ImSpinner8} from "react-icons/im"
import {CgDanger} from "react-icons/cg"

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
    register,
    handleSubmit,
    getValues,
    setFocus,
    formState: {errors, isDirty},
  } = useForm<{email: string}>({defaultValues: {email: ""}})
  const emailRegisteration = register("email", {
    required: "Please enter your email address.",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email address",
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSignup(data: {email: string}) {
    setUserEmail(getValues("email"))
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSignupFormVisable(false)
      setIsVerifyMessageVisable(true)
    }, 3000)
  }
  useEffect(() => {
    setFocus("email")
  }, [isSignupFormVisable])

  return (
    <main className="flex flex-col items-center gap-12 w-full sm:w-1/2">
      <div className="flex flex-col gap-6 text-center px-4">
        <h1 className="text-4xl">Sign up with Email</h1>
        <p>Enter your email address to create an account, and we&#8217;ll send a magic link to your inbox.</p>
      </div>
      <form onSubmit={handleSubmit(handleSignup)} className="flex flex-col items-center gap-2 w-full px-4">
        {errors.root?.message && (
          <p className="w-full text-red-500 text-sm text-center font-semibold">{errors.root?.message}</p>
        )}
        <label className="flex flex-col items-center gap-2 w-full">
          <p>Your email</p>
          <div className="w-full relative">
            <Input
              disabled={isSubmitting}
              {...emailRegisteration}
              autoComplete="off"
              className={clsx("w-full bg-slate-100 text-center", {
                "border-gray-300 focus:border-gray-400": errors.email?.message == undefined,
                "border-red-500": errors.email?.message !== undefined,
              })}
            />
            {errors.email?.message && <CgDanger className="size-5 absolute right-2 top-3 text-red-400" />}
          </div>
          {errors.email?.message && (
            <p className="w-full text-red-500 text-sm text-center font-semibold">{errors.email?.message}</p>
          )}
        </label>
        <Button
          disabled={!isDirty || errors.email?.message !== undefined || isSubmitting}
          className="w-3/4 mt-4"
          type="submit">
          {isSubmitting ? <ImSpinner8 className="animate-spin" size={25} /> : "Continue"}
        </Button>
      </form>
      <Button disabled={isSubmitting} onClick={() => setIsSignupFormVisable(false)} variant={"ghost"}>
        <ArrowIcon className="mr-2 size-8" />
        All sign in options
      </Button>
    </main>
  )
}

export default EmailSignupForm
