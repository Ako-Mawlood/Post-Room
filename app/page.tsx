"use client"

import logo from "../public/Icons/logo.svg"
import Image from "next/image"
import { Button } from "./Components/ui/button"
import BlogsPreview from "./Components/pages/Landing/BlogsPreview"
import useSlider from "./Hooks/useSlider.ts"

export default function LandingPage() {
  const { sliderIndex } = useSlider(6)
  const backgroundColors = [
    "247, 247, 247",
    "238,148,229",
    "178,214,141",
    "238,148,229",
    "253, 210, 119",
    "182,201,217"
  ];
  const backgroundColor = backgroundColors[sliderIndex]

  return (
    <>
      <nav className="flex justify-between items-center w-screen h-[8vh] px-4 md:px-24 bg-gray-100">
        <div className="flex items-center font-bold text-xl sm:text-2xl">
          <Image
            src={logo}
            alt="Post-Room logo"
          />
          <h1>Post-Room</h1>
        </div>
        <div className="flex text-gray-800">
          <Button variant="ghost" className="hidden sm:block">Explore</Button>
          <Button variant="ghost" className="hidden sm:block">Write</Button>
          <Button variant={"ghost"}>Login</Button>
          <Button>Get Started</Button>
        </div>
      </nav>
      <main className="w-full relative font-Pt">
        <section className="flex flex-col md:flex-row justify-between md:h-[84vh] w-screen border-y-[1px] border-black duration-700">
          <div style={{ backgroundColor: `rgb(${backgroundColor},0.3)` }} className="flex flex-col gap-6 py-10 sm:py-20 px-4 md:px-24 md:border-r-[1px] md:border-black">
            <h1 className="text-5xl md:text-[7vw] leading-tight">Your story matters</h1>
            <p className='text-xl opacity-80'>Share your unique stories with a global audience. Join us today and make an impact with your words.</p>
            <Button className="w-36">Get started</Button>
          </div>
          <BlogsPreview sliderIndex={sliderIndex} backgroundColor={backgroundColor} />
        </section>
        <footer className="hidden md:flex justify-center items-center h-[8vh] w-screen bottom-0 left-0 text-gray-700 bg-gray-100">
          <Button variant="ghost">Help</Button>
          <Button variant="ghost">Explore</Button>
          <Button variant="ghost">Terms</Button>
          <Button variant="ghost">Polices</Button>
          <Button variant="ghost">Signin</Button>
          <Button variant="ghost">Signup</Button>
        </footer>
      </main>
    </>
  )
}