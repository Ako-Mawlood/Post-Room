import Link from "next/link";
import AuthForm from "@/app/Components/pages/Authentication/AuthForm";
export const metadata = {
  title: "Post-Room | Sign in",
};

const signIn = () => {

  return (

    <aside className="w-full md:w-4/6 lg:w-1/2 bg-gray-100 h-screen flex justify-center items-center">
      <Link className="absolute text-primary font-semibold top-8 right-4 hover:bg-[#ddddef] transition duration-100 rounded-md py-2 px-2" href="/sign-up">Create new account  </Link>
      <section className="w-full p-4 sm:w-3/4 text-secondery flex flex-col items-center">
        <h1 className="text-2xl font-bold text-[#09090b]">Sign in to your account</h1>
        <p className="text-sm font-semibold my-5 text-gray-400">Enter your Email and password below to sign in</p>

        <AuthForm isSignInPage={true} />

        <p className="text-center mt-4">
          By continuing, you will agree to our{" "}
          <span className="underline">Terms of services</span> and{" "}
          <span className="underline"> Privacy Policy</span>
        </p>
      </section>
    </aside>
  );
};

export default signIn;
