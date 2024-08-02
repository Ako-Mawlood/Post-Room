"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/app/components/ui/form";
import { CgEricsson as Logo } from "react-icons/cg";

import z from "zod";
import { passwordValidation } from "@/libs/validations";
import axiosInstance from "@/libs/axiosInstance";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/app/components/ui/button";
type resetFormValidation = z.infer<typeof passwordValidation>;
const page = ({ params }: { params: { resetToken: string } }) => {
  const token = params.resetToken;
  const [isPasswordReseted, setIsPasswordReseted] = useState(false);
  console.log(isPasswordReseted);

  const resetInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<resetFormValidation>({
    defaultValues: { password: "" },
    resolver: zodResolver(passwordValidation),
  });
  function handleRestPassword(data: resetFormValidation) {
    axiosInstance
      .post(`/api/user/reset-password/${token}`, data, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setIsPasswordReseted(true);
      });
  }
  useEffect(() => {
    if (resetInputRef.current) {
      resetInputRef.current.focus();
    }
  });
  if (isPasswordReseted) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
        <h1 className="font-PT text-5xl">Password reseted</h1>
        <p className="w-96 text-center text-muted-foreground">
          Your password has succesfully reseted, now you can use your new
          password and close this tab.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-10">
      <div className="text-md flex items-center font-PT font-bold text-primary sm:text-2xl">
        <Logo size={25} />
        <h1>Post-Room</h1>
      </div>
      <div className="flex w-1/3 justify-center bg-card">
        <Form {...form}>
          <form
            className="flex flex-col items-center justify-center gap-14 p-6 text-center sm:w-[30rem]"
            onSubmit={form.handleSubmit(handleRestPassword)}
          >
            <div className="flex flex-col gap-4">
              {" "}
              <h1 className="font-PT text-4xl text-primary">
                Reseting your password
              </h1>
              <p className="text-lg text-muted-foreground">
                {" "}
                Enter a new password that's both secure and easy to remember.
              </p>
            </div>

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>New password</FormLabel>
                  <FormMessage />
                  <FormControl ref={resetInputRef}>
                    <input
                      {...field}
                      className="border-b bg-transparent p-2 text-center outline-none duration-100"
                      autoComplete="off"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-40" type="submit">
              {form.formState.isSubmitting ? (
                <Logo className="animate-spin" />
              ) : (
                <span>Reset</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default page;
