"use client";

import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImSpinner8 as Spinner } from "react-icons/im";
import { getCookie } from "cookies-next";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { currentUserType } from "@/app/types/currentUserType";
import axiosInstance from "@/libs/axiosInstance";

const fullnameSchema = z.object({
  fullname: z
    .string()
    .regex(/^[A-Za-z]+(?:[ \-'][A-Za-z]+)*$/, "Invalid full name format")
    .min(2, "Fullname may not be less than 2 characters")
    .max(20, "Fullname may not be more than 20 characters"),
});

type fullnameType = z.infer<typeof fullnameSchema>;

const FullNameSetup = ({ currentUser }: { currentUser: currentUserType }) => {
  const router = useRouter();
  const form = useForm<fullnameType>({
    defaultValues: { fullname: currentUser.fullname },
    resolver: zodResolver(fullnameSchema),
  });

  async function handleSetupFullname(data: fullnameType) {
    console.log(data);

    await axiosInstance
      .put("/api/user", data, {
        headers: { Authorization: getCookie("token") },
      })
      .then(() => {
        router.push("/account-setup?setupStep=username");
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          form.setError("root", {
            message:
              "You probably disconnected. Please check your internet connection.",
          });
        } else {
          console.log(err.response.data);
          form.setError("root", err.response.data);
        }
      });
  }

  useEffect(() => {
    form.setFocus("fullname");
  }, [form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSetupFullname)}
        className="flex w-full flex-col items-center justify-center gap-4 p-6 text-center sm:w-[30rem]"
      >
        <h1 className="font-PT text-4xl text-primary">Set up your account.</h1>
        <p className="text-lg">
          Let&apos;s set up your account by creating a full name.
        </p>
        {form.formState.errors.root && (
          <span className="w-full border border-red-400 bg-red-500/15 p-2 text-sm font-semibold text-red-500">
            {form.formState.errors.root.message}
          </span>
        )}
        <FormField
          name="fullname"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Full Name</FormLabel>
              <FormMessage />
              <FormControl>
                <input
                  {...field}
                  className="border-b bg-transparent p-2 text-center outline-none duration-100"
                  autoComplete="off"
                />
              </FormControl>
              <FormDescription className="flex flex-col">
                <span className="text-primary">Your email</span>
                <span className="text-muted-foreground">
                  {currentUser.email}
                </span>
              </FormDescription>
            </FormItem>
          )}
        />

        <Button className="w-24">
          {form.formState.isSubmitting ? (
            <Spinner className="size-5 animate-spin" />
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FullNameSetup;
