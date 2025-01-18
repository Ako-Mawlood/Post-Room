"use client";

import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import axios from "../../../../libs/axiosInstance";
import { useRouter } from "next/navigation";
import { ImSpinner8 as Spinner } from "react-icons/im";
import clsx from "clsx";
import { Skeleton } from "../../ui/skeleton";
import { currentUserType } from "@/app/types/currentUserType";
import { getCookie } from "cookies-next";
import { usernameValidation } from "@/libs/validations";

const usernameSchema = z.object({
  username: usernameValidation,
});

type usernameType = z.infer<typeof usernameSchema>;

const UsernameSetup = ({ currentUser }: { currentUser: currentUserType }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: { username: "" },
    resolver: zodResolver(usernameSchema),
  });

  async function handeSetupUsername(data: usernameType) {
    await axios
      .put("/api/user", data, {
        headers: { Authorization: getCookie("token") },
      })
      .then((_res) => {
        router.push("/account-setup?setupStep=category");
      })
      .catch((err: any) => {
        if (err.message === "Network Error") {
          setError("root", {
            message:
              "You probably disconnected, Please check your internet connection",
          });
        } else {
          setError("root", { message: err.response.data });
        }
      });
  }
  useEffect(() => {
    setFocus("username");
  }, [setFocus]);
  return (
    <form
      onSubmit={handleSubmit(handeSetupUsername)}
      className="flex w-full flex-col items-center justify-center gap-4 p-6 text-center sm:w-[30rem]"
    >
      <h1 className="font-PT text-4xl text-primary">Almost there!</h1>
      <p className="text-lg">Let&apos;s create a username for your account.</p>
      {errors.root && (
        <span className="w-full border border-red-400 bg-red-500/15 p-2 text-sm font-semibold text-red-500">
          {errors?.root?.message}
        </span>
      )}
      <label className="mt-4 flex w-full flex-col">
        <span className="text-gray-600 dark:text-gray-200">Username</span>
        {errors.username && (
          <span className="text-start text-xs text-red-500">
            {errors?.username?.message}
          </span>
        )}
        <input
          {...register("username")}
          className={clsx(
            "border-b bg-transparent p-2 text-center outline-none duration-100",
            {
              "border-red-600 focus:border-red-500": errors?.username,
              "border-border focus:border-primary": !errors?.username,
            },
          )}
          autoComplete="off"
        />
      </label>
      <span className="text-gray-600 dark:text-gray-200">Your email</span>
      {currentUser.email ? (
        <span>{currentUser.email}</span>
      ) : (
        <Skeleton className="h-6 w-52 rounded-full" />
      )}
      <Button className="w-24">
        {isSubmitting ? (
          <Spinner className="size-5 animate-spin" />
        ) : (
          "Continue"
        )}
      </Button>
    </form>
  );
};

export default UsernameSetup;
