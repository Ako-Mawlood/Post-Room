"use client"

import { backgroundColors } from "@/StaticData/backgroundColors"
import logo from "../public/Icons/logo.svg"
import Image from "next/image"
import { Button } from "./Components/ui/button"
import BlogsPreview from "./Components/pages/Landing/BlogsPreview"
import useSlider from "./Hooks/useSlider"
import Link from "next/link"

export default function LandingPage() {
  const { sliderIndex } = useSlider(6)
  const backgroundColor = backgroundColors[sliderIndex]

  return (
    <>
      <nav className="flex justify-between items-center w-screen h-[8vh] px-4 md:px-24 py-1 bg-gray-100">
        <Link href="/" className="flex items-center font-bold text-lg sm:text-2xl">
          <Image
            src={logo}
            alt="Post-Room logo"
          />
          <h1>Post-Room</h1>
        </Link>
        <div className="flex text-gray-800">
          <Button variant="ghost" className="hidden sm:block">Explore</Button>
          <Button variant="ghost" className="hidden sm:block">Write</Button>
          <Button variant={"ghost"}>Login</Button>
          <Button>Get Started</Button>
        </div>
      </nav>
      <main className="flex flex-col md:flex-row justify-start w-full md:h-[84vh] relative border-y-[1px] border-black duration-700 font-Pt selection:text-gray-200 selection:bg-gray-800">
        <div style={{ backgroundColor: `rgb(${backgroundColor},0.3)` }} className="flex flex-col gap-6 justify-center items-start p-4 py-10 md:px-24 md:border-r-[1px] md:border-black">
          <h1 className="text-5xl md:text-[7vw] leading-tight">Your story matters</h1>
          <p className='text-xl opacity-80'>Share your unique stories with a global audience. Join us today and make an impact with your words.</p>
          <Button className="w-36">Get started</Button>
        </div>
        <BlogsPreview sliderIndex={sliderIndex} backgroundColor={backgroundColor} />
      </main>
      <footer className="flex justify-center items-center h-[8vh] w-screen px-4 border-y-[1px] border-black md:border-none bg-gray-100 overflow-hidden">
        <Button variant="ghost">Blog</Button>
        <Button variant="ghost" className="hidden md:block">Write</Button>
        <Button variant="ghost">Terms</Button>
        <Button variant="ghost">Polices</Button>
        <Button variant="ghost">Signin</Button>
        <Button variant="ghost">Signup</Button>
      </footer>
    </>
  )
}