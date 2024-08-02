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
import { ImSpinner8 as Spinner } from "react-icons/im";
import z from "zod";
import { passwordValidation } from "@/libs/validations";
import axiosInstance from "@/libs/axiosInstance";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { LuEye as ShowPassword, LuEyeOff as HidePassord } from "react-icons/lu";
import clsx from "clsx";
type ResetFormValidation = z.infer<typeof passwordValidation>;

const Page = ({ params }: { params: { resetToken: string } }) => {
  const token = params.resetToken;
  const [isPasswordReseted, setIsPasswordReseted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isPasswordVisable, setIsPasswordVisable] = useState(false);
  const resetInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<ResetFormValidation>({
    defaultValues: { password: "" },
    resolver: zodResolver(passwordValidation),
  });

  const handleResetPassword = async (data: ResetFormValidation) => {
    setIsPending(true);
    try {
      await axiosInstance.post(`/api/user/reset-password/${token}`, data, {
        headers: { Authorization: token },
      });
      setIsPasswordReseted(true);
    } catch (error) {
      console.error("Failed to reset password", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (resetInputRef.current) {
      resetInputRef.current.focus();
    }
  }, []);

  if (isPasswordReseted) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
        <h1 className="font-PT text-5xl">Password Reseted</h1>
        <p className="w-96 text-center text-muted-foreground">
          Your password has been successfully reset. You can now use your new
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
      <div className="mx-2 flex w-full justify-center bg-card md:w-1/2 lg:w-1/3">
        <Form {...form}>
          <form
            className="flex flex-col items-center justify-center gap-14 p-6 text-center sm:w-[30rem]"
            onSubmit={form.handleSubmit(handleResetPassword)}
          >
            <div className="flex flex-col gap-4">
              <h1 className="font-PT text-4xl text-primary">
                Reset Your Password
              </h1>
              <p className="text-lg text-muted-foreground">
                Enter a new password that's both secure and easy to remember.
              </p>
            </div>

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>New Password</FormLabel>
                  <FormMessage />
                  <FormControl ref={resetInputRef}>
                    <div className="relative">
                      <input
                        {...field}
                        type={isPasswordVisable ? "text" : "password"}
                        className={clsx(
                          "w-full border-b bg-transparent p-2 text-center outline-none duration-100",
                          {
                            "border-b-destructive":
                              form.formState.errors.password,
                          },
                        )}
                        autoComplete="off"
                      />
                      {isPasswordVisable ? (
                        <HidePassord
                          className="absolute right-2 top-2 size-5 cursor-pointer"
                          onClick={() => setIsPasswordVisable(false)}
                        />
                      ) : (
                        <>
                          <ShowPassword
                            className="absolute right-2 top-2 size-5 cursor-pointer"
                            onClick={() => setIsPasswordVisable(true)}
                          />
                          <div />
                        </>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={isPending} className="w-40" type="submit">
              {isPending ? (
                <Spinner className="animate-spin" />
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

export default Page;
