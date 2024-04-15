import AuthForm from "./AuthForm";
import Link from "next/link";

interface authProps {
  isLoginPage: boolean;
}

const AuthField = ({isLoginPage}: authProps) => {

  return (
    <>
      <Link
        className="absolute text-primary font-semibold top-8 right-4 hover:bg-[#ddddef] transition duration-100 rounded-md py-2 px-2"
        href={isLoginPage ? "/sign-up" : "/sign-in"}
      >
        {isLoginPage ? "Create new account" : "Sign in to your account"}
      </Link>
      <section className="w-full p-4 sm:w-3/4 text-secondery flex flex-col items-center">
        <h1 className="text-2xl font-bold text-[#09090b]">
          {isLoginPage ? "Sign in to your account" : "Create new account"}
        </h1>
        <p className="text-sm font-semibold my-5 text-gray-400">
          {isLoginPage
            ? "Enter your Email and password below to sign in"
            : "Enter your Email below to create new account"}
        </p>

          <AuthForm isLoginPage={isLoginPage} />

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
