"use client"

import {createBlogSchema} from "@/libs/validations"
import {zodResolver} from "@hookform/resolvers/zod"
import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import z from "zod"
import {Button} from "@/app/Components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/Components/ui/form"
import {Input} from "@/app/Components/ui/input"
import Tiptap from "./Tiptap"
import axiosInstance from "@/libs/axiosInstance"
import {getCookie} from "cookies-next"
import UploadWidget from "../../UploadWidget"
import useDebounce from "@/app/Hooks/useDebounce"

const Sheet = () => {
  const [profileImage, setProfileImage] = useState<string | null>("")
  const [title, setTitle] = useState<string | null>(null)
  const [content, setContent] = useState("")
  const [categories, setCategories] = useState([""])
  const deboundedContent = useDebounce(content, 1000)
  type dataType = z.infer<typeof createBlogSchema>
  const form = useForm<dataType>({
    defaultValues: {
      imageUrl: "",
      title: "",
      content: "",
    },
    resolver: zodResolver(createBlogSchema),
  })
  useEffect(() => {
    console.log(content)
  }, [deboundedContent])
  function handleAddBlog(data: dataType) {
    axiosInstance.patch("/api/blog/", {data}, {headers: {Authorization: getCookie("token")}})
  }

  return (
    <section className="w-full min-h-[30rem] rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAddBlog)}>
          <UploadWidget form={form} setProfileImage={setProfileImage}>
            <Button className="m-3">Upload Cover</Button>
          </UploadWidget>
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Input
                    onChangeCapture={() => setTitle(field.value)}
                    placeholder="New post title here..."
                    className="text-4xl py-10 bg-transparent border-none font-semibold font-PT"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({field}) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Tiptap content={content} setContent={setContent} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </section>
  )
}

export default Sheet
