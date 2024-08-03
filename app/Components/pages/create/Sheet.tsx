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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImSpinner8 as Spinner } from "react-icons/im";
import z from "zod";
import clsx from "clsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";

type sheetProps = {
  blogId: string;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
};

type formDataType = z.infer<typeof createBlogSchema>;

const Sheet = ({
  blogId,
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<formDataType>({
    defaultValues: {
      imageUrl: imageUrl,
      title: title,
      content: content,
      categories: selectedCategories,
    },
    resolver: zodResolver(createBlogSchema),
  });
  const headers = {
    headers: { Authorization: getCookie("token") },
  };
  // Publishing the blog
  function handlePublish(data: formDataType) {
    setIsSubmitting(true);
    axiosInstance
      .patch(
        `/api/blog/${blogId}`,
        { ...data, categories: selectedCategories, imageUrl },
        headers,
      )
      .then(() => {
        router.push(`/read/${blogId}`);
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }
  // Saving blog while typeing

  useEffect(() => {
    axiosInstance
      .put(
        `/api/blog/${blogId}`,
        {
          content,
          title,
          categories: selectedCategories,
          imageUrl,
        },
        headers,
      )
      .then(() => {
        setIsSaved(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsSaved(false);
        }, 700);
      });
  }, [
    debouncedContent,
    debouncedTitle,
    selectedCategories,
    imageUrl,
    blogId,
    content,
    title,
  ]);

  return (
    <>
      {isSaved && (
        <span className="fixed right-28 top-4 z-50 bg-card p-1 text-muted-foreground">
          Saved
        </span>
      )}
      <section className="min-h-[80vh] w-full rounded-lg bg-muted px-3 py-6 lg:px-14">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlePublish)}>
            <UploadWidget form={form} setImageUrl={setImageUrl}>
              <Button className="mb-4 w-fit rounded-md" type="button">
                {imageUrl ? (
                  <span>Update cover imgae</span>
                ) : (
                  <span>Add a cover image</span>
                )}
              </Button>
            </UploadWidget>

            <div className="relative h-96 w-full">
              <Image
                src={
                  imageUrl ||
                  "https://cdn.dribbble.com/users/942818/screenshots/16384489/media/70e914e91b4ecc5765c5faee678ad5d0.jpg"
                }
                fill={true}
                sizes="(max-width: 639px) 400px, (min-width: 640px) and (max-width: 767px) 700px, (min-width: 768px) and (max-width: 1023px) 1064px, (min-width: 1024px) 768px"
                alt={"Blog cover Image"}
                className="rounded-md object-cover"
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
                        "w-full resize-none bg-transparent p-0 font-PT text-3xl outline-none",
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
              render={() => (
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
              disabled={isSubmitting}
              className="fixed right-3 top-3 z-50 w-20 disabled:opacity-100"
              type="submit"
            >
              {isSubmitting ? (
                <Spinner size={20} className="animate-spin" />
              ) : (
                <span>Publish</span>
              )}
            </Button>
          </form>
        </Form>
      </section>
    </>
  );
};

export default Sheet;
