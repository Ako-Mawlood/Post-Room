"use clinet"

import Link from "next/link"
import { FcGoogle as GoogleLogo} from "react-icons/fc";
import { FaApple as AppleLogo } from "react-icons/fa6";
import { IoLogoFacebook as FacebookLogo} from "react-icons/io";
import { FaSquareXTwitter as TwitterLogo } from "react-icons/fa6";
import { CiMail as MailIcon } from "react-icons/ci";
import { IoIosArrowRoundBack as ArrowIcon} from "react-icons/io";
import { Button } from "@/app/Components/ui/button";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Input } from "@/app/Components/ui/input";

interface signupModalPropsType {
  handleCloseAuthModal:()=>void
  setIsNewUser: Dispatch<SetStateAction<boolean>>
}
const SignupModal = ({ setIsNewUser, handleCloseAuthModal }: signupModalPropsType) => {
  const [isSignupFormVisable, setIsSignupFormVisable] = useState(false)
  const [isUserSubmitedEmail,setIsUserSubmitedEmail] = useState(false)
  const emailInputRef = useRef<HTMLInputElement|null>(null)
  
  useEffect(()=>{
     emailInputRef.current?.focus()
  },[isSignupFormVisable])

  if (isSignupFormVisable) {
    return (
      <main className="flex flex-col items-center gap-12 w-full sm:w-1/2">
        <div className="flex flex-col gap-6 text-center px-4">
          <h1 className="text-4xl">Sign up with Email</h1>
          <p>Enter your email address to create an account, and we&#8217;ll send a magic link to your inbox.</p>
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className="flex flex-col items-center gap-2 w-full px-4">
          <label className="flex flex-col items-center gap-2 w-full">
            <p>Your email</p>
            <Input ref={emailInputRef} type="email" className="w-full bg-slate-100" />
          </label>
          <Button onClick={()=>{setIsSignupFormVisable(false);setIsUserSubmitedEmail(true)}} className="w-3/4 mt-4">Coninue</Button>
        </form>
        <Button onClick={() => setIsSignupFormVisable(false)} variant={"ghost"}><ArrowIcon className="mr-2 size-8" />All sign in options</Button>
      </main>
      )
  }
  
  if(isUserSubmitedEmail){
    return(
      <main className="flex flex-col items-center gap-12 w-full sm:w-1/2">
      <div className="flex flex-col gap-6 text-center px-4">
        <h1 className="text-4xl">Check your inbox.</h1>
        <p>Click the link we sent to ako.mawlood@gmail.com to complete your account set-up.</p>
      </div>
        <Button onClick={handleCloseAuthModal}>Ok</Button>
    </main>

    )
  }

  return (
    <div className='flex flex-col justify-between items-center w-full md:w-2/3 gap-10 p-4'>
      <h1 className=" text-4xl font-semibold ">Join Post-Room</h1>
      <section className="flex flex-col gap-4 items-center w-full text-md p-4 text-gray-700 font-semibold">
        <Button variant="outline" className="w-full flex justify-center"> <GoogleLogo className="mr-auto" size={30} /> <span className="mr-auto">Sign up with Google</span></Button>
        <Button variant="outline" className="w-full flex justify-center"> <AppleLogo className="mr-auto text-slate-900" size={30} /> <span className="mr-auto">Sign up with Apple</span></Button>
        <Button variant="outline" className="w-full flex justify-center"> <FacebookLogo className="mr-auto text-blue-500" size={30} /> <span className="mr-auto">Sign up with Facebook</span></Button>
        <Button variant="outline" className="w-full flex justify-center"> <TwitterLogo className="mr-auto text-slate-900" size={30} /> <span className="mr-auto">Sign up with X</span></Button>
        <Button onClick={() => setIsSignupFormVisable(true)} variant="outline" className="w-full flex justify-center"> <MailIcon className="mr-auto" size={30} /> <span className="mr-auto">Sign up with Email</span></Button>
        <p className="text-gray-500 text-md">Aready have an account?<Button onClick={() => setIsNewUser(false)} variant="link" className="px-1 text-md">Sign in</Button></p>
        <p className="pt-10 text-gray-500 text-sm text-center font-normal">Click &#8220;Sign up&#8221; to agree to Post-Rooms&#8217;s <Link href="/" className="underline underline-offset-2 decoration-black">Terms of Service</Link>&#44; and acknowledge that Post-Room&#8217;s <Link href="/" className="underline underline-offset-2 decoration-black">Privacy Policy</Link>&#44; applies to you.</p>
      </section>
    </div>
  )
}

export default SignupModal