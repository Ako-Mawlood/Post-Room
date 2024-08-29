"use client";

import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import Image from "next/image";
import InteractionBar from "@/app/components/pages/read/InteractionBar";
import { blogType } from "@/app/types/blogType";
import { Button } from "@/app/components/ui/button";
import { CgEricsson as Logo } from "react-icons/cg";
import { IoIosClose as CloseIcon } from "react-icons/io";
import SigninModal from "@/app/components/pages/Landing/SigninModal";
import { useEffect, useState } from "react";
import SignupModal from "@/app/components/pages/Landing/SignupModal";
import clsx from "clsx";
import { getCurrentUser } from "@/libs/getCurrentUser";
import ReadBlogSkeleton from "@/app/components/pages/read/ReadBlogSkeleton";
import { notFound } from "next/navigation";
import AuthorBlogs from "@/app/components/pages/read/AuthorBlogs";
import BlogContent from "@/app/components/BlogContent";

type ReadPageProps = {
  params: { blogId: string };
};
const ReadPage = ({ params }: ReadPageProps) => {
  const token = getCookie("token") as string | undefined;
  const [blog, setBlog] = useState<blogType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [isBlogStarred, setIsBlogStarred] = useState<boolean>(false);
  const [starCount, setStarCount] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [commentCount, setCommentCount] = useState<any>();
  console.log(blog);
  useEffect(() => {
    async function fetchBlogAndUser(blogId: string) {
      setIsLoading(true);
      if (token) {
        // Fetch the current user
        const user = await getCurrentUser(token);
        setCurrentUser(user);
      }
      try {
        // Fetch the blog
        const res = await axiosInstance(`/api/blog/${blogId}`, {
          headers: { Authorization: token },
        });

        setBlog(res.data);
        setIsBlogStarred(res.data.starred);
        setStarCount(res.data._count.stars);
        setCommentCount(res.data._count.comments);
      } catch (err: any) {
        if (err.response?.status === 404) {
          notFound();
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogAndUser(params.blogId);
  }, [params.blogId, token]);

  function handleOpenAuthModal(isNewUser: boolean) {
    setIsNewUser(isNewUser);
    setIsAuthModalVisible(true);
    setIsAuthModalOpen(true);
  }

  function handleCloseAuthModal() {
    setIsAuthModalOpen(false);
    setTimeout(() => {
      setIsAuthModalVisible(false);
    }, 190);
  }

  const isMyBlog = currentUser && blog && currentUser.id === blog.author.id;

  return (
    <>
      {!token && (
        <nav className="flex h-16 w-full items-center justify-between border-b border-primary px-2 py-1 text-foreground md:px-6">
          <div className="text-md flex items-center font-PT font-bold text-primary sm:text-2xl">
            <Logo size={25} />
            <h1>Post-Room</h1>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => handleOpenAuthModal(false)}
              variant="ghost"
              className="rounded-full"
            >
              Login
            </Button>
            <Button onClick={() => handleOpenAuthModal(true)}>
              Create account
            </Button>
          </div>
        </nav>
      )}
      {isAuthModalVisible && (
        <>
          <div
            onClick={handleCloseAuthModal}
            className="fixed left-0 top-0 z-30 h-screen w-screen bg-gray-50 opacity-95"
          ></div>
          <main
            className={clsx(
              "fixed left-1/2 top-1/2 z-40 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white shadow-md shadow-gray-400 md:w-[678px]",
              {
                "modal-open-animation": isAuthModalOpen,
                "modal-close-animation": !isAuthModalOpen,
              },
            )}
          >
            <CloseIcon
              className="absolute right-2 top-2 size-12 cursor-pointer p-2 text-gray-500 hover:text-gray-950"
              onClick={handleCloseAuthModal}
            />
            {isNewUser ? (
              <SignupModal
                isNewUser={isNewUser}
                setIsNewUser={setIsNewUser}
                handleCloseAuthModal={handleCloseAuthModal}
              />
            ) : (
              <SigninModal isNewUser={isNewUser} setIsNewUser={setIsNewUser} />
            )}
          </main>
        </>
      )}
      {isLoading && <ReadBlogSkeleton />}
      {blog && (
        <>
          <section className="w-full px-6">
            <div className="mt-6 border-b-2 py-4 font-PT text-5xl text-accent-foreground">
              {blog.title}
              {blog.categories && (
                <ul className="mt-2 flex gap-3 text-sm">
                  {blog.categories.map((category, index: number) => (
                    <div key={index} className="flex gap-1">
                      <span className="text-violet-600">#</span>
                      <span className="text-primary">
                        {category.category.name}
                      </span>
                    </div>
                  ))}
                </ul>
              )}
            </div>

            <InteractionBar
              blog={blog}
              isMyBlog={isMyBlog}
              isBlogStarred={isBlogStarred}
              setIsBlogStarred={setIsBlogStarred}
              starCount={starCount}
              setStarCount={setStarCount}
              commentCount={commentCount}
              setCommentCount={setCommentCount}
              handleOpenAuthModal={handleOpenAuthModal}
            />
            <div className="relative h-[90vh] w-full overflow-hidden">
              <Image
                className="rounded-lg object-cover"
                src={
                  blog.imageUrl ||
                  "https://cdn.dribbble.com/users/942818/screenshots/16384489/media/70e914e91b4ecc5765c5faee678ad5d0.jpg"
                }
                fill={true}
                quality={100}
                priority
                alt="Blog image"
              />
            </div>
          </section>
          <section className="mx-auto w-full p-6 md:w-[880px]">
            <h1 className="mt-6 border-b-2 py-4 font-PT text-5xl text-accent-foreground">
              {blog.title}
            </h1>
            <div className="prose my-10 dark:prose-dark">
              <BlogContent content={blog.content} />
            </div>

            <InteractionBar
              blog={blog}
              isMyBlog={isMyBlog}
              isBlogStarred={isBlogStarred}
              setIsBlogStarred={setIsBlogStarred}
              starCount={starCount}
              setStarCount={setStarCount}
              commentCount={commentCount}
              setCommentCount={setCommentCount}
              handleOpenAuthModal={handleOpenAuthModal}
            />
          </section>
          <AuthorBlogs
            authorUsername={blog.author.username}
            handleOpenAuthModal={handleOpenAuthModal}
            isFollowed={blog.following}
            isMyBLog={isMyBlog}
          />
        </>
      )}
    </>
  );
};

export default ReadPage;
