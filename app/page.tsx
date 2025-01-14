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
  `rgb(${backgroundColors[sliderIndex]},0.15)`;
const getMainBackgroundColor = (sliderIndex: number) =>
  `rgb(${backgroundColors[sliderIndex]},0.3)`;

export default function LandingPage() {
  const [isNewUser, setIsNewUser] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { sliderIndex } = useSlider(6);

  // Button configuration with dynamic grouping

  // Grouped buttons

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
        className="flex h-[8vh] w-full items-center justify-between px-4 py-1 md:px-24"
      >
        <Link
          href="/"
          className="flex items-center text-lg font-bold sm:text-2xl"
        >
          <CgEricsson size={25} />
          <h1>Post-Room</h1>
        </Link>

        <div className="flex gap-6 text-sm font-light">
          <button
            onClick={() => handleOpenAuthModal(true)}
            className="rounded-full border border-black px-4 py-1.5"
          >
            Sign in
          </button>
          <button
            onClick={() => handleOpenAuthModal(false)}
            className="rounded-full border-black bg-black px-4 py-1.5 text-white"
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <main className="relative flex w-full flex-col justify-start border-y-[1px] border-black bg-gray-100 font-PT md:h-[65vh] md:flex-row">
        <div
          style={{ backgroundColor: getMainBackgroundColor(sliderIndex) }}
          className="flex flex-col items-start justify-center gap-6 p-4 py-10 md:border-r-[1px] md:border-black md:px-24"
        >
          <h1 className="text-5xl leading-tight md:text-[7vw]">
            Your story matters
          </h1>
          <p className="text-xl opacity-80">
            Share your unique stories with the world. Join our community today
            and inspire others with your words.
          </p>

          <button
            onClick={() => handleOpenAuthModal(true)}
            className="button-shine"
          >
            Start Reading
          </button>
        </div>
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
