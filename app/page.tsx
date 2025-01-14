"use client";

import SigninModal from "./components/pages/Landing/SigninModal";
import SignupModal from "./components/pages/Landing/SignupModal";
import { backgroundColors } from "@/constants/backgroundColors";
import { useRef, useState } from "react";
import BlogsPreview from "./components/pages/Landing/BlogsPreview";
import useSlider from "./Hooks/useSlider";
import Link from "next/link";
import { IoIosClose as CloseIcon } from "react-icons/io";
import clsx from "clsx";
import { CgEricsson } from "react-icons/cg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function LandingPage() {
  const path = useRef<SVGPathElement>(null);
  useGSAP(() => {
    gsap.from("#text-container > *", {
      filter: "blur(5px)",
      scrollTrigger: {
        trigger: "#text-container > *",
        start: "top 90%",
        end: "top top",
        scrub: 1,
      },
      y: 100,
      x: -20,
      opacity: 0,
      duration: 1,
      stagger: 0.5,
    });
    gsap.set(path.current, {
      strokeDashoffset: path.current?.getTotalLength(),
      strokeDasharray: path.current?.getTotalLength(),
    });
    gsap.to(path.current, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: "#draw-line",
        start: "center center",
      },
    });
  }, []);

  const [isNewUser, setIsNewUser] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthModalVisable, setIsAuthModalVisable] = useState(false);
  const { sliderIndex } = useSlider(6);
  const backgroundColor = backgroundColors[sliderIndex];

  function handleOpenAuthModal(isNewUser: boolean) {
    setIsNewUser(isNewUser);
    setIsAuthModalOpen(true);
    setIsAuthModalVisable(true);
  }

  function handleCloseAuthModal() {
    setIsAuthModalOpen(false);
    setIsAuthModalVisable(false);
    setTimeout(() => {}, 190);
  }

  return (
    <div className="bg-neutral-50 text-neutral-950 selection:bg-gray-800 selection:text-gray-50">
      <nav
        style={{ backgroundColor: `rgb(${backgroundColor},0.1)` }}
        className="flex h-[10vh] w-full items-center justify-between px-4 py-1 text-gray-900 md:px-24"
      >
        <Link
          href="/"
          className="flex items-center font-PT text-lg font-bold sm:text-2xl"
        >
          <CgEricsson size={25} />
          <h1>Post-Room</h1>
        </Link>

        <div className="flex gap-6 font-semibold">
          <button
            onClick={() => handleOpenAuthModal(true)}
            className="hidden sm:block"
          >
            Explore
          </button>
          <button
            onClick={() => handleOpenAuthModal(true)}
            className="hidden sm:block"
          >
            Write
          </button>
          <button onClick={() => handleOpenAuthModal(false)}>Login</button>
          <button
            onClick={() => handleOpenAuthModal(true)}
            className="button-shine h-10"
          >
            Sign up
          </button>
        </div>
      </nav>
      <main className="relative flex w-full flex-col justify-start border-y-[1px] border-black bg-gray-100 font-PT text-gray-900 duration-700 md:h-[75vh] md:flex-row">
        <div
          style={{ backgroundColor: `rgb(${backgroundColor},0.3)` }}
          className="flex flex-col items-start justify-center gap-6 p-4 py-10 md:border-r-[1px] md:border-black md:px-24"
        >
          <h1 className="text-5xl leading-tight md:text-[7vw]">
            Your story matters
          </h1>
          <p className="text-xl opacity-80">
            Share your unique stories with a global audience. Join us today and
            make an impact with your words.
          </p>

          <button
            className="button-shine"
            onClick={() => handleOpenAuthModal(true)}
          >
            Start Reading
          </button>
        </div>
        <BlogsPreview
          sliderIndex={sliderIndex}
          backgroundColor={backgroundColor}
        />
      </main>
      <section
        style={{ backgroundColor: `rgb(${backgroundColor},0.1)` }}
        className="center p-20"
      >
        <h1 className="border-black font-PT text-5xl text-neutral-800">
          We connect talented bloggers with a global audience, fostering a
          community of writers and readers from around the world.
        </h1>
      </section>
      <section
        style={{ backgroundColor: `rgb(${backgroundColor},0.1)` }}
        className="w-full border bg-neutral-100 p-20"
      >
        <h1 className="font-PT text-7xl text-black">
          A blog platform for everyone
        </h1>

        <div
          id="text-container"
          className="relative z-20 flex w-[60rem] flex-col gap-20 p-20"
        >
          <h1 id="text" className="font-PT text-7xl text-black">
            <span className="text-9xl font-semibold">01</span> Don&apos;t need
            to pay anymore
          </h1>
          <h1 id="text" className="font-PT text-7xl text-black">
            <span className="text-9xl font-semibold">02</span> create your own
            blog post
          </h1>
          <h1 id="text" className="font-PT text-7xl text-black">
            <span className="text-9xl font-semibold">03</span> Got stuck on
            something ? don&apos;t panic read our blogs
          </h1>
        </div>
      </section>

      <footer className="flex h-[8vh] w-full items-center justify-center gap-6 overflow-hidden border-y-[1px] border-black bg-gray-100 px-4 font-semibold text-gray-900 md:border-none">
        <button onClick={() => handleOpenAuthModal(true)}>Blog</button>
        <button
          onClick={() => handleOpenAuthModal(true)}
          className="hidden md:block"
        >
          Write
        </button>
        <Link href="/terms">Terms</Link>
        <Link href="/privacy-policy">Privacy</Link>
        <button onClick={() => handleOpenAuthModal(false)}>Signin</button>
        <button onClick={() => handleOpenAuthModal(true)}>Signup</button>
      </footer>

      {isAuthModalVisable && (
        <>
          <div
            onClick={handleCloseAuthModal}
            className="fixed left-0 top-0 z-30 h-screen w-screen bg-gray-100 opacity-95"
          ></div>
          <main
            className={clsx(
              "fixed left-1/2 top-1/2 z-40 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white shadow-md shadow-gray-400 md:absolute md:w-[678px]",
              {
                "modal-open-animation": isAuthModalOpen,
                "modal-close-animation": !isAuthModalOpen,
              },
            )}
          >
            <CloseIcon
              className="absolute right-2 top-2 size-12 cursor-pointer p-2 text-gray-500 hover:text-gray-950"
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
  );
}
