"use client";

import { useState } from "react";
import Sheet from "../../components/pages/create/Sheet";
import axiosInstance from "@/libs/axiosInstance";
import Link from "next/link";
import { CgEricsson as Logo } from "react-icons/cg";
import { getCookie } from "cookies-next";
import Preview from "@/app/components/pages/create/Preview";
import SheetSkeleton from "@/app/components/pages/create/SheetSkeleton";
import Error from "@/app/components/Error";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CreateBlogType } from "@/app/types/CreateBlogType";

type CategoryType = {
  category: {
    name: string;
  };
};

const CreatePage = ({ params }: { params: { blogId: string } }) => {
  const [blogData, setBlogData] = useState<CreateBlogType>({
    title: "",
    content: "",
    imageUrl: "",
    selectedCategories: [],
  });

  const { isLoading, error, isFetched } = useQuery<CreateBlogType>({
    queryKey: ["createBlog", params.blogId],
    queryFn: async () => {
      const res = await axiosInstance(`/api/blog/${params.blogId}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      const blogDataObj = {
        title: res.data.title,
        content: res.data.content,
        imageUrl: res.data.imageUrl,
        selectedCategories: res.data.categories.map(
          (category: CategoryType) => category.category.name,
        ),
      };
      setBlogData(blogDataObj);
      return blogDataObj;
    },
  });
  if (!isFetched) {
    return;
  }

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
    if ((error as any).response?.status === 404) {
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
              blogData={blogData}
              setBlogData={setBlogData}
            />
          </TabsContent>
          <TabsContent value="preview">
            <Preview
              content={blogData.content}
              title={blogData.title}
              imageUrl={blogData.imageUrl}
              selectedCategories={blogData.selectedCategories}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default CreatePage;
