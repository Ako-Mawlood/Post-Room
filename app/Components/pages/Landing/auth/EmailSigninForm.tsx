import {Button} from "@/app/Components/ui/button"
import {Dispatch, SetStateAction, useEffect} from "react"
import {IoIosArrowRoundBack as ArrowIcon} from "react-icons/io"
import {useForm} from "react-hook-form"
import {ImSpinner8} from "react-icons/im"
import axios from "axios"
import {CgDanger} from "react-icons/cg"
import clsx from "clsx"
import {Input} from "@/app/Components/ui/input"
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

const signinSchema = z.object({
  email: z.string().min(1, "Please provide your eamil address").email("Invalid email address"),
  password: z.string().min(8, "Password should be at least 8 charecters"),
})
type formDataType = z.infer<typeof signinSchema>

interface emailSigninFormPropsType {
  setIsSigninFormVisable: Dispatch<SetStateAction<boolean>>
}

const EmailSigninForm = ({setIsSigninFormVisable}: emailSigninFormPropsType) => {
  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    formState: {isSubmitting, errors},
  } = useForm<formDataType>({defaultValues: {email: "", password: ""}, resolver: zodResolver(signinSchema)})

  function handleSignin(data: formDataType) {
    try {
      axios.post("http://localhost:3000/api/login", {data}).then((res) => {
        console.log(res)
      })
    } catch (err: any) {
      setError("root", err.message)
    }
  }
  useEffect(() => {
    setFocus("email")
  }, [])
  return (
    <main className="flex flex-col items-center gap-12 w-full sm:w-1/2">
      <div className="flex flex-col gap-6 text-center x-4">
        <h1 className="text-4xl">Sign in with Email</h1>
        <p>Enter your Email and Password below to sign in</p>
      </div>

      <form onSubmit={handleSubmit(handleSignin)} className="flex flex-col items-center gap-2 w-full px-4">
        {errors.root?.message && (
          <p className="w-full bg-red-500/15 border border-red-500 text-red-500 p-2 text-sm font-semibold">
            {errors.root.message}
          </p>
        )}
        <label className="flex flex-col gap-2 item-start w-full">
          <span>Your email</span>
          {errors.email && <p className="text-red-500 text-xs font-semibold">{errors.email?.message}</p>}
          <div className="w-full relative">
            <Input
              {...register("email")}
              disabled={isSubmitting}
              autoComplete="off"
              type="text"
              className={clsx("w-full text-start bg-slate-100", {
                "border-gray-300 focus:border-gray-400": !errors.email,
                "border-red-400": errors.email,
              })}
            />
            {errors.email && <CgDanger className="size-5 absolute right-2 top-3 text-red-400" />}
          </div>
        </label>
        <label className="flex flex-col gap-2 items-start w-full">
          <span>Password</span>
          {errors.password && (
            <p className="text-red-500 text-xs font-semibold">{errors.password?.message}</p>
          )}
          <div className="w-full relative">
            <Input
              {...register("password")}
              disabled={isSubmitting}
              type="password"
              className={clsx("w-full bg-slate-100", {
                "border-gray-300 focus:border-gray-400": !errors.password,
                "border-red-400": errors.password,
              })}
            />
            {errors.password && <CgDanger className="size-5 absolute right-2 top-3 text-red-400" />}
          </div>
        </label>

        <Button
          disabled={
            isSubmitting || errors.password?.message !== undefined || errors.email?.message !== undefined
          }
          className="w-3/4 mt-4"
        >
          {isSubmitting ? <ImSpinner8 className="animate-spin" size={25} /> : "Sign in"}
        </Button>
      </form>

      <Button disabled={isSubmitting} onClick={() => setIsSigninFormVisable(false)} variant={"ghost"}>
        <ArrowIcon className="size-8 mr-2" />
        All sign in options
      </Button>
    </main>
  )
}

export default EmailSigninForm
