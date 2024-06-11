import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Input } from "../../../ui/input"
import { Button } from "../../../ui/button"
import { IoIosArrowRoundBack as ArrowIcon } from "react-icons/io"
import { useForm } from "react-hook-form"
import clsx from "clsx"
import { ImSpinner8 } from "react-icons/im"
import { CgDanger } from "react-icons/cg"
import axios from "axios"
import AuthInputField from "@/app/Components/ui/AuthInputField"

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

  const form = useForm<{ email: string }>({ defaultValues: { email: "" } })
  const {
    handleSubmit,
    getValues,
    setFocus,
    setError,
    formState,
    formState: { isSubmitting, errors, isDirty },
  } = form

  async function handleSignup(data: { email: string }) {
    try {
      const res = await axios.post("http://localhost:3000/api/register", { data })

      if (res.status === 200) {
        setUserEmail(getValues("email"))
        setIsSignupFormVisable(false)
        setIsVerifyMessageVisable(true)
      }

    } catch (err: any) {
      setError("root", err.message)
    }
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
        <AuthInputField type="email" form={form} isInputTextCentered={true} />
        <Button
          disabled={!formState.dirtyFields.email || errors.email?.message !== undefined || isSubmitting}
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
