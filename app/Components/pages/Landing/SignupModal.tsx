import Link from "next/link";
import { CiMail as MailIcon } from "react-icons/ci";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import EmailSignupForm from "./EmailSignupForm";
import GoogleOAuthBtn from "./GoogleOAuthBtn";

interface signupModalPropsType {
  isNewUser: boolean;
  setIsNewUser: Dispatch<SetStateAction<boolean>>;
  handleCloseAuthModal: () => void;
}
const SignupModal = ({
  isNewUser,
  setIsNewUser,
  handleCloseAuthModal,
}: signupModalPropsType) => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignupFormVisable, setIsSignupFormVisable] = useState(false);
  const [isVerifyMessageVisable, setIsVerifyMessageVisable] = useState(false);

  if (isSignupFormVisable) {
    return (
      <EmailSignupForm
        setUserEmail={setUserEmail}
        isSignupFormVisable={isSignupFormVisable}
        setIsSignupFormVisable={setIsSignupFormVisable}
        setIsVerifyMessageVisable={setIsVerifyMessageVisable}
      />
    );
  }

  if (isVerifyMessageVisable) {
    return (
      <main className="flex w-full flex-col items-center gap-12 text-gray-900 sm:w-1/2">
        <div className="flex flex-col gap-6 px-4 text-center">
          <h1 className="text-4xl">Check your inbox.</h1>
          <p>{`Click the link we sent to ${userEmail} to complete your account set-up.`}</p>
        </div>
        <button
          className="rounded-full bg-black px-4 py-2 text-gray-100 hover:opacity-80"
          onClick={handleCloseAuthModal}
        >
          Ok
        </button>
      </main>
    );
  }

  return (
    <main className="flex w-full flex-col items-center justify-between p-4 md:w-2/3">
      <h1 className="mb-10 text-4xl font-semibold text-gray-900">
        Join Post-Room.
      </h1>
      <main className="text-md flex w-full flex-col items-center p-4 font-semibold text-gray-700">
        <section className="flex w-full flex-col items-center gap-3">
          <GoogleOAuthBtn isNewUser={isNewUser} />
          <button
            onClick={() => setIsSignupFormVisable(true)}
            className="flex w-full items-center justify-center rounded-full border border-gray-200 bg-transparent px-4 py-2 duration-150 hover:bg-gray-100"
          >
            <MailIcon className="mr-auto" size={30} />{" "}
            <span className="mr-auto">Sign up with Email</span>
          </button>
        </section>
        <span className="text-md mt-6 font-normal text-gray-500">
          Aready have an account?
          <button
            onClick={() => setIsNewUser(false)}
            className="text-md px-1 text-gray-900 decoration-black underline-offset-4 hover:underline"
          >
            Sign in
          </button>
        </span>
        <p className="pt-10 text-center text-sm font-normal text-gray-500">
          Click &#8220;Sign up&#8221; to agree to Post-Rooms&#8217;s
          <Link href="/" className="underline underline-offset-2">
            {" "}
            Terms of Service
          </Link>
          &#44; and acknowledge that Post-Room&#8217;s
          <Link href="/" className="underline underline-offset-2">
            {" "}
            Privacy Policy
          </Link>
          &#44; applies to you.
        </p>
      </main>
    </main>
  );
};

export default SignupModal;
