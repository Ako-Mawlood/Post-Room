import { Button } from "@/app/Components/ui/button"
import { Dispatch, SetStateAction } from "react"
import { IoIosArrowRoundBack as ArrowIcon } from "react-icons/io"
import { useForm } from "react-hook-form"
import { ImSpinner8 } from "react-icons/im"
import axios from "axios"
import AuthInputField from "@/app/Components/ui/AuthInputField"

interface emailSigninFormPropsType {
  setIsSigninFormVisable: Dispatch<SetStateAction<boolean>>
}

interface formDataType {
  email: string
  password?: string
}
const EmailSigninForm = ({ setIsSigninFormVisable }: emailSigninFormPropsType) => {
  const form = useForm<formDataType>({ defaultValues: { email: "", password: "" } })
  const {
    handleSubmit,
    setError,
    formState,
    formState: { errors, isSubmitting },
  } = form

  function handleSignin(data: formDataType) {
    try {
      axios.post("http://localhost:3000/api/login", { data })
        .then(res => {
          console.log(res)
        })
    } catch (err: any) {
      setError("root", err.message)
    }
  }
  console.log(errors.password?.type)
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
        <AuthInputField type="email" form={form} isInputTextCentered={false} />
        <AuthInputField type="password" form={form} isInputTextCentered={false} />

        <Button
          disabled={!formState.dirtyFields.email || !formState.dirtyFields.password || isSubmitting || errors.password?.message !== undefined || errors.email?.message !== undefined}
          className="w-3/4 mt-4">
          {isSubmitting ? <ImSpinner8 className="animate-spin" size={25} /> : "Sign in"}
        </Button>
      </form>

      <Button disabled={isSubmitting} onClick={() => setIsSigninFormVisable(false)} variant={"ghost"}>
        <ArrowIcon className="mr-2 size-8" />
        All sign in options
      </Button>
    </main>
  )
}

export default EmailSigninForm