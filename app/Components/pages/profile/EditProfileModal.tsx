"use client"

import Image from "next/image"
import {Button} from "../../ui/button"
import {Input} from "../../ui/input"
import {Textarea} from "../../ui/textarea"
import {usePathname, useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import z from "zod"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form"
import axiosInstance from "@/libs/axiosInstance"
import {getCookie} from "cookies-next"
import {useState, useEffect} from "react"
import clsx from "clsx"
import Link from "next/link"
import UploadWidget from "./UploadWidget"
import {profileOwnerType} from "@/app/types/profileOwnerType"
import {Avatar, AvatarImage, AvatarFallback} from "../../ui/avatar"

const formSchema = z.object({
  imageUrl: z.string(),
  fullname: z
    .string()
    .min(2, "Too short")
    .max(20, "Too long")
    .regex(/^[A-Za-z\s]+$/, "Full name must contain only letters"),
  bio: z.string().min(5, "Too short").max(230, "Too long"),
})

type EditProfileModalType = {
  profileOwner: profileOwnerType
  searchParams?: {[key: string]: string | string[] | undefined}
  params: {username: string}
}

type FormDataType = z.infer<typeof formSchema>

// ...rest of your imports

const EditProfileModal = ({profileOwner, searchParams, params}: EditProfileModalType) => {
  const [fullnameCharacters, setFullnameCharacters] = useState(profileOwner.fullname.length)
  const [bioCharacters, setBioCharacters] = useState(profileOwner.bio.length)
  const [uploadedProfileImageUrl, setUploadedProfileImageUrl] = useState<string | undefined>(undefined)
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm<FormDataType>({
    defaultValues: {
      imageUrl: uploadedProfileImageUrl || profileOwner.imageUrl,
      fullname: profileOwner.fullname || "",
      bio: profileOwner.bio || "",
    },
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    const trapScroll = (event: any) => {
      const modal = document.querySelector(".modal")
      if (!modal?.contains(event.target)) {
        event.preventDefault()
      }
    }

    document.addEventListener("wheel", trapScroll, {passive: false})
    document.addEventListener("touchmove", trapScroll, {passive: false})

    return () => {
      document.removeEventListener("wheel", trapScroll)
      document.removeEventListener("touchmove", trapScroll)
    }
  }, [])

  const handleModalToggle = () => {
    const params = new URLSearchParams(searchParams as any)
    if (params.get("edit") === "true") {
      params.delete("edit")
    } else {
      params.append("edit", "true")
    }
    router.push(pathname + "?" + params.toString(), {scroll: false})
  }

  async function handleSave(data: FormDataType) {
    try {
      await axiosInstance.put("/api/user", {...data}, {headers: {Authorization: getCookie("token")}})
      handleModalToggle()
    } catch (error) {
      console.error("Failed to save profile:", error)
    }
  }

  return (
    <>
      <section className="flex flex-col items-center gap-5 w-full md:w-[30rem] absolute top-6 left-1/2 -translate-x-1/2 p-6 bg-card text-card-foreground shadow-md rounded-md z-10 modal">
        <Image
          onClick={handleModalToggle}
          className="absolute top-3 right-3 cursor-pointer"
          src="/assets/close.svg"
          width={20}
          height={20}
          alt="close"
        />
        <h1 className="font-semibold text-xl">Profile information</h1>
        <div className="flex gap-8 w-full my-5">
          <UploadWidget setUploadedProfileImageUrl={setUploadedProfileImageUrl}>
            <Avatar className="size-16 cursor-pointer">
              <AvatarFallback>
                {profileOwner?.fullname
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => {
                    return word[0]
                  })
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
              <AvatarImage src={uploadedProfileImageUrl} />
            </Avatar>
          </UploadWidget>

          <div className="flex flex-col justify-between">
            <div className="flex gap-4 text-xs font-semibold">
              <UploadWidget setUploadedProfileImageUrl={setUploadedProfileImageUrl}>
                <button className="text-green-600">Update</button>
              </UploadWidget>
              <button
                onClick={() => {
                  setUploadedProfileImageUrl(undefined)
                }}
                className="text-destructive"
              >
                Remove
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-5 w-full text-sm">
            <FormField
              name="fullname"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormMessage className="text-xs" />
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setFullnameCharacters(e.target.value.length)
                      }}
                      className="text-muted-foreground bg-muted h-8"
                    />
                  </FormControl>
                  <FormDescription className="w-fit ml-auto">
                    <span className={clsx({"text-destructive": field.value.length > 20})}>
                      {fullnameCharacters}
                    </span>
                    /20
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              name="bio"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Textarea
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setBioCharacters(e.target.value.length)
                      }}
                      className="text-muted-foreground bg-muted"
                    />
                  </FormControl>
                  <FormDescription className="w-fit ml-auto">
                    <span className={clsx({"text-destructive": field.value.length > 230})}>
                      {bioCharacters}
                    </span>
                    /230
                  </FormDescription>
                </FormItem>
              )}
            />
            <Link
              href={`/@${params?.username}/settings`}
              className="flex flex-col items-start gap-2 relative p-2 rounded-md duration-150 hover:bg-muted"
            >
              <h2 className="font-semibold">Manage Account Settings</h2>
              <p className="text-sm text-muted-foreground">
                Update your categories, username, and account preferences.
              </p>
              <Image
                className="absolute top-2 right-2"
                src="/assets/redirect.svg"
                width={20}
                height={20}
                alt="redirect"
              />
            </Link>
            <div className="flex justify-end gap-3">
              <Button
                onClick={handleModalToggle}
                variant="outline"
                type="submit"
                className="w-20 border-green-500 text-green-500 hover:text-green-500 hover:bg-green-500/15"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-20 bg-green-500 hover:bg-green-600 hover:opacity-90">
                {form.formState.isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </section>
      <div className="w-screen h-screen fixed top-0 left-0 bg-black opacity-70 z-0"></div>
    </>
  )
}

export default EditProfileModal
