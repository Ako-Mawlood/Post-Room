import React, {Dispatch, SetStateAction, useEffect} from "react"
import {IoIosArrowRoundBack as ArrowIcon} from "react-icons/io"
import {useForm} from "react-hook-form"
import {ImSpinner8} from "react-icons/im"
import axios from "axios"
import {Input} from "@/app/Components/ui/input"
import clsx from "clsx"
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {CgDanger} from "react-icons/cg"

const signupSchema = z.object({
  email: z.string().min(1, "Please provide your eamil address").email("Invalid email address"),
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
    formState,
    formState: {isSubmitting, errors},
  } = useForm<formDataType>({defaultValues: {email: ""}, resolver: zodResolver(signupSchema)})

  async function handleSignup(data: formDataType) {
    try {
      const res = await axios.post("http://localhost:3000/api/register", {data})

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
        <label className="flex flex-col gap-2 items-center w-full">
          <span>Your email</span>
          {errors.email && <p className="text-red-500 text-xs font-semibold">{errors.email?.message}</p>}
          <div className="w-full relative">
            <Input
              {...register("email")}
              disabled={isSubmitting}
              autoComplete="off"
              type="text"
              className={clsx("w-full text-center bg-slate-100", {
                "border-gray-300 focus:border-gray-400": !errors.email,
                "border-red-400": errors.email,
              })}
            />
            {errors.email && <CgDanger className="size-5 absolute right-2 top-3 text-red-400" />}
          </div>
        </label>
        <button
          disabled={!formState.dirtyFields.email || errors.email?.message !== undefined || isSubmitting}
          className="flex justify-center w-3/4 mt-4 py-2 font-semibold bg-black text-gray-100 rounded-full hover:opacity-80 duration-75 cursor-pointer"
          type="submit"
        >
          {isSubmitting ? <ImSpinner8 className="animate-spin" size={24} /> : "Continue"}
        </button>
      </form>
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
