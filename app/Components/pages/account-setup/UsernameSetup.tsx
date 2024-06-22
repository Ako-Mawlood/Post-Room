"use client"

import {Button} from "../../ui/button"
import {useForm} from "react-hook-form"
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useEffect} from "react"
import axios from "../../../../libs/axios"
import {useRouter} from "next/navigation"
import {ImSpinner8 as Spinner} from "react-icons/im"
import clsx from "clsx"
const usernameSchema = z.object({
  username: z
    .string()
    .min(3, "Username should be atleast 3 characters long")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, hyphens, and underscores"),
})
type usernameType = z.infer<typeof usernameSchema>
const UsernameSetup = () => {
  const token = localStorage.getItem("token")
  console.log(token)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: {isSubmitting, errors},
  } = useForm({defaultValues: {username: ""}, resolver: zodResolver(usernameSchema)})
  async function handeSetupUsername(data: usernameType) {
    console.log({username: data.username, fullname: "Sangar"})
    await axios
      .put("/api/user", data, {headers: {Authorization: token}})
      .then((_res) => {
        router.push("/account-setup?setupStep=catagory")
      })
      .catch((err: any) => {
        if (err.message === "Network Error") {
          setError("root", {message: "You probably disconnected, Please check your internet connection"})
        } else {
          setError("root", {message: err.response?.data})
        }
      })
  }
  useEffect(() => {
    setFocus("username")
  }, [])
  return (
    <form
      onSubmit={handleSubmit(handeSetupUsername)}
      className="flex flex-col items-center justify-center gap-4 w-full sm:w-[30rem] p-6 text-center"
    >
      <h1 className="text-primary text-4xl font-PT">setup your account.</h1>
      <p className="text-lg">Let's set up your account by creating a username.</p>
      {errors.root && (
        <span className="bg-red-500/15 p-2 text-red-500 text-sm w-full font-semibold border border-red-400">
          {errors?.root?.message}
        </span>
      )}
      <label className="flex flex-col w-full mt-4">
        <span className="text-gray-600 dark:text-gray-200">Username</span>
        {errors.username && (
          <span className="text-red-500 text-xs text-start">{errors?.username?.message}</span>
        )}
        <input
          {...register("username")}
          className={clsx("p-2 outline-none bg-transparent border-b duration-100", {
            "border-red-600 focus:border-red-500": errors?.username,
            "border-border focus:border-primary": !errors?.username,
          })}
          autoComplete="off"
          placeholder="Username"
        />
      </label>
      <span className="text-gray-600 dark:text-gray-200">Your email</span>
      <span>ako.mawlood01@gmail.com</span>
      <Button className="w-24">
        {isSubmitting ? <Spinner className="size-5 animate-spin" /> : "Continue"}
      </Button>
    </form>
  )
}

export default UsernameSetup