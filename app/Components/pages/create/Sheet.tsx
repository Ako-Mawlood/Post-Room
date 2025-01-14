/* eslint-disable react-hooks/exhaustive-deps */
import { createBlogSchema } from "@/libs/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
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
import Editor from "./Editor";
import { CreateBlogType } from "@/app/types/CreateBlogType";
import useDebounceBlogData from "@/app/Hooks/useDebounceBlogData";
import UploadWidget from "../../UploadWidget";
import Link from "next/link";

type sheetProps = {
  blogId: string;
  blogData: CreateBlogType;
  setBlogData: Dispatch<SetStateAction<CreateBlogType>>;
  isDraft: boolean;
};

type formDataType = z.infer<typeof createBlogSchema>;

const Sheet = ({ blogId, blogData, setBlogData, isDraft }: sheetProps) => {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const debouncedBlogData = useDebounceBlogData(blogData, 500);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<formDataType>({
    defaultValues: {
      imageUrl: blogData.imageUrl,
      title: blogData.title,
      content: blogData.content,
      categories: blogData.selectedCategories,
    },
    resolver: zodResolver(createBlogSchema),
  });

  // Publishing the blog
  function handlePublish() {
    setIsSubmitting(true);
    axiosInstance
      .patch(
        `/api/blog/${blogId}`,
        {},
        {
          headers: { Authorization: getCookie("token") },
        },
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

  async function handleSaveBlog() {
    try {
      await axiosInstance.put(
        `/api/blog/${blogId}`,
        {
          ...blogData,
          categories: blogData.selectedCategories,
        },

        {
          headers: { Authorization: getCookie("token") },
        },
      );
      setIsSaved(true);
    } catch (err) {
    } finally {
      setTimeout(() => {
        setIsSaved(false);
      }, 1000);
    }
  }
  useEffect(() => {
    handleSaveBlog();
  }, [blogId, debouncedBlogData]);
  function updateImageState(url: string) {
    setBlogData((prev) => ({ ...prev, imageUrl: url }));
  }

  function handleRemoveCover() {
    setBlogData((prev) => ({ ...prev, imageUrl: "" }));
    form.setValue("imageUrl", "");
  }
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
            <div className="mb-4 flex gap-2">
              <UploadWidget form={form} updateImageUrlState={updateImageState}>
                {blogData.imageUrl ? (
                  <div className="flex max-w-sm rounded-md bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5">
                    <button
                      type="button"
                      className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                    >
                      Update Cover
                    </button>
                  </div>
                ) : (
                  <div className="flex max-w-sm rounded-md bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5">
                    <button
                      type="button"
                      className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                    >
                      Upload cover
                    </button>
                  </div>
                )}
              </UploadWidget>
              {blogData.imageUrl && (
                <div className="flex max-w-sm rounded-md bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5">
                  <button
                    type="button"
                    onClick={handleRemoveCover}
                    className="flex-1 rounded-md bg-primary-foreground px-4 py-2 text-sm font-semibold"
                  >
                    Remove cover
                  </button>
                </div>
              )}
            </div>

            <div className="relative h-96 w-full">
              <Image
                src={
                  blogData.imageUrl ||
                  "https://cdn.dribbble.com/users/942818/screenshots/16384489/media/70e914e91b4ecc5765c5faee678ad5d0.jpg"
                }
                fill={true}
                priority={true}
                sizes="(max-width: 639px) 400px, (min-width: 640px) and (max-width: 767px) 700px, (min-width: 768px) and (max-width: 1023px) 1064px, (min-width: 1024px) 768px"
                alt="Blog cover Image"
                className="rounded-md object-cover"
              />
            </div>
            <AddCategory
              form={form}
              blogData={blogData}
              setBlogData={setBlogData}
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
                        setBlogData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }));
                      }}
                      placeholder="Blog title here..."
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
                    <Editor
                      form={form}
                      blogData={blogData}
                      setBlogData={setBlogData}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {isDraft ? (
              <Button
                disabled={isSubmitting}
                className="fixed right-3 top-3 z-50 w-20 disabled:opacity-100"
                type="submit"
                onClick={handlePublish}
              >
                {isSubmitting ? (
                  <Spinner size={20} className="animate-spin" />
                ) : (
                  "Publish"
                )}
              </Button>
            ) : (
              <Link
                href={`/read/${blogId}`}
                className="fixed right-3 top-4 z-50"
              >
                <Button size="sm" className="font-semibold">
                  Go Back to blog
                </Button>
              </Link>
            )}
          </form>
        </Form>
      </section>
    </>
  );
};

export default Sheet;
