"use client";

import { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/Components/ui/tabs";
import Sheet from "../../Components/pages/create/Sheet";
import axiosInstance from "@/libs/axiosInstance";
import Link from "next/link";
import { CgEricsson as Logo } from "react-icons/cg";
import { getCookie } from "cookies-next";
import Preview from "@/app/Components/pages/create/Preview";
import SheetSkeleton from "@/app/Components/pages/create/SheetSkeleton";

interface Blog {
  blogId: string;
  content: string;
  title: string;
  imageUrl: string;
  categories: { category: { name: string } }[];
  draft: boolean;
}

interface CreatePageProps {
  params: { blogId: string };
}

async function fetchBlog(blogId: string): Promise<Blog | null> {
  try {
    const res = await axiosInstance(`/api/blog/${blogId}`, {
      headers: {
        Authorization: getCookie("token"),
      },
    });
    return res.data;
  } catch (err: any) {
    console.error("Error fetching blog:", err.response?.data || err.message);
    return null;
  }
}

const CreatePage = ({ params }: { params: { blogId: string } }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    async function getBlog() {
      const data = await fetchBlog(params.blogId);
      if (data) {
        setBlog(data);
        setContent(data.content || "");
        setTitle(data.title || "");
        setImageUrl(data.imageUrl || "");
        setSelectedCategories(
          data.categories.map((category) => category.category.name) || [],
        );
      }
    }

    getBlog();
  }, [params.blogId]);

  if (!blog) {
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

  return (
    <>
      <nav className="fixed left-0 top-0 z-40 flex h-16 w-full items-center gap-1 bg-card px-3 font-bold text-primary">
        <Link href="/blogs" className="sm:text-2xl">
          <Logo size={35} />
        </Link>
        <h1 className="text-xl">Create</h1>
      </nav>
      <div className="mt-20 w-full lg:mx-auto lg:w-[55rem]">
        <Tabs defaultValue="write">
          <TabsList className="bg-transparent">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="write">
            <Sheet
              blog={blog}
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
