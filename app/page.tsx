"use client"

import SigninModal from "./Components/pages/Landing/auth/SigninModal"
import SignupModal from "./Components/pages/Landing/auth/SignupModal"
import { backgroundColors } from "@/StaticData/backgroundColors"
import { useState } from "react"
import logo from "../public/Icons/logo.svg"
import Image from "next/image"
import { Button } from "./Components/ui/button"
import BlogsPreview from "./Components/pages/Landing/BlogsPreview"
import useSlider from "./Hooks/useSlider"
import Link from "next/link"
import { IoIosClose as CloseIcon } from "react-icons/io"
import clsx from "clsx"

export default function LandingPage() {
  const [isNewUser, setIsNewUser] = useState(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isAuthModalVisable, setIsAuthModalVisable] = useState(false)
  const { sliderIndex } = useSlider(6)
  const backgroundColor = backgroundColors[sliderIndex]

  function handleOpenAuthModal(isNewUser: boolean) {
    setIsNewUser(isNewUser)
    setIsAuthModalVisable(true)
    setIsAuthModalOpen(true)
  }

  function handleCloseAuthModal() {
    setIsAuthModalOpen(false)
    setTimeout(() => {
      setIsAuthModalVisable(false)
    }, 190)
  }

  return (
    <>
      <nav className="flex justify-between items-center w-screen h-[8vh] px-4 md:px-24 py-1 bg-gray-100">
        <Link href="/" className="flex items-center font-bold text-lg sm:text-2xl">
          <Image src={logo} alt="Post-Room logo" />
          <h1>Post-Room</h1>
        </Link>
        <div className="flex gap-2 text-gray-800">
          <Button onClick={() => handleOpenAuthModal(true)} variant="ghost" className="hidden sm:block">
            Explore
          </Button>
          <Button onClick={() => handleOpenAuthModal(true)} variant="ghost" className="hidden sm:block">
            Write
          </Button>
          <Button onClick={() => handleOpenAuthModal(false)} variant={"ghost"}>
            Login
          </Button>
          <Button onClick={() => handleOpenAuthModal(true)}>Get Started</Button>
        </div>
      </nav>
      <main className="flex flex-col md:flex-row justify-start w-full md:h-[84vh] relative border-y-[1px] border-black duration-700 font-PT selection:text-gray-200 selection:bg-gray-800">
        <div
          style={{ backgroundColor: `rgb(${backgroundColor},0.3)` }}
          className="flex flex-col gap-6 justify-center items-start p-4 py-10 md:px-24 md:border-r-[1px] md:border-black">
          <h1 className="text-5xl md:text-[7vw] leading-tight">Your story matters</h1>
          <p className="text-xl opacity-80">
            Share your unique stories with a global audience. Join us today and make an impact with your words.
          </p>
          <Button className="w-36" onClick={() => handleOpenAuthModal(true)}>
            Start Reading
          </Button>
        </div>
        <BlogsPreview sliderIndex={sliderIndex} backgroundColor={backgroundColor} />
      </main>
      <footer className="flex justify-center items-center h-[8vh] w-screen px-4 border-y-[1px] border-black md:border-none bg-gray-100 overflow-hidden">
        <Button variant="ghost" onClick={() => handleOpenAuthModal(true)}>
          Blog
        </Button>
        <Button variant="ghost" onClick={() => handleOpenAuthModal(true)} className="hidden md:block">
          Write
        </Button>
        <Button variant="ghost">Terms</Button>
        <Button variant="ghost">Polices</Button>
        <Button variant="ghost" onClick={() => handleOpenAuthModal(false)}>
          SignIn
        </Button>
        <Button variant="ghost" onClick={() => handleOpenAuthModal(true)}>
          Signup
        </Button>
      </footer>

      {isAuthModalVisable && (
        <>
          <div
            onClick={handleCloseAuthModal}
            className="w-screen h-screen fixed top-0 left-0 bg-gray-50 opacity-95 z-30"></div>
          <main
            className={clsx(
              "flex justify-center items-center w-full md:w-[678px] h-full fixed md:absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md shadow-gray-300 border-x z-40",
              { "modal-open-animation": isAuthModalOpen, "modal-close-animation": !isAuthModalOpen }
            )}>
            <CloseIcon
              className="size-12 absolute top-2 right-2 p-2 cursor-pointer text-gray-500 hover:text-gray-950"
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
  )
}
