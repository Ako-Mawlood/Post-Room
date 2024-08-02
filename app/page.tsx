"use client";

import SigninModal from "./components/pages/Landing/SigninModal";
import SignupModal from "./components/pages/Landing/SignupModal";
import { backgroundColors } from "@/constants/backgroundColors";
import { useState } from "react";
import BlogsPreview from "./components/pages/Landing/BlogsPreview";
import useSlider from "./Hooks/useSlider";
import Link from "next/link";
import { IoIosClose as CloseIcon } from "react-icons/io";
import clsx from "clsx";
import { CgEricsson } from "react-icons/cg";

export default function LandingPage() {
  const [isNewUser, setIsNewUser] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthModalVisable, setIsAuthModalVisable] = useState(false);
  const { sliderIndex } = useSlider(6);
  const backgroundColor = backgroundColors[sliderIndex];

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
    <div className="selection:bg-gray-800 selection:text-gray-50">
      <nav className="flex h-[8vh] w-full items-center justify-between bg-gray-100 px-4 py-1 text-gray-900 md:px-24">
        <Link
          href="/"
          className="flex items-center font-PT text-lg font-bold sm:text-2xl"
        >
          <CgEricsson size={25} />
          <h1>Post-Room</h1>
        </Link>
        <div className="flex gap-6 font-semibold">
          <button
            onClick={() => handleOpenAuthModal(true)}
            className="hidden sm:block"
          >
            Explore
          </button>
          <button
            onClick={() => handleOpenAuthModal(true)}
            className="hidden sm:block"
          >
            Write
          </button>
          <button onClick={() => handleOpenAuthModal(false)}>Login</button>
          <button
            onClick={() => handleOpenAuthModal(true)}
            className="rounded-full bg-gray-950 px-4 py-2 text-gray-100 hover:opacity-80"
          >
            Get Started
          </button>
        </div>
      </nav>
      <main className="relative flex w-full flex-col justify-start border-y-[1px] border-black bg-gray-100 font-PT text-gray-900 duration-700 md:h-[84vh] md:flex-row">
        <div
          style={{ backgroundColor: `rgb(${backgroundColor},0.3)` }}
          className="flex flex-col items-start justify-center gap-6 p-4 py-10 md:border-r-[1px] md:border-black md:px-24"
        >
          <h1 className="text-5xl leading-tight md:text-[7vw]">
            Your story matters
          </h1>
          <p className="text-xl opacity-80">
            Share your unique stories with a global audience. Join us today and
            make an impact with your words.
          </p>
          <button
            className="w-36 rounded-full bg-black px-4 py-2 text-gray-100"
            onClick={() => handleOpenAuthModal(true)}
          >
            Start Reading
          </button>
        </div>
        <BlogsPreview
          sliderIndex={sliderIndex}
          backgroundColor={backgroundColor}
        />
      </main>
      <footer className="flex h-[8vh] w-full items-center justify-center gap-6 overflow-hidden border-y-[1px] border-black bg-gray-100 px-4 font-semibold text-gray-900 md:border-none">
        <button onClick={() => handleOpenAuthModal(true)}>Blog</button>
        <button
          onClick={() => handleOpenAuthModal(true)}
          className="hidden md:block"
        >
          Write
        </button>
        <button>Terms</button>
        <button>Polices</button>
        <button onClick={() => handleOpenAuthModal(false)}>Signin</button>
        <button onClick={() => handleOpenAuthModal(true)}>Signup</button>
      </footer>

      {isAuthModalVisable && (
        <>
          <div
            onClick={handleCloseAuthModal}
            className="fixed left-0 top-0 z-30 h-screen w-screen bg-gray-100 opacity-95"
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
    </div>
  );
}
