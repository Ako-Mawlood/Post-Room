import { getCookie, setCookie } from "cookies-next";
import Link from "next/link";
import React, { useState } from "react";
import { X } from "lucide-react";

const BlogEditorIntro = () => {
  const isIntro = getCookie("blogEditor") || "true";
  const [showIntro, setShowIntro] = useState(isIntro);

  const handleCloseIntro = () => {
    setShowIntro("false");
    setCookie("blogEditor", false);
  };

  if (showIntro === "false") return null;

  return (
    <div
      className="relative flex w-full flex-col gap-6 rounded-xl bg-cover bg-center p-6 text-primary-foreground"
      style={{ backgroundImage: "url('/images/bg-card.png')" }}
    >
      <div className="absolute inset-0 rounded-xl bg-black bg-opacity-30 text-white"></div>
      <button
        onClick={handleCloseIntro}
        className="absolute right-3 top-3 z-10 font-bold text-white"
      >
        <X size={20} />
      </button>
      <h1 className="z-10 font-sans text-xl font-bold text-white">
        Post-Room's Blog Editor!
      </h1>
      <div className="z-10 text-white">
        <h3 className="font-semibold">Create Your Own Blog in No Time</h3>
        <p className="text-sm opacity-90">
          We've made it super easy for you to write and publish your blogs with
          our new, user-friendly editor. Start sharing your ideas with the world
          today!
        </p>
      </div>
      <button
        onClick={handleCloseIntro}
        className="z-10 w-2/3 self-center rounded-full bg-white p-1 text-base font-semibold text-blue-950 backdrop-blur"
      >
        <Link href="/create ">Start Writing Now</Link>
      </button>
    </div>
  );
};

export default BlogEditorIntro;
