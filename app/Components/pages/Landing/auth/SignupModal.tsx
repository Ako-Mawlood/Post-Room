"use clinet"

import Link from "next/link"
import AuthOptions from "./AuthOptions";
import { CiMail as MailIcon } from "react-icons/ci";
import { Button } from "@/app/Components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import EmailSignupForm from "./EmailSignupForm";

interface signupModalPropsType {
  handleCloseAuthModal: () => void
  isNewUser:boolean
  setIsNewUser: Dispatch<SetStateAction<boolean>>
}
const SignupModal = ({isNewUser, setIsNewUser, handleCloseAuthModal }: signupModalPropsType) => {
  const [isSignupFormVisable, setIsSignupFormVisable] = useState(false)
  const [isUserSubmitedEmail, setIsUserSubmitedEmail] = useState(false)


  if (isSignupFormVisable) {
    return <EmailSignupForm
      isSignupFormVisable={isSignupFormVisable}
      setIsSignupFormVisable={setIsSignupFormVisable}
      setIsUserSubmitedEmail={setIsUserSubmitedEmail}
    />
  }

  if (isUserSubmitedEmail) {
    return (
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
      <main className="flex flex-col gap-4 items-center w-full text-md p-4 text-gray-700 font-semibold">
        <AuthOptions isNewUser={isNewUser}>
          <Button onClick={() => setIsSignupFormVisable(true)} variant="outline" className="w-full flex justify-center"> <MailIcon className="mr-auto" size={30} /> <span className="mr-auto">Sign in with Email</span></Button>
        </AuthOptions>
        <p className="text-gray-500 text-md">Aready have an account?<Button onClick={() => setIsNewUser(false)} variant="link" className="px-1 text-md">Sign in</Button></p>
        <p className="pt-10 text-gray-500 text-sm text-center font-normal">Click &#8220;Sign up&#8221; to agree to Post-Rooms&#8217;s <Link href="/" className="underline underline-offset-2 decoration-black">Terms of Service</Link>&#44; and acknowledge that Post-Room&#8217;s <Link href="/" className="underline underline-offset-2 decoration-black">Privacy Policy</Link>&#44; applies to you.</p>
      </main>
    </div>
  )
}

export default SignupModal