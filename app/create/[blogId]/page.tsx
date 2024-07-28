"use client";

import { useEffect, useState } from "react";
import Sheet from "../../components/pages/create/Sheet";
import axiosInstance from "@/libs/axiosInstance";
import Link from "next/link";
import { CgEricsson as Logo } from "react-icons/cg";
import { getCookie } from "cookies-next";
import Preview from "@/app/components/pages/create/Preview";
import SheetSkeleton from "@/app/components/pages/create/SheetSkeleton";
import { AxiosError } from "axios";
import Error from "@/app/components/Error";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { notFound } from "next/navigation";

type categoryType = {
  category: {
    name: string;
  };
};

const CreatePage = ({ params }: { params: { blogId: string } }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  useEffect(() => {
    async function fetchBlog() {
      try {
        setIsloading(true);
        const res = await axiosInstance(`/api/blog/${params.blogId}`, {
          headers: {
            Authorization: getCookie("token"),
          },
        });

        if (res.status === 200) {
          setContent(res.data.content || "");
          setTitle(res.data.title || "");
          setImageUrl(res.data.imageUrl || "");
          console.log(res.data.categories);
          setSelectedCategories(
            res.data.categories.map(
              (category: categoryType) => category.category.name,
            ) || [],
          );
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error("Error fetching blog:", err.response?.data);
          setError(err);
        }
      } finally {
        setIsloading(false);
      }
    }

    fetchBlog();
  }, [params.blogId]);
  if (isLoading) {
    return (
      <>
        <nav className="fixed left-0 top-0 m-3 flex items-center gap-1 font-bold text-primary">
          <Link href="/blogs" className="text-md sm:text-2xl">
            <Logo size={35} />
          </Link>
          <h1 className="text-xl">Create</h1>
        </nav>
        <SheetSkeleton />
      </>
    );
  }

  if (error) {
    if (error.response?.status === 404) {
      notFound();
    } else {
      return <Error />;
    }
  }

  return (
    <>
      <nav className="fixed left-0 top-0 z-40 flex h-16 w-full items-center gap-1 bg-card px-3 font-bold text-primary">
        <Link href="/blogs" className="sm:text-2xl">
          <Logo size={35} />
        </Link>
        <h1 className="text-xl">Create</h1>
      </nav>
      <div className="mt-48 file:w-full sm:mt-32 lg:mx-auto lg:mt-20 lg:w-[55rem]">
        <Tabs defaultValue="write">
          <TabsList className="bg-transparent">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="write">
            <Sheet
              blogId={params.blogId}
              content={content}
              setContent={setContent}
              title={title}
              setTitle={setTitle}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </TabsContent>
          <TabsContent value="preview">
            <Preview
              content={content}
              title={title}
              imageUrl={imageUrl}
              selectedCategories={selectedCategories}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default CreatePage;
