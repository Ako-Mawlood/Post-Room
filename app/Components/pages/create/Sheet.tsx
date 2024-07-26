"use client";

import { createBlogSchema } from "@/libs/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import Tiptap from "./Tiptap";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import UploadWidget from "../../UploadWidget";
import useDebounce from "@/app/Hooks/useDebounce";
import AddCategory from "./AddCategory";
import SheetSkeleton from "./SheetSkeleton";
import { Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import clsx from "clsx";

type Blog = {
  blogId: string;
  content: string;
  title: string;
  imageUrl: string;
  categories: { category: { name: string } }[];
  draft: boolean;
};

type sheetProps = {
  blog: Blog;
  content: string;
  setContent: (content: string) => void;
  title: string;
  setTitle: (title: string) => void;
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
};

type formDataType = z.infer<typeof createBlogSchema>;

const Sheet = ({
  blog,
  content,
  setContent,
  title,
  setTitle,
  imageUrl,
  setImageUrl,
  selectedCategories,
  setSelectedCategories,
}: sheetProps) => {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const debouncedContent = useDebounce(content, 500);
  const debouncedTitle = useDebounce(title, 500);
  const form = useForm<formDataType>({
    defaultValues: {
      imageUrl: blog?.imageUrl || "",
      title: blog?.title || "",
      content: blog?.content || "",
      categories: selectedCategories,
    },
    resolver: zodResolver(createBlogSchema),
  });

  useEffect(() => {
    form.reset({
      imageUrl,
      title,
      content,
      categories: selectedCategories,
    });
  }, [imageUrl, title, content, selectedCategories, form]);

  function handleAddBlog(data: formDataType) {
    axiosInstance
      .patch(
        `/api/blog/${blog.blogId}`,
        { ...data, categories: selectedCategories, imageUrl },
        {
          headers: { Authorization: getCookie("token") },
        },
      )
      .then(() => {
        router.push(`/blogs/${blog.blogId}`);
      });
  }

  useEffect(() => {
    axiosInstance
      .put(
        `/api/blog/${blog.blogId}`,
        {
          content,
          title,
          categories: selectedCategories,
          imageUrl,
        },
        { headers: { Authorization: getCookie("token") } },
      )
      .then(() => {
        setIsSaved(true);
        setTimeout(() => {
          setIsSaved(false);
        }, 700);
      });
  }, [debouncedContent, debouncedTitle, selectedCategories, imageUrl]);

  return (
    <>
      {isSaved && (
        <span className="fixed right-28 top-5 z-50 p-1 text-sm text-muted-foreground">
          Saved
        </span>
      )}
      <section className="min-h-[80vh] w-full rounded-lg bg-gray-100 px-3 py-6 dark:bg-muted md:px-3 lg:px-14">
        <Suspense fallback={<SheetSkeleton />}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddBlog)}>
              <UploadWidget form={form} setImageUrl={setImageUrl}>
                <Button className="mb-4 w-fit rounded-md" type="button">
                  Add a cover image
                </Button>
              </UploadWidget>

              <div className="relative h-96 w-full">
                <Image
                  src={
                    imageUrl ||
                    "https://cdn.dribbble.com/users/942818/screenshots/16384489/media/70e914e91b4ecc5765c5faee678ad5d0.jpg"
                  }
                  fill={true}
                  alt={"Blog cover picture"}
                  className="rounded-md object-cover shadow-md"
                />
              </div>

              <AddCategory
                form={form}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormMessage className="absolute -top-1 left-4 bg-muted p-1 dark:text-red-500" />
                    <FormLabel />
                    <FormControl>
                      <textarea
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setTitle(e.target.value);
                        }}
                        placeholder="New post title here..."
                        className={clsx(
                          "h-fit w-full resize-none bg-transparent p-0 font-PT text-3xl outline-none",
                          {
                            "border border-red-500 p-2":
                              form.formState.errors.title,
                          },
                        )}
                        rows={2}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <FormControl>
                      <Tiptap
                        form={form}
                        content={content}
                        setContent={setContent}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                disabled={form.formState.isSubmitting}
                className={clsx("fixed right-3 top-3 z-50", {})}
                type="submit"
              >
                {form.formState.isSubmitting ? (
                  <span>Publishing...</span>
                ) : (
                  <span>Publish</span>
                )}
              </Button>
            </form>
          </Form>
        </Suspense>
      </section>
    </>
  );
};

export default Sheet;
