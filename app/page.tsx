"use client"

import SigninModal from "./Components/pages/Landing/SigninModal"
import SignupModal from "./Components/pages/Landing/SignupModal"
import {backgroundColors} from "@/StaticData/backgroundColors"
import {useState} from "react"
import BlogsPreview from "./Components/pages/Landing/BlogsPreview"
import useSlider from "./Hooks/useSlider"
import Link from "next/link"
import {IoIosClose as CloseIcon} from "react-icons/io"
import clsx from "clsx"
import {CgEricsson} from "react-icons/cg"

export default function LandingPage() {
  const [isNewUser, setIsNewUser] = useState(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isAuthModalVisable, setIsAuthModalVisable] = useState(false)
  const {sliderIndex} = useSlider(6)
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
    <div className="bg-gray-50 text-gray-900">
      <nav className="flex justify-between items-center w-full h-[8vh] px-4 md:px-24 py-1">
        <Link href="/" className="flex items-center font-bold text-lg sm:text-2xl">
          <CgEricsson size={25} />
          <h1>Post-Room</h1>
        </Link>
        <div className="flex gap-6 font-semibold">
          <button onClick={() => handleOpenAuthModal(true)} className="hidden sm:block">
            Explore
          </button>
          <button onClick={() => handleOpenAuthModal(true)} className="hidden sm:block">
            Write
          </button>
          <button onClick={() => handleOpenAuthModal(false)}>Login</button>
          <button
            onClick={() => handleOpenAuthModal(true)}
            className="bg-gray-950 rounded-full px-4 py-2 text-gray-100 hover:opacity-80"
          >
            Get Started
          </button>
        </div>
      </nav>
      <main className="flex flex-col md:flex-row justify-start w-full md:h-[84vh] relative border-y-[1px] border-black duration-700 font-PT">
        <div
          style={{backgroundColor: `rgb(${backgroundColor},0.3)`}}
          className="flex flex-col gap-6 justify-center items-start p-4 py-10 md:px-24 md:border-r-[1px] md:border-black"
        >
          <h1 className="text-5xl md:text-[7vw] leading-tight">Your story matters</h1>
          <p className="text-xl opacity-80">
            Share your unique stories with a global audience. Join us today and make an impact with your
            words.
          </p>
          <button
            className="w-36 bg-black px-4 py-2 rounded-full text-gray-100 "
            onClick={() => handleOpenAuthModal(true)}
          >
            Start Reading
          </button>
        </div>
        <BlogsPreview sliderIndex={sliderIndex} backgroundColor={backgroundColor} />
      </main>
      <footer className="flex justify-center items-center gap-6 h-[8vh] w-full px-4 font-semibold border-y-[1px] border-black md:border-none bg-gray-100 overflow-hidden">
        <button onClick={() => handleOpenAuthModal(true)}>Blog</button>
        <button onClick={() => handleOpenAuthModal(true)} className="hidden md:block">
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
            className="w-screen h-screen fixed top-0 left-0 bg-gray-50 opacity-95 z-30"
          ></div>
          <main
            className={clsx(
              "flex justify-center items-center w-full md:w-[678px] h-full fixed md:absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md shadow-gray-400  z-40",
              {"modal-open-animation": isAuthModalOpen, "modal-close-animation": !isAuthModalOpen}
            )}
          >
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
    </div>
  )
}
