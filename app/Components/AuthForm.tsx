"use client";

import { FcGoogle } from "react-icons/fc";
import { ImSpinner8 } from "react-icons/im";
import clsx from "clsx";
import axios from "axios";
import {SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface formDataType{
  email:string;
  password:string;
}

const AuthForm = ({isLoginPage}: { isLoginPage: boolean }) => {

const url = isLoginPage ?"/api/login":"/api/register"
const router = useRouter()
const {register,handleSubmit,setError,formState:{errors,isSubmitting}} = useForm<formDataType>()

 const onSubmit:SubmitHandler<formDataType>=async(data)=>{
  try{
   const res =await axios.post(url,data)
   router.push('/')
  }
  catch(error){
    setError("root",{
      message:"Email or Password is not valid"
    })
  }

 }
  return (
    
      <form 
    onSubmit={handleSubmit(onSubmit)}
        className={clsx("flex flex-col w-full", {
        "opacity-60": isSubmitting,
      })}>

      {errors.root && <span className="text-red-500 bg-red-500/20 px-2 py-2 mb-2 rounded-sm  text-sm font-semibold">{errors.root?.message}</span> }
      {errors.email && <span className="text-red-500 pb-1 text-sm font-semibold">{errors.email?.message}</span> }

      <input
        className={`py-2 mb-3 text-sm bg-transparent border rounded-md px-2 focus:shadow-inner focus:outline-none ${isSubmitting ? "cursor-not-allowed " : ""} ${errors.email ?"border-red-300 focus:border-red-400":"border-gray-300focus:border-gray-400"}`}
        placeholder="Email"
        disabled={isSubmitting}
        {...register("email",{
          required:"Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address",
          },
        })
        }
      
      />
      {
        errors.password && <span className="text-red-500 pb-1 text-sm font-semibold">{errors.password.message}</span>
      }
      <input
        className={`${isSubmitting ? "cursor-not-allowed" :""} py-2 mb-3 text-sm bg-transparent border rounded-md px-2 focus:shadow-inner focus:outline-none ${errors.email ?"border-red-300 focus:border-red-400":"border-gray-300focus:border-gray-400"}`}
        placeholder="Password"
        type="password"
        disabled={isSubmitting}
        {...register("password",{
          required:"Password is required",
          minLength:{
            value:8,
            message:"Password must at least contain 8 charecters"
          }
          })
          
        }
      />
      <button
        className="w-full bg-primary flex justify-center font-semibold items-center text-center py-2 rounded-md text-white hover:opacity-90"
        type="submit"
        disabled={isSubmitting}
      >
        <span className="flex justify-center items-center text-center">
          {isSubmitting && <ImSpinner8 className="animate-spin mr-3" size={15} />}
          {isLoginPage ? "Login with Email" : "Sign up with Email"}
        </span>
      </button>
      <div className="w-full py-2 my-4 flex justify-center items-center">
        <span className="w-full border-b border-gray-300"></span>
        <span className="w-[33rem] text-xs font-semibold uppercase text-center">
          Or countinue with
        </span>
        <span className="border-b border-gray-300 w-full"></span>
      </div>
      <button
        disabled={isSubmitting}
        className="flex justify-center items-center font-semibold w-full py-2 transition duration-100 hover:bg-[#ddddef] rounded-md border border-gray-300"
      >
        {isSubmitting ? (
          <ImSpinner8 className="animate-spin" size={15} />
        ) : (
          <FcGoogle size={25} />
        )}
        <span className="text-primary px-2 text-sm">Google</span>
      </button>
      </form>
  );
};

export default AuthForm;
