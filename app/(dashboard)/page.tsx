"use client"

import Image from 'next/image';
import moon from '../../public/moon.jpeg';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import BlogsPreview from '../Components/pages/Home/BlogsPreview';
import { CgEricsson } from "react-icons/cg";
import Link from 'next/link';
export default function HomePage() {
  const qouteRef = useRef(null)
  const discriptionRef = useRef(null)
  const [isVisable, setIsVisable] = useState(false)

  useEffect((() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entrie => {
        setIsVisable(entrie.isIntersecting)
      })
    }, { threshold: 0.75 })
    if (qouteRef.current) observer.observe(qouteRef.current)
    if (discriptionRef.current) observer.observe(discriptionRef.current)
  }), [])

  return (
    <>

      <BlogsPreview />

      <section ref={discriptionRef} className={clsx("flex flex-col justify-center mx-3 sm:mx-auto sm:w-4/5 md:w-7/12 text-center my-56", {
        "opacity-100 duration-700": isVisable,
        "opacity-0": !isVisable
      })}>
        <div className='flex self-center font-semibold text-4xl mb-4'>
          <CgEricsson className='text-blue-600 animate-pulse' size={40} />
          <h1>Post Room</h1>
        </div>

        <p className="text-xl text-gray-700 leading-10 md:text-[2vw] font-semibold">Post Room offers curated <span className="underline underline-offset-2">articles</span>, <span className="underline underline-offset-2">blogs</span> an <span className="underline underline-offset-2">quotes</span>, each weaving into a realm where storytelling intertwines with profound ideas.</p>

      </section >

      <section className="w-full h-screen bg-gray-500 relative text-gray-50">
        <div className="absolute top-0 z-10 bg-black h-full w-full opacity-60"></div>
        <video className="w-full h-full object-cover z-0 shadow-none" src="/video.mp4" loop autoPlay muted ></video>
        <div className="flex flex-col w-3/4 sm:w-1/2 absolute top-1/2 left-[10%] -translate-y-1/2 z-30">
          <h1 className='text-3xl md:text-5xl font-semibold'>Recent Discoveries in Black Hole Physics</h1>
          <p className='my-4'>Explore recent revelations about black holes in this guide. From breakthroughs to simplified insights, understanding black holes is made easy for all.</p>
          <Link className='w-36 text-center text-lg font-bold rounded-full text-gray-800 bg-gray-100 py-2 hover:opacity-90' href="/">Read blog</Link>
        </div>
      </section>


      <section ref={qouteRef} className={clsx("flex flex-col justify-center mx-auto w-full md:w-1/2 text-center my-80", {
        "opacity-100 duration-700": isVisable,
        "opacity-0": !isVisable

      })}>

        <h1 className="text-5xl text-gray-800">Raise your words, not voice. It is rain that grows flowers, not thunder.</h1>
        <p className="self-end font-semibold text-blue-700 mr-10 text-xl">Rumi</p>
      </section>

      <section className="flex flex-col md:flex-row md:h-[80vh] items-start md:items-center mx-3 my-10 md:w-11/12 md:mx-auto mt-10 rounded-[30px] bg-black">
        <Image
          className="w-full h-full md:w-1/2 rounded-[30px] md:order-2"
          src={moon}
          alt="artimage"
          width={800}
          height={850}
          placeholder='blur'

        />
        <div className="flex flex-col md:w-1/2 justify-between text-gray-200 font-semibold p-5 md:p-10">
          <h1 className="text-2xl md:text-[2.5vw] leading-none">Welcome to Post Room Where Words Weave the Fabric of Inspiration</h1>
          <p className='my-6 text-sm text-gray-300'>We're building social experiences that keep your account secure and give you the power to make choices around how your data is used.</p>
          <Link className='w-28 px-1 py-2 rounded-full text-center font-semibold text-white bg-blue-500 text-gray-40 hover:opacity-90' href="/">Read blog</Link>
        </div>

      </section>
    </>
  );
}
