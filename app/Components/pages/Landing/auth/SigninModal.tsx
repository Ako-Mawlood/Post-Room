"use clinet"

import { FcGoogle as GoogleLogo} from "react-icons/fc";
import { FaApple as AppleLogo } from "react-icons/fa6";
import { IoLogoFacebook as FacebookLogo} from "react-icons/io";
import { FaSquareXTwitter as TwitterLogo } from "react-icons/fa6";
import { Button } from "@/app/Components/ui/button";
import { CiMail as MailIcon } from "react-icons/ci";
import { IoIosArrowRoundBack as ArrowIcon} from "react-icons/io";
import { useState, Dispatch, SetStateAction} from 'react'
import Link from "next/link";
import { Input } from "@/app/Components/ui/input";


interface signinModalPropsType {
  setIsNewUser: Dispatch<SetStateAction<boolean>>
}

const SigninModal = ({ setIsNewUser }: signinModalPropsType) => {
  const [isSigninFormVisable, setIsSigninFormVisable] = useState(false)

  if (isSigninFormVisable) {
    return (
      <main className="flex flex-col items-center gap-12 w-full sm:w-1/2">
        <div className="flex flex-col gap-6 text-center x-4">
          <h1 className="text-4xl">Sign in with Email</h1>
          <p >Enter your Email and Password below to sign in</p>
        </div>
        <form className="flex flex-col items-center gap-2 w-full px-4">
          <label className="flex flex-col items-start gap-2 w-full">
            <p>Email</p>
            <Input type="email" className="w-full bg-slate-100" />
          </label>
          <label className="flex flex-col items-start gap-2 w-full">
            <p>Password</p>
            <Input type="password" className="w-full bg-slate-100" />
          </label>
          <Button className="w-3/4 mt-4">Sign in</Button>
        </form>
        <Button onClick={() => setIsSigninFormVisable(false)} variant={"ghost"}><ArrowIcon className="mr-2 size-8" />All sign in options</Button>
      </main>
    )
  }

  return (
    <div className='flex flex-col justify-between items-center gap-10 w-full md:w-2/3 p-4'>
      <h1 className='text-4xl font-semibold'>Welcome Back!</h1>
      <main className="flex flex-col gap-4 items-center w-full text-md p-4 text-gray-700 font-semibold">
        <Button variant="outline" className="w-full flex justify-center"> <GoogleLogo className="mr-auto" size={30} /> <span className="mr-auto">Sign in with Google</span></Button>
        <Button variant="outline" className="w-full flex justify-center"> <AppleLogo className="mr-auto text-slate-900" size={30} /> <span className="mr-auto">Sign in with Apple</span></Button>
        <Button variant="outline" className="w-full flex justify-center"> <FacebookLogo className="mr-auto text-blue-500" size={30} /> <span className="mr-auto">Sign in with Facebook</span></Button>
        <Button variant="outline" className="w-full flex justify-center"> <TwitterLogo className="mr-auto text-slate-900" size={30} /> <span className="mr-auto">Sign in with X</span></Button>
        <Button onClick={() => setIsSigninFormVisable(true)} variant="outline" className="w-full flex justify-center"> <MailIcon className="mr-auto" size={30} /> <span className="mr-auto">Sign in with Email</span></Button>
        <p className="text-gray-500 text-md">Don&#8217;t have an account?<Button onClick={() => setIsNewUser(true)} variant="link" className="px-1 text-md">Sign up</Button></p>
        <p className="pt-10 text-gray-500 text-sm text-center font-normal">Click &#8220;Sign in&#8221; to agree to Post-Rooms&#8217;s <Link href="/" className="underline underline-offset-2">Terms of Service</Link>&#44; and acknowledge that Post-Room&#8217;s <Link href="/" className="underline underline-offset-2">Privacy Policy</Link>&#44; applies to you.</p>
      </main>
    </div>
  )
}

export default SigninModal