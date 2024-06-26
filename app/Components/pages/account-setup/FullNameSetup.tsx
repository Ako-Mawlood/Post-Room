"use client"

import {Button} from "../../ui/button"
import {useForm} from "react-hook-form"
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useContext, useEffect} from "react"
import axios from "../../../../libs/axios"
import {useRouter} from "next/navigation"
import {ImSpinner8 as Spinner} from "react-icons/im"
import clsx from "clsx"
import {CurrentUserContext} from "@/app/providers/CurrentUserProvider"
import {Skeleton} from "../../ui/skeleton"

const fullNameSchema = z.object({
  fullName: z.string().regex(/^[A-Za-z]+(?:[ \-'][A-Za-z]+)*$/, "Invalid full name format"),
})

type FullNameType = z.infer<typeof fullNameSchema>

const FullNameSetup = () => {
  const token = localStorage.getItem("token")
  const currentUser = useContext(CurrentUserContext)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: {isSubmitting, errors},
  } = useForm({
    defaultValues: {fullName: ""},
    resolver: zodResolver(fullNameSchema),
  })

  async function handleSetupFullName(data: FullNameType) {
    await axios
      .put("/api/user", data, {
        headers: {Authorization: token},
      })
      .then(() => {
        router.push("/account-setup?setupStep=username")
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          setError("root", {
            message: "You probably disconnected. Please check your internet connection.",
          })
        } else {
          setError("root", {message: err.response?.data})
        }
      })
  }

  useEffect(() => {
    setFocus("fullName")
  }, [setFocus])

  return (
    <form
      onSubmit={handleSubmit(handleSetupFullName)}
      className="flex flex-col items-center justify-center gap-4 w-full sm:w-[30rem] p-6 text-center"
    >
      <h1 className="text-primary text-4xl font-PT">Set up your account.</h1>
      <p className="text-lg">Let's set up your account by creating a full name.</p>
      {errors.root && (
        <span className="bg-red-500/15 p-2 text-red-500 text-sm w-full font-semibold border border-red-400">
          {errors.root.message}
        </span>
      )}
      <label className="flex flex-col w-full mt-4">
        <span className="text-gray-600 dark:text-gray-200">Full name</span>
        {errors.fullName && (
          <span className="text-red-500 text-xs text-start">{errors.fullName.message}</span>
        )}
        <input
          {...register("fullName")}
          className={clsx("p-2 outline-none bg-transparent border-b duration-100", {
            "border-red-600 focus:border-red-500": errors.fullName,
            "border-border focus:border-primary": !errors.fullName,
          })}
          autoComplete="off"
          placeholder="Full name"
        />
      </label>
      <span className="text-gray-600 dark:text-gray-200">Your email</span>
      {currentUser ? <span>{currentUser.email}</span> : <Skeleton className="w-52 h-6 rounded-full" />}

      <Button className="w-24">
        {isSubmitting ? <Spinner className="size-5 animate-spin" /> : "Continue"}
      </Button>
    </form>
  )
}

export default FullNameSetup
