"use client";

import SigninModal from "./components/pages/Landing/SigninModal";
import SignupModal from "./components/pages/Landing/SignupModal";
import { useState } from "react";
import BlogsPreview from "./components/pages/Landing/BlogShowcase";
import FeatureShowcase from "./components/pages/Landing/FeatureShowcase";
import Link from "next/link";
import clsx from "clsx";
import { CgEricsson } from "react-icons/cg";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/app/components/ui/dialog";
import useSlider from "./Hooks/useSlider";
import { backgroundColors } from "@/constants/backgroundColors";

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
      <nav className="sticky left-0 top-0 z-50 flex h-[5.5rem] w-full items-center justify-between border-b border-black bg-neutral-50 bg-opacity-10 p-6 backdrop-blur">
        <Link
          href="/"
          className="flex items-center text-lg font-bold sm:text-2xl"
        >
          <CgEricsson size={25} />
          <h1>Post-Room</h1>
        </Link>

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
      <section className="flex w-full items-center justify-between border-b border-black px-8 py-20">
        <p className="max-w-[50rem] text-3xl">
          We&apos;ve carved out our expertise in branding, webdesign,
          development, and crafting distinctive digital products. Our aim is
          always to empower brands that want to push boundaries, build influence
          and make their mark in the digital landscape. View more projects
        </p>
        <button
          onClick={() => handleOpenAuthModal(true)}
          className="black-btn hidden items-center gap-3 rounded-full px-6 py-3 text-lg md:flex"
        >
          Create my account
          <span className="size-3 rounded-full"></span>
        </button>
      </section>
      <FeatureShowcase />
      <section
        style={{ backgroundColor: `rgb(${backgroundColor},0.3)` }}
        className="flex h-80 w-full flex-col items-center justify-center gap-14 border-y border-black bg-yellow-400 p-8 text-center md:mt-10"
      >
        <h1 className="font-PT text-6xl">Unlock greatest blogs ever made </h1>
        <button onClick={() => handleOpenAuthModal(true)} className="black-btn">
          Get Started
        </button>
      </section>

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
