import { FcGoogle } from "react-icons/fc";
import { FaApple} from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Button } from "@/app/Components/ui/button";
import { CiMail } from "react-icons/ci";

const AuthForm = ({ isSignInPage}: { isSignInPage: boolean }) => {

  return (    
      <section className="flex flex-col gap-4 items-center w-full text-md p-4 text-gray-700 font-semibold">
      <Button variant="outline" className="w-full flex justify-center"> <FcGoogle className="mr-auto" size={30}/> <span className="mr-auto">{isSignInPage ? "Sign in with Google":"Sign up with Google"}</span></Button>
      <Button variant="outline" className="w-full flex justify-center"> <FaApple className="mr-auto text-slate-900" size={30}/> <span className="mr-auto">{isSignInPage ? "Sign in with Apple":"Sign up with Apple"}</span></Button>
      <Button variant="outline" className="w-full flex justify-center"> <IoLogoFacebook className="mr-auto text-blue-500" size={30}/> <span className="mr-auto">{isSignInPage ? "Sign in with Facebook":"Sign up with Facebook"}</span></Button>
      <Button variant="outline" className="w-full flex justify-center"> <FaSquareXTwitter className="mr-auto text-slate-900" size={30}/> <span className="mr-auto">{isSignInPage ? "Sign in with X":"Sign up with X"}</span></Button>
      <Button variant="outline" className="w-full flex justify-center"> <CiMail className="mr-auto" size={30}/> <span className="mr-auto">{isSignInPage ? "Sign in with Email":"Sign up with Email"}</span></Button>
      </section>
  );
};

export default AuthForm;


































































      {/* {!isSignInPage &&
        <div className="flex w-full">
          <input
            className={clsx("py-2 mb-3 bg-transparent border w-1/2 rounded-md px-2 focus:shadow-inner focus:outline-none", {
              "cursor-not-allowed": isSubmitting,
              "border-red-300 focus:border-red-400": errors.email,
              "border-gray-300 focus:border-gray-400": !errors.email
            })}
            placeholder="Name"
            disabled={isSubmitting}
          />
          <input
            className={clsx("py-2 mb-3 bg-transparent border w-1/2 ml-3 rounded-md px-2 focus:shadow-inner focus:outline-none", {
              "cursor-not-allowed": isSubmitting,
              "border-red-300 focus:border-red-400": errors.email,
              "border-gray-300 focus:border-gray-400": !errors.email
            })}
            placeholder="*User name"
            disabled={isSubmitting}
          />
        </div>
      }
      {errors.email && <span className="text-red-500 pb-1 font-semibold">{errors.email?.message}</span>}
      <input
        className={clsx("py-2 mb-3 bg-transparent border rounded-md px-2 focus:shadow-inner focus:outline-none", {
          "cursor-not-allowed": isSubmitting,
          "border-red-300 focus:border-red-400": errors.email,
          "border-gray-300 focus:border-gray-400": !errors.email
        })}
        placeholder="Email"
        disabled={isSubmitting}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address",
          }
        }
        )}
      />
      {
        errors.password && <span className="text-red-500 pb-1 font-semibold">{errors.password.message}</span>
      }
      <input
        className={clsx("py-3 mb-3 bg-transparent border rounded-md px-2 focus:shadow-inner focus:outline-none ", {
          "cursor-not-allowed": isSubmitting,
          "border-red-300 focus:border-red-400": errors.email,
          "border-gray-300 focus:border-gray-400": !errors.email
        })}
        placeholder="Password"
        type="password"
        disabled={isSubmitting}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long"
          }
        }
        )}
      />
      <button
        className="w-full bg-slate-950 flex justify-center font-semibold text-base items-center text-center py-2 rounded-md text-white hover:opacity-90"
        type="submit"
        disabled={isSubmitting}
      >
        <span className="flex justify-center items-center text-center">
          {isSubmitting && <ImSpinner8 className="animate-spin mr-3" size={15} />}
          {isSignInPage ? "Sign in with Email" : "Sign up with Email"}
        </span>
      </button> */}
