import {CiMail as MailIcon} from "react-icons/ci"
import {useState, Dispatch, SetStateAction} from "react"
import Link from "next/link"
import AuthOptions from "./AuthOptions"
import EmailSigninForm from "./EmailSigninForm"
import GoogleOAuth from "./GoogleOAuth"

interface signinModalPropsType {
  isNewUser: boolean
  setIsNewUser: Dispatch<SetStateAction<boolean>>
}

const SigninModal = ({isNewUser, setIsNewUser}: signinModalPropsType) => {
  const [isSigninFormVisable, setIsSigninFormVisable] = useState(false)

  if (isSigninFormVisable) {
    return <EmailSigninForm setIsSigninFormVisable={setIsSigninFormVisable} />
  }

  return (
    <div className="flex flex-col justify-between items-center w-full md:w-2/3 p-4">
      <h1 className="text-4xl font-semibold">Welcome back.</h1>
      <main className="flex flex-col items-center w-full text-md p-4 text-gray-700 font-semibold">
        <section className="flex flex-col gap-3 w-full">
          <GoogleOAuth />
          <button
            onClick={() => setIsSigninFormVisable(true)}
            className="flex justify-center w-full px-4 py-2 rounded-full bg-transparent border border-gray-200 hover:bg-gray-100 duration-150"
          >
            {" "}
            <MailIcon className="mr-auto" size={30} /> <span className="mr-auto">Sign in with Email</span>
          </button>
        </section>

        <p className="text-gray-500 text-md">
          Don&#8217;t have an account?
          <button
            onClick={() => setIsNewUser(true)}
            className="px-1 text-gray-900 hover:underline underline-offset-4 decoration-black text-md"
          >
            Create one
          </button>
        </p>
        <p className="pt-10 text-gray-500 text-sm text-center font-normal">
          Click &#8220;Sign in&#8221; to agree to Post-Rooms&#8217;s{" "}
          <Link href="/" className="underline underline-offset-2">
            Terms of Service
          </Link>
          &#44; and acknowledge that Post-Room&#8217;s{" "}
          <Link href="/" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          &#44; applies to you.
        </p>
      </main>
    </div>
  )
}

export default SigninModal
