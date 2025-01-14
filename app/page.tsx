"use client";

import SigninModal from "./components/pages/Landing/SigninModal";
import SignupModal from "./components/pages/Landing/SignupModal";
import { backgroundColors } from "@/constants/backgroundColors";
import { useState } from "react";
import BlogsPreview from "./components/pages/Landing/BlogsPreview";
import useSlider from "./Hooks/useSlider";
import Link from "next/link";
import clsx from "clsx";
import { CgEricsson } from "react-icons/cg";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/app/components/ui/dialog";

// Utility function for dynamic background colors
const getNavbarBackgroundColor = (sliderIndex: number) =>
  `rgb(${backgroundColors[sliderIndex]},0.07)`;
const getMainBackgroundColor = (sliderIndex: number) =>
  `rgb(${backgroundColors[sliderIndex]},0.3)`;

export default function LandingPage() {
  const [isNewUser, setIsNewUser] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { sliderIndex } = useSlider(6);

  // Handlers for the authentication modal
  function handleOpenAuthModal(isNewUser: boolean) {
    setIsNewUser(isNewUser);
    setIsAuthModalOpen(true);
  }

  function handleCloseAuthModal() {
    setIsAuthModalOpen(false);
  }

  return (
    <div className="bg-neutral-50 text-black">
      {/* Navbar */}
      <nav
        style={{ backgroundColor: getNavbarBackgroundColor(sliderIndex) }}
        className="flex h-[5.5rem] w-full items-center justify-between p-6"
      >
        <Link
          href="/"
          className="flex items-center text-lg font-bold sm:text-2xl"
        >
          <CgEricsson size={25} />
          <h1>Post-Room</h1>
        </Link>

        <div className="flex gap-4 text-sm font-light">
          <button
            onClick={() => handleOpenAuthModal(true)}
            className="rounded-full border border-black px-4 py-2"
          >
            Sign in
          </button>
          <button
            onClick={() => handleOpenAuthModal(false)}
            className="rounded-full bg-black px-4 py-2 text-white"
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <main className="relative flex w-full flex-col justify-between border-y-[1px] border-black bg-gray-100 md:h-[70vh] md:flex-row">
        <section
          style={{ backgroundColor: getMainBackgroundColor(sliderIndex) }}
          className="flex h-full flex-grow flex-col items-start justify-between gap-6 p-10 py-10 md:border-r-[1px] md:border-black"
        >
          <h1 className="mt-4 font-PT text-6xl text-neutral-900 md:text-[5.5rem]">
            Your story matters
          </h1>
          <div className="flex max-w-[35rem] flex-col gap-10">
            <p className="text-xl font-light text-neutral-700 md:text-2xl">
              Share your unique stories with the world. Become a part of our
              community today and inspire readers everywhere with your powerful
              words.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleOpenAuthModal(false)}
                className="rounded-full bg-black px-4 py-2 text-white"
              >
                Start reading
              </button>
              <button
                onClick={() => handleOpenAuthModal(true)}
                className="rounded-full border border-black px-4 py-2"
              >
                Create blog
              </button>
            </div>
          </div>
        </section>
        <BlogsPreview
          sliderIndex={sliderIndex}
          backgroundColor={backgroundColors[sliderIndex]}
        />
      </main>

      {/* Footer */}
      <footer
        style={{ backgroundColor: getNavbarBackgroundColor(sliderIndex) }}
        className="flex h-[8vh] w-full items-center justify-center gap-6 overflow-hidden border-b-[1px] border-black bg-gray-100 px-4 font-semibold text-gray-900 md:border-none"
      >
        <Link href="/terms">Terms</Link>
        <Link href="/privacy-policy">Privacy</Link>
      </footer>

      {/* Auth modal */}
      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogOverlay className="fixed bg-white bg-opacity-95" />
        <DialogContent
          className={clsx(
            "flex h-full items-center justify-center bg-white md:max-w-[40rem]",
          )}
        >
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
    </div>
  );
}
