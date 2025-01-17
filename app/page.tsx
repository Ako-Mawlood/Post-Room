"use client";

import SigninModal from "./components/pages/Landing/SigninModal";
import SignupModal from "./components/pages/Landing/SignupModal";
import { useState } from "react";
import BlogsPreview from "./components/pages/Landing/BlogShowcase";
import FeatureShowcase from "./components/pages/Landing/FeatureShowcase";
import clsx from "clsx";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/app/components/ui/dialog";
import useSlider from "./Hooks/useSlider";
import { backgroundColors } from "@/constants/backgroundColors";
import Logo from "./components/ui/Logo";
import DescriptionSection from "@/app/components/pages/Landing/DescriptionSection";

export default function LandingPage() {
  const [isNewUser, setIsNewUser] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { sliderIndex } = useSlider(6);
  const backgroundColor = backgroundColors[sliderIndex];
  // Handlers for the authentication modal
  function handleOpenAuthModal(isNewUser: boolean) {
    setIsNewUser(isNewUser);
    setIsAuthModalOpen(true);
  }

  function handleCloseAuthModal() {
    setIsAuthModalOpen(false);
  }

  return (
    <div className="relative bg-neutral-50 text-neutral-900">
      {/* Navbar */}
      <nav className="sticky left-0 top-0 z-50 flex h-[5.5rem] w-full items-center justify-between border-b border-black bg-neutral-50 bg-opacity-90 p-6 backdrop-blur">
        <Logo href="#" />

        <div className="flex gap-4 text-sm font-light">
          <button
            onClick={() => handleOpenAuthModal(false)}
            className="rounded-full border border-black px-4 py-2"
          >
            Sign in
          </button>
          <button
            onClick={() => handleOpenAuthModal(true)}
            className="black-btn"
          >
            Sign up
          </button>
        </div>
      </nav>

      <BlogsPreview handleOpenAuthModal={handleOpenAuthModal} />
      <DescriptionSection
        handleOpenAuthModal={handleOpenAuthModal}
        backgroundColor={backgroundColor}
      />

      <FeatureShowcase />

      <section
        style={{ backgroundColor: `rgb(${backgroundColor},0.3)` }}
        className="flex w-full flex-col items-center justify-center gap-6 border-y border-black bg-yellow-400 p-8 text-center md:mt-10 md:h-80 md:gap-14"
      >
        <h1 className="font-PT text-5xl md:text-6xl">
          Learn something new everyday
        </h1>
        <button onClick={() => handleOpenAuthModal(true)} className="black-btn">
          Get Started
        </button>
      </section>

      <footer className="flex flex-col items-center justify-between gap-4 px-6 py-4 sm:flex-row">
        <div className="flex flex-col items-center">
          <Logo href="#" className="text-base" />
          <p className="text-xs">
            © {new Date().getFullYear()} Post-Room. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="text flex gap-2 text-xs underline sm:self-end">
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <button onClick={() => handleOpenAuthModal(false)}>Signin</button>
          <button onClick={() => handleOpenAuthModal(true)}>Signup</button>
        </div>
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
