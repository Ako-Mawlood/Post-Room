"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { notFound } from "next/navigation";
import Image from "next/image";

import InteractionBar from "@/app/components/pages/read/InteractionBar";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import SignupModal from "@/app/components/pages/Landing/SignupModal";
import SigninModal from "@/app/components/pages/Landing/SigninModal";
import ReadBlogSkeleton from "@/app/components/pages/read/ReadBlogSkeleton";
import BlogContent from "@/app/components/BlogContent";
import AuthorInfoSection from "@/app/components/pages/read/AuthorInfoSection";
import { blogType } from "@/app/types/blogType";
import { getCurrentUser } from "@/libs/getCurrentUser";
import Navbar from "@/app/components/Navbar";
import NavbarUnauthorized from "@/app/components/NavbarUnauthorized";

type Props = {
  params: { blogId: string };
};

const ReadPage = ({ params }: Props) => {
  const [blog, setBlog] = useState<blogType | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [isBlogStarred, setIsBlogStarred] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const [isFollowed, setIsFollowed] = useState(false);

  const token = useMemo(() => getCookie("token") as string | undefined, []);

  const fetchBlogAndUser = useCallback(
    async (blogId: string) => {
      setIsLoading(true);
      try {
        const [userResponse, blogResponse] = await Promise.all([
          token ? getCurrentUser() : Promise.resolve(null),
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
        // Handle other errors appropriately
      } finally {
        setIsLoading(false);
      }
    },
    [token],
  );

  useEffect(() => {
    if (params.blogId) fetchBlogAndUser(params.blogId);
  }, [fetchBlogAndUser, params.blogId]);

  function handleOpenAuthModal(isNewUser: boolean) {
    setIsNewUser(isNewUser);
    setIsAuthModalOpen(true);
  }

  function handleCloseAuthModal() {
    setIsAuthModalOpen(false);
  }

  const isMyBlog = useMemo(
    () => currentUser && blog && currentUser.id === blog.author.id,
    [currentUser, blog],
  );

  const fallbackImageUrl = useMemo(
    () =>
      "https://cdn.dribbble.com/users/942818/screenshots/16384489/media/70e914e91b4ecc5765c5faee678ad5d0.jpg",
    [],
  );

  return (
    <>
      {token ? (
        <Navbar />
      ) : (
        <NavbarUnauthorized handleOpenAuthModal={handleOpenAuthModal} />
      )}
      {blog && !isLoading ? (
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
              src={blog.imageUrl || fallbackImageUrl}
              alt="Blog image"
              fill
              quality={100}
              priority
              className="object-cover"
            />
          </div>

          <div className="prose dark:prose-dark">
            <BlogContent content={blog.content} />
          </div>

          <AuthorInfoSection
            authorUsername={blog.author.username}
            handleOpenAuthModal={handleOpenAuthModal}
            isMyBLog={isMyBlog}
            isFollowed={isFollowed}
            setIsFollowed={setIsFollowed}
          />
        </main>
      ) : (
        <ReadBlogSkeleton />
      )}

      {/* Auth modal */}
      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent className="flex h-full items-center justify-center bg-white md:max-w-[40rem]">
          {isNewUser ? (
            <SignupModal
              isNewUser={isNewUser}
              setIsNewUser={setIsNewUser}
              handleCloseAuthModal={handleCloseAuthModal}
            />
          ) : (
            <SigninModal isNewUser={isNewUser} setIsNewUser={setIsNewUser} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReadPage;
