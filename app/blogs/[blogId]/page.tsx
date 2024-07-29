"use client";

import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import Image from "next/image";
import InteractionBar from "@/app/components/pages/blogs/InteractionBar";
import { backgroundColors } from "@/constants/backgroundColors";
import parse from "html-react-parser";
import { notFound } from "next/navigation";
import { blogType } from "@/app/types/blogType";
import { Button } from "@/app/components/ui/button";
import { CgEricsson as Logo } from "react-icons/cg";
import { IoIosClose as CloseIcon } from "react-icons/io";
import SigninModal from "@/app/components/pages/Landing/SigninModal";
import { useEffect, useState } from "react";
import SignupModal from "@/app/components/pages/Landing/SignupModal";
import clsx from "clsx";

type readPageProps = {
  params: { blogId: string };
};

const ReadPage = ({ params }: readPageProps) => {
  const [blog, setBlog] = useState<blogType | undefined>(undefined);
  const isMyBlog = false;
  const token = getCookie("token");
  const [isNewUser, setIsNewUser] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthModalVisable, setIsAuthModalVisable] = useState(false);
  const [isBlogStarred, setIsBlogStarred] = useState(blog?.starred as boolean);
  const [starCount, setStarCount] = useState(blog?._count.stars as number);
  console.log(isBlogStarred);
  useEffect(() => {
    async function getBlog(blogId: string) {
      try {
        const res = await axiosInstance(`/api/blog/${blogId}`, {
          headers: { Authorization: token },
        });

        setBlog(res.data);
        setIsBlogStarred(res.data.starred);
        setStarCount(res.data._count.stars);
      } catch (err: any) {
        if (err.response.status === 404) {
          notFound();
        }
      }
    }
    getBlog(params.blogId);
  }, []);
  function handleOpenAuthModal(isNewUser: boolean) {
    setIsNewUser(isNewUser);
    setIsAuthModalVisable(true);
    setIsAuthModalOpen(true);
  }

  function handleCloseAuthModal() {
    setIsAuthModalOpen(false);
    setTimeout(() => {
      setIsAuthModalVisable(false);
    }, 190);
  }
  return (
    <>
      {!token && (
        <nav className="flex h-16 w-full items-center justify-between border-b border-border px-2 py-1 text-foreground md:px-6">
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
      {isAuthModalVisable && (
        <>
          <div
            onClick={handleCloseAuthModal}
            className="fixed left-0 top-0 z-30 h-screen w-screen bg-gray-50 opacity-95"
          ></div>
          <main
            className={clsx(
              "fixed left-1/2 top-1/2 z-40 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white shadow-md shadow-gray-400 md:absolute md:w-[678px]",
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
      {blog && (
        <>
          <>
            <section className="w-full px-6">
              <h1 className="mt-6 border-b-2 py-4 font-PT text-5xl text-accent-foreground">
                {blog.title}
                {blog.categories && (
                  <ul className="mt-2 flex gap-3 text-sm">
                    {blog.categories.map((category, index: number) => (
                      <div className="flex gap-1">
                        <span
                          style={{
                            color: `rgb(${backgroundColors[index + 1]},0.9)`,
                          }}
                        >
                          #
                        </span>
                        <span className="text-primary">
                          {category.category.name}
                        </span>
                      </div>
                    ))}
                  </ul>
                )}
              </h1>

              <InteractionBar
                blog={blog}
                isMyBlog={isMyBlog}
                isBlogStarred={isBlogStarred}
                setIsBlogStarred={setIsBlogStarred}
                starCount={starCount}
                setStarCount={setStarCount}
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
          </>
          <section className="mx-auto w-full p-6 lg:w-[50vw]">
            <h1 className="mt-6 border-b-2 py-4 font-PT text-5xl text-accent-foreground">
              {blog.title}
            </h1>
            <div className="prose my-10 dark:prose-dark">
              {parse(blog.content)}
            </div>
          </section>
          <InteractionBar
            blog={blog}
            isMyBlog={isMyBlog}
            isBlogStarred={isBlogStarred}
            setIsBlogStarred={setIsBlogStarred}
            starCount={starCount}
            setStarCount={setStarCount}
            handleOpenAuthModal={handleOpenAuthModal}
          />
        </>
      )}
    </>
  );
};

export default ReadPage;
