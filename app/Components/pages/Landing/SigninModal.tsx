"use client";

import { CiMail as MailIcon } from "react-icons/ci";
import { useState, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import EmailSigninForm from "./EmailSigninForm";
import OAuthBtn from "./OAuthBtn";
import { oAuthBtns } from "@/constants/OAuthBtns";

interface signinModalPropsType {
  isNewUser: boolean;
  setIsNewUser: Dispatch<SetStateAction<boolean>>;
}

const SigninModal = ({ isNewUser, setIsNewUser }: signinModalPropsType) => {
  const [isSigninFormVisable, setIsSigninFormVisable] = useState(false);

  if (isSigninFormVisable) {
    return <EmailSigninForm setIsSigninFormVisable={setIsSigninFormVisable} />;
  }

  return (
    <div className="flex w-full flex-col items-center justify-between p-4 md:w-2/3">
      <h1 className="mb-10 text-4xl font-semibold text-gray-900">
        Welcome back.
      </h1>
      <main className="text-md flex w-full flex-col items-center p-4 font-semibold text-gray-700">
        <section className="flex w-full flex-col items-center gap-3">
          {oAuthBtns.map((oAuthBtn) => (
            <OAuthBtn
              key={oAuthBtn.id}
              name={oAuthBtn.name}
              Icon={oAuthBtn.icon}
              href={oAuthBtn.href}
              color={oAuthBtn.color}
              isNewUser={isNewUser}
            />
          ))}
          <button
            onClick={() => setIsSigninFormVisable(true)}
            className="flex w-full items-center justify-center rounded-full border border-gray-200 bg-transparent px-4 py-2 duration-150 hover:bg-gray-100"
          >
            {" "}
            <MailIcon className="mr-auto size-8" />{" "}
            <span className="mr-auto">Sign in with Email</span>
          </button>
        </section>

        <p className="text-md mt-6 font-normal text-gray-500">
          Don&#8217;t have an account?
          <button
            onClick={() => setIsNewUser(true)}
            className="text-md px-1 text-gray-900 decoration-black underline-offset-4 hover:underline"
          >
            Create one
          </button>
        </p>
        <p className="pt-10 text-center text-sm font-normal text-gray-500">
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
  );
};

export default SigninModal;
