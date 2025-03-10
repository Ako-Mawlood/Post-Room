"use client";

import SigninModal from "@/app/components/pages/Landing/SigninModal";
import SignupModal from "@/app/components/pages/Landing/SignupModal";
import { useState } from "react";
import BlogsPreview from "@/app/components/pages/Landing/BlogShowcase";
import FeatureShowcase from "@/app/components/pages/Landing/FeatureShowcase";
import Link from "next/link";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import useSlider from "./Hooks/useSlider";
import { backgroundColors } from "@/constants/backgroundColors";
import Logo from "@/app/components/ui/Logo";
import DescriptionSection from "@/app/components/pages/Landing/DescriptionSection";
import NavbarUnauthorized from "@/app/components/shared/NavbarUnauthorized";

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
      <NavbarUnauthorized handleOpenAuthModal={handleOpenAuthModal} />

      <BlogsPreview handleOpenAuthModal={handleOpenAuthModal} />
      <DescriptionSection
        handleOpenAuthModal={handleOpenAuthModal}
        backgroundColor={backgroundColor}
      />

      <FeatureShowcase />

      <section
        style={{ backgroundColor: `rgb(${backgroundColor},0.3)` }}
        className="flex w-full flex-col items-center justify-center gap-6 border-y border-black p-8 text-center md:mt-10 md:h-80 md:gap-14"
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
          <Link href="/policy">Policy</Link>
          <Link href="/terms">Terms</Link>
          <button onClick={() => handleOpenAuthModal(false)}>Signin</button>
          <button onClick={() => handleOpenAuthModal(true)}>Signup</button>
        </div>
      </footer>

      {/* Auth modal */}
      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent className="flex h-full items-center justify-center bg-white p-0 md:p-8">
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
