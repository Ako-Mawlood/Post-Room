"use client";

import { FormEvent, useState } from "react";
import AuthForm from "./AuthForm";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

interface authProps {
  isLoginPage: boolean;
}

const AuthField = ({ isLoginPage }: authProps) => {
  const [error, setError] = useState();

  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    await axios
      .post("/api/register", {
        email: formData.get("email"),
        password: formData.get("password"),
      })
      .then(() => router.push("/"))
      .catch((error) => setError(error.response.data));
  }

  return (
    <>
      <Link
        className="absolute text-primary font-semibold top-8 right-4 hover:bg-[#ddddef] transition duration-100 rounded-md py-2 px-2"
        href={isLoginPage ? "/sign-up" : "/login"}
      >
        {isLoginPage ? "Create new account" : "Login to your account"}
      </Link>
      <section className="w-full p-4 sm:w-3/4 text-secondery flex flex-col items-center">
        <h1 className="text-2xl font-bold text-[#09090b]">
          {isLoginPage ? "Login to your account" : "Create new account"}
        </h1>
        <p className="text-sm font-semibold my-5 text-gray-400">
          {isLoginPage
            ? "Enter your Email and password below to login"
            : "Enter your Email below to create new account"}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col w-full justify-between">
          <AuthForm isLoginPage={isLoginPage} />
        </form>
        {error && (
          <p className="text-red-500 bg-red-500/20 p-2 rounded-lg font-medium mt-2">
            {error}
          </p>
        )}
        <p className="text-center mt-4">
          By continuing, you will agree to our{" "}
          <span className="underline">Terms of services</span> and{" "}
          <span className="underline"> Privacy Policy</span>
        </p>
      </section>
    </>
  );
};

export default AuthField;
