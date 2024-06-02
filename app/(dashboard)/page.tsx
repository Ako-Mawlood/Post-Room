"use client"

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import BlogsPreview from '../Components/pages/Home/BlogsPreview';
import { CgEricsson } from "react-icons/cg";
import Link from 'next/link';
import { IoPauseCircleOutline, IoPlayCircleOutline } from "react-icons/io5";

export default function HomePage() {
  const qouteRef = useRef(null)
  const discriptionRef = useRef(null)
  const [isVisable, setIsVisable] = useState(false)
  const [isVideoPlayed, setIsVideoPlayed] = useState(true)
  const videoRef = useRef<any | HTMLVideoElement>()

  useEffect((() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entrie => {
        setIsVisable(entrie.isIntersecting)
      })
    }, { threshold: 0.5 })
    if (qouteRef.current) observer.observe(qouteRef.current)
    if (discriptionRef.current) observer.observe(discriptionRef.current)
  }), [])
  function handleVideoPlay() {
    if (isVideoPlayed) {
      videoRef.current?.pause()
    } else {
      videoRef.current?.play()
    }
  }
  return (
    <>
      <BlogsPreview />

      <section ref={discriptionRef} className={clsx("flex flex-col justify-center mx-3 sm:mx-auto sm:w-4/5 md:w-7/12 text-center h-screen", {
        "opacity-100 duration-700": isVisable,
        "opacity-0": !isVisable
      })}>
        <div className='flex self-center font-semibold text-4xl mb-4'>
          <CgEricsson className='text-blue-600 animate-pulse' size={40} />
          <h1>Post Room</h1>
        </div>
        <p className="text-xl text-gray-800 leading-tight mt-2 md:text-[2.5vw]">Post Room offers curated <span className="underline underline-offset-4 decoration-blue-500">articles</span> and <span className="underline underline-offset-4 decoration-blue-500">blogs</span> each weaving into a realm where storytelling intertwines with profound ideas.</p>
      </section>

      <section className="flex flex-col md:flex-row md:h-[80vh] items-start md:items-center md:justify-around mb-96 p-10 border border-slate-200 shadow-sm bg-[#ebeaea]">
        <Image
          className="w-full h-full md:w-1/2 lg:w-5/12 rounded-lg md:order-2"
          src={"https://static-web.grammarly.com/1e6ajr2k4140/75IFN2KXay95QcYR7usTWp/b23584807f2575942964c54bfcd6dfdf/Group_625989.png?w=768&fm=webp"}
          alt="artimage"
          width={800}
          height={850}
        />
        <div className="flex flex-col md:w-1/2 justify-between text-gray-700 font-semibold p-5 md:p-10">
          <h1 className="text-2xl md:text-[3vw] leading-none">Share Your Voice, Start Your Blog Today</h1>
          <p className='my-6 text-sm md:text-lg text-gray-600'>Share your unique stories with a global audience. Join us today and make an impact with your words.</p>
          <Link className='w-36 px-2 py-3 rounded-full text-center font-bold bg-blue-500 text-white hover:opacity-90' href="/">Get started</Link>
        </div>
      </section>
      <section className="md:w-5/6 md:rounded-3xl mx-auto h-[90vh] relative text-gray-50 bg-black">
        <div className="absolute top-0 z-10 bg-black h-full md:rounded-3xl w-full opacity-60"></div>
        <video ref={videoRef} onPlaying={() => setIsVideoPlayed(true)} onPause={() => setIsVideoPlayed(false)} className="w-full blur-sm h-[90vh] md:rounded-3xl object-cover z-0" src="/studing.MOV" loop autoPlay muted ></video>
        <div className="flex flex-col w-3/4 sm:w-1/2 absolute top-1/2 left-[10%] -translate-y-1/2 z-30">
          <h1 className='text-3xl md:text-7xl font-semibold'>Dive Into Study Resources, Read and Achieve More</h1>
          <p className='md:text-lg my-4'>Start exploring our wide range of study materials. Each page brings you closer to success. Delve into curated content, empower your journey. Find your cozy spot, learn, and thrive.</p>
          <Link className='w-36 text-center text-lg font-bold rounded-full text-gray-800 bg-gray-100 py-2 hover:opacity-90' href="/">Start reading</Link>
        </div>
        <button onClick={handleVideoPlay} className='absolute bottom-5 right-5 text-gray-200 cursor-pointer z-50'>
          {isVideoPlayed ?
            <IoPauseCircleOutline size={65} /> :
            <IoPlayCircleOutline size={65} />
          }
        </button>
      </section>

      <section ref={qouteRef} className={clsx("flex flex-col justify-center mx-3 md:mx-auto w-full md:w-1/2 text-center h-screen", {
        "opacity-100 duration-700": isVisable,
        "opacity-0": !isVisable
      })}>
        <h1 className="text-5xl text-gray-800">Raise your words, not voice. It is rain that grows flowers, not thunder.</h1>
        <p className="self-end font-semibold mr-9 text-blue-700 text-xl">Rumi</p>
      </section>
    </>
  );
}