import { Button } from "@/app/Components/ui/button";
import { CiMail as MailIcon } from "react-icons/ci";
import { useState, Dispatch, SetStateAction} from 'react'
import Link from "next/link";
import AuthOptions from "./AuthOptions";
import EmailSigninForm from "./EmailSigninForm";

interface signinModalPropsType {
  isNewUser:boolean
  setIsNewUser: Dispatch<SetStateAction<boolean>>
}

const SigninModal = ({isNewUser, setIsNewUser }: signinModalPropsType) => {
  const [isSigninFormVisable, setIsSigninFormVisable] = useState(false)

  if (isSigninFormVisable) {
    return <EmailSigninForm setIsSigninFormVisable={setIsSigninFormVisable}/>
  }

  return (
    <div className='flex flex-col justify-between items-center gap-10 w-full md:w-2/3 p-4'>
      <h1 className='text-4xl font-semibold'>Welcome Back!</h1>
      <main className="flex flex-col gap-4 items-center w-full text-md p-4 text-gray-700 font-semibold">
        <AuthOptions isNewUser={isNewUser}>
        <Button onClick={() => setIsSigninFormVisable(true)} variant="outline" className="w-full flex justify-center"> <MailIcon className="mr-auto" size={30} /> <span className="mr-auto">Sign in with Email</span></Button>
        </AuthOptions>
        <p className="text-gray-500 text-md">Don&#8217;t have an account?<Button onClick={() => setIsNewUser(true)} variant="link" className="px-1 text-md">Create one</Button></p>
        <p className="pt-10 text-gray-500 text-sm text-center font-normal">Click &#8220;Sign in&#8221; to agree to Post-Rooms&#8217;s <Link href="/" className="underline underline-offset-2">Terms of Service</Link>&#44; and acknowledge that Post-Room&#8217;s <Link href="/" className="underline underline-offset-2">Privacy Policy</Link>&#44; applies to you.</p>
      </main>
    </div>
  )
}

export default SigninModal