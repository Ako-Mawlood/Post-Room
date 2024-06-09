import { Input } from "@/app/Components/ui/input"
import { Button } from "@/app/Components/ui/button"
import { Dispatch, SetStateAction } from "react"
import { IoIosArrowRoundBack as ArrowIcon} from "react-icons/io";

interface emailSigninFormPropsType{
    setIsSigninFormVisable:Dispatch<SetStateAction<boolean>>
}

const EmailSigninForm = ({setIsSigninFormVisable}:emailSigninFormPropsType) => {
  return (
    <main className="flex flex-col items-center gap-12 w-full sm:w-1/2">
        <div className="flex flex-col gap-6 text-center x-4">
          <h1 className="text-4xl">Sign in with Email</h1>
          <p >Enter your Email and Password below to sign in</p>
        </div>
        <form className="flex flex-col items-center gap-2 w-full px-4">
          <label className="flex flex-col items-start gap-2 w-full">
            Email
            <Input type="email" className="w-full bg-slate-100" />
          </label>
          <label className="flex flex-col items-start gap-2 w-full">
            Password
            <Input type="password" className="w-full bg-slate-100" />
          </label>
          <Button className="w-3/4 mt-4">Sign in</Button>
        </form>
        <Button onClick={() => setIsSigninFormVisable(false)} variant={"ghost"}><ArrowIcon className="mr-2 size-8" />All sign in options</Button>
      </main>
  )
}

export default EmailSigninForm