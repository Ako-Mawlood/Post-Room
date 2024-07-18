"use client"

import {createBlogSchema} from "@/libs/validations"
import {zodResolver} from "@hookform/resolvers/zod"
import {useState, useEffect} from "react"
import {useRouter} from "next/navigation"
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
import Tiptap from "./Tiptap"
import axiosInstance from "@/libs/axiosInstance"
import {getCookie} from "cookies-next"
import UploadWidget from "../../UploadWidget"
import useDebounce from "@/app/Hooks/useDebounce"
import AddCategory from "./AddCategory"

const Sheet = ({params, blog}: {params: {blogId: string}; blog: any}) => {
  const [profileImage, setProfileImage] = useState<string | null>("")
  const initalCategories = blog.categories.map((category: any) => {
    return category.category.name
  })
  const [selectedCategories, setSelectedCategories] = useState(initalCategories)
  const router = useRouter()
  type dataType = z.infer<typeof createBlogSchema>

  const form = useForm<dataType>({
    defaultValues: {
      imageUrl: blog?.imageUrl || "",
      title: blog?.title || "",
      content: blog?.content || "",
      categories: selectedCategories,
    },
    resolver: zodResolver(createBlogSchema),
  })

  function handleAddBlog(data: dataType) {
    console.log(data)
  }
  return (
    <section className="w-full min-h-[30rem] bg-white rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAddBlog)}>
          <UploadWidget form={form} setProfileImage={setProfileImage}>
            <Button className="m-3 rounded-md" variant="outline" type="button">
              Add a cover image
            </Button>
          </UploadWidget>
          <Button type="submit" className="hidden">
            Publish
          </Button>
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <input
                    {...field}
                    placeholder="New post title here..."
                    className="w-full text-4xl mx-10 bg-transparent outline-none font-semibold font-PT"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <AddCategory
            form={form}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <FormField
            control={form.control}
            name="content"
            render={({field}) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Tiptap content={blog.content} />
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
