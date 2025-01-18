"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { notFound } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import InteractionBar from "@/app/components/pages/read/InteractionBar";
import { Button } from "@/app/components/ui/button";
import { CgEricsson as Logo } from "react-icons/cg";
import { IoIosClose as CloseIcon } from "react-icons/io";
import SignupModal from "@/app/components/pages/Landing/SignupModal";
import SigninModal from "@/app/components/pages/Landing/SigninModal";
import ReadBlogSkeleton from "@/app/components/pages/read/ReadBlogSkeleton";
import BlogContent from "@/app/components/BlogContent";
import AuthorBlogs from "@/app/components/pages/read/AuthorBlogs";
import { blogType } from "@/app/types/blogType";
import { getCurrentUser } from "@/libs/getCurrentUser";

type Props = {
  params: { blogId: string };
};

const ReadPage = ({ params }: Props) => {
  const token = useMemo(() => getCookie("token") as string | undefined, []);
  const [blog, setBlog] = useState<blogType | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);

  // InteractionBar states
  const [isBlogStarred, setIsBlogStarred] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const [isFollowed, setIsFollowed] = useState(false);

  const fetchBlogAndUser = useCallback(
    async (blogId: string) => {
      setIsLoading(true);
      try {
        const [userResponse, blogResponse] = await Promise.all([
          token ? getCurrentUser(token) : Promise.resolve(null),
          axiosInstance.get(`/api/blog/${blogId}`, {
            headers: { Authorization: token },
          }),
        ]);

        setCurrentUser(userResponse);
        setBlog(blogResponse.data);
        setIsBlogStarred(blogResponse.data.starred);
        setStarCount(blogResponse.data._count.stars);
        setIsFollowed(blogResponse.data.following);
      } catch (err: any) {
        if (err.response?.status === 404) notFound();
      } finally {
        setIsLoading(false);
      }
    },
    [token],
  );

  useEffect(() => {
    fetchBlogAndUser(params.blogId);
  }, [fetchBlogAndUser, params.blogId]);

  const handleOpenAuthModal = useCallback((isNewUser: boolean) => {
    setIsNewUser(isNewUser);
    setIsAuthModalOpen(true);
  }, []);

  const handleCloseAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const isMyBlog = useMemo(
    () => currentUser && blog && currentUser.id === blog.author.id,
    [currentUser, blog],
  );

  if (isLoading) return <ReadBlogSkeleton />;

  if (!blog) return null;

  return (
    <>
      {!token && (
        <nav className="flex h-16 items-center justify-between border-b border-primary px-2 py-1 md:px-6">
          <div className="text-md flex items-center font-bold text-primary sm:text-2xl">
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

      <main className="mx-auto w-full p-4 shadow-sm md:w-[45rem]">
        <h1 className="font-PT text-3xl text-accent-foreground md:text-6xl">
          {blog.title}
        </h1>
        <InteractionBar
          blog={blog}
          isMyBlog={isMyBlog}
          handleOpenAuthModal={handleOpenAuthModal}
          isFollowed={isFollowed}
          setIsFollowed={setIsFollowed}
          isBlogStarred={isBlogStarred}
          setIsBlogStarred={setIsBlogStarred}
          starCount={starCount}
          setStarCount={setStarCount}
        />

        <div className="relative h-[40vh] w-full overflow-hidden">
          <Image
            src={
              blog.imageUrl ||
              "https://cdn.dribbble.com/users/942818/screenshots/16384489/media/70e914e91b4ecc5765c5faee678ad5d0.jpg"
            }
            alt="Blog image"
            fill
            quality={100}
            priority
            className="object-cover"
          />
        </div>
        <div className="prose  dark:prose-dark">
          <BlogContent content={blog.content} />
        </div>
        <InteractionBar
          blog={blog}
          isMyBlog={isMyBlog}
          handleOpenAuthModal={handleOpenAuthModal}
          isFollowed={isFollowed}
          setIsFollowed={setIsFollowed}
          isBlogStarred={isBlogStarred}
          setIsBlogStarred={setIsBlogStarred}
          starCount={starCount}
          setStarCount={setStarCount}
        />

        <AuthorBlogs
          authorUsername={blog.author.username}
          handleOpenAuthModal={handleOpenAuthModal}
          isMyBLog={isMyBlog}
          isFollowed={isFollowed}
          setIsFollowed={setIsFollowed}
        />
      </main>

      {isAuthModalOpen && (
        <>
          <div
            onClick={handleCloseAuthModal}
            className="fixed inset-0 z-30"
          ></div>
          <main
            className={clsx(
              "fixed inset-1/2 z-40 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white shadow-md",
              {
                "modal-open-animation": isAuthModalOpen,
                "modal-close-animation": !isAuthModalOpen,
              },
            )}
          >
            <CloseIcon
              className="absolute right-2 top-2 cursor-pointer p-2 text-gray-500 hover:text-gray-900"
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
    </>
  );
};

export default ReadPage;
