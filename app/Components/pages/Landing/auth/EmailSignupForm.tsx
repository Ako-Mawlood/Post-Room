"use client"

import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { IoIosArrowRoundBack as ArrowIcon } from "react-icons/io";
import { useForm } from "react-hook-form";

interface EmailSignupFormPropsType {
  isSignupFormVisable: boolean;
  setIsSignupFormVisable: Dispatch<SetStateAction<boolean>>;
  setIsUserSubmitedEmail: Dispatch<SetStateAction<boolean>>;
}

const EmailSignupForm = ({ isSignupFormVisable, setIsSignupFormVisable, setIsUserSubmitedEmail }: EmailSignupFormPropsType) => {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit } = useForm({
    defaultValues:{
      detail:{
        name:"",
      }
    }
  });
  
  function handleEmailSubmit(data: { detail:{name:string}}) {
    console.log(data);
  }

  useEffect(() => {
    emailInputRef.current?.focus();
  }, [isSignupFormVisable]);

  return (
    <main className="flex flex-col items-center gap-12 w-full sm:w-1/2">
      <div className="flex flex-col gap-6 text-center px-4">
        <h1 className="text-4xl">Sign up with Email</h1>
        <p>Enter your email address to create an account, and we&#8217;ll send a magic link to your inbox.</p>
      </div>
      <form onSubmit={handleSubmit(handleEmailSubmit)} className="flex flex-col items-center gap-2 w-full px-4">
        <label className="flex flex-col items-center gap-2 w-full">
          <p>Your email</p>
          <Input
            {...register("detail.name")}
            ref={(e) => {
              register("detail.name").ref(e);
              emailInputRef.current = e; 
            }}
            type="email"
            className="w-full bg-slate-100"
          />
        </label>
        <Button type="submit" className="w-3/4 mt-4">Continue</Button>
      </form>
      <Button onClick={() => setIsSignupFormVisable(false)} variant={"ghost"}>
        <ArrowIcon className="mr-2 size-8" />All sign in options
      </Button>
    </main>
  );
}

export default EmailSignupForm;
