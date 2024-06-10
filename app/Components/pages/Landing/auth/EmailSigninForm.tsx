import {Input} from "@/app/Components/ui/input"
import {Button} from "@/app/Components/ui/button"
import {Dispatch, SetStateAction} from "react"
import {IoIosArrowRoundBack as ArrowIcon} from "react-icons/io"
import {useForm} from "react-hook-form"
import {ImSpinner8} from "react-icons/im"
import {CgDanger} from "react-icons/cg"
import clsx from "clsx"

interface emailSigninFormPropsType {
  setIsSigninFormVisable: Dispatch<SetStateAction<boolean>>
}

interface signinFormDataType {
  email: string
  password: string
}
const EmailSigninForm = ({setIsSigninFormVisable}: emailSigninFormPropsType) => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<signinFormDataType>({
    defaultValues: {email: "", password: ""},
  })
  const emailRegisteration = register("email", {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email address",
    },
  })
  const passwordRegisteration = register("password", {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password should be at least 8 characters",
    },
  })
  function handleSignin(data: signinFormDataType) {
    console.log(data)
  }
  return (
    <main className="flex flex-col items-center gap-12 w-full sm:w-1/2">
      <div className="flex flex-col gap-6 text-center x-4">
        <h1 className="text-4xl">Sign in with Email</h1>
        <p>Enter your Email and Password below to sign in</p>
      </div>
      <form
        onSubmit={handleSubmit(handleSignin)}
        className="flex flex-col items-center gap-2 w-full px-4">
        {errors.root?.message && (
          <p className="w-full bg-red-500/15 border border-red-500 text-red-500 p-2 text-sm font-semibold">
            {errors.root.message}
          </p>
        )}

        <label className="flex flex-col items-start gap-2 w-full">
          <span>Email</span>
          {errors.email?.message && (
            <p className="text-red-500 text-xs font-semibold">{errors.email.message}</p>
          )}
          <div className="w-full relative">
            <Input
              {...emailRegisteration}
              disabled={isSubmitting}
              type="text"
              className={clsx("w-full bg-slate-100", {
                "border-gray-300 focus:border-gray-400": !errors.email?.message,
                "border-red-400": errors.email?.message,
              })}
            />
            {errors.email?.message && (
              <CgDanger className="size-5 absolute right-2 top-3 text-red-400" />
            )}
          </div>
        </label>
        <label className="flex flex-col items-start gap-2 w-full">
          <span>Password</span>
          {errors.password?.message && (
            <p className="text-red-500 text-xs font-semibold">{errors.password.message}</p>
          )}
          <div className="w-full relative">
            <Input
              {...passwordRegisteration}
              disabled={isSubmitting}
              type="password"
              className={clsx("w-full bg-slate-100", {
                "border-gray-300 focus:border-gray-400": !errors.email?.message,
                "border-red-400": errors.email?.message,
              })}
            />
            {errors.password?.message && (
              <CgDanger className="size-5 absolute right-2 top-3 text-red-400" />
            )}
          </div>
        </label>
        <Button
          disabled={
            isSubmitting ||
            errors.email?.message !== undefined ||
            errors.email?.message !== undefined
          }
          className="w-3/4 mt-4">
          {isSubmitting ? <ImSpinner8 className="animate-spin" size={25} /> : "Sign in"}
        </Button>
      </form>
      <Button
        disabled={isSubmitting}
        onClick={() => setIsSigninFormVisable(false)}
        variant={"ghost"}>
        <ArrowIcon className="mr-2 size-8" />
        All sign in options
      </Button>
    </main>
  )
}

export default EmailSigninForm
