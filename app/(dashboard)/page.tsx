"use client"

import Image from 'next/image';
import ArtImage from '../../public/ArtImage.jpg';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import BlogsPreview from '../Components/pages/Home/BlogsPreview';
import { CgEricsson } from "react-icons/cg";
import Link from 'next/link';

export default function HomePage() {
  const qouteRef = useRef(null)
  const introRef = useRef(null)
  const [isVisable, setIsVisable] = useState(false)

  useEffect((() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entrie => {
        setIsVisable(entrie.isIntersecting)
      })
    }, { threshold: 0.5 })
    if (qouteRef.current) observer.observe(qouteRef.current)
    if (introRef.current) observer.observe(introRef.current)
  }), [])

  return (
    <>

      <BlogsPreview />

      <section ref={introRef} className={clsx("flex flex-col justify-center mx-2 sm:mx-auto sm:w-4/5 md:w-3/5 text-center my-56", {
        "opacity-100 duration-500": isVisable,
        "opacity-0": !isVisable
      })}>
        <div className='flex self-center font-semibold text-4xl mb-4'>
          <CgEricsson className='text-blue-600 animate-pulse' size={40} />
          <h1>Post Room</h1>
        </div>

        <p className="text-xl text-gray-700 leading-10 md:text-[2vw] font-semibold">Post Room offers curated <span className="underline underline-offset-2">articles</span>, <span className="underline underline-offset-2">blogs</span> an <span className="underline underline-offset-2">quotes</span>, each weaving into a realm where storytelling intertwines with profound ideas.</p>

      </section >

      <section className="w-screen h-screen bg-gray-500 relative text-gray-50">
        <div className="absolute top-0 z-10 bg-black h-full w-full opacity-60"></div>
        <video className="w-full h-full object-cover blur z-0" src="/video.mp4" loop autoPlay muted ></video>
        <div className="flex flex-col w-3/4 sm:w-1/2 absolute top-1/2 left-[10%] -translate-y-1/2 z-50">
          <h1 className='text-3xl md:text-5xl font-semibold'>Recent Discoveries in Black Hole Physics</h1>
          <p className='my-4'>Explore recent revelations about black holes in this guide. From breakthroughs to simplified insights, understanding black holes is made easy for all.</p>
          <Link className='w-36 text-center text-lg font-bold rounded-full text-gray-800 bg-gray-50 py-2' href="/">Read blog</Link>
        </div>
      </section>

      <section className="flex flex-col md:flex-row mt-10 px-2 justify-around items-center text-gray-800">
        <div className="md:w-5/12 flex flex-col justify-center items-center gap-10 md:gap-20 text-center transition-opacity duration-500">
          <h1 className="font-semibold text-3xl md:text-[2.5vw] leading-none">Welcome to Post Room Where Words Weave the Fabric of Inspiration</h1>
        </div>
        <Image
          className="md:w-1/3 bg-gray-900 rounded-xl"
          src={ArtImage}
          alt="art image"
          width={500}
          height={500}
          placeholder="blur"
        />
      </section>

      <section ref={qouteRef} className={clsx("flex flex-col justify-center mx-auto w-full md:w-1/2 text-center my-80", {
        "opacity-100 duration-700": isVisable,
        "opacity-0": !isVisable

      })}>

        <h1 className="text-5xl text-gray-800">Raise your words, not voice. It is rain that grows flowers, not thunder.</h1>
        <p className="self-end font-semibold text-black mr-10 text-xl">Rumi</p>
      </section >
    </>
  );
}
