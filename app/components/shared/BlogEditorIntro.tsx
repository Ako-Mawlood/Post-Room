import { getCookie, setCookie } from "cookies-next";
import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
      className="relative flex w-full flex-col gap-3 rounded-xl border border-border bg-cover bg-center p-5 text-primary-foreground"
      style={{ backgroundImage: "url('/images/bg-card.png')" }}
    >
      <div className="absolute inset-0 rounded-xl bg-black bg-opacity-70 text-white"></div>
      <button
        onClick={handleCloseIntro}
        className="absolute right-2 top-2 z-10 font-bold text-white"
      >
        <X size={20} />
      </button>
      <h1 className="z-10 font-sans text-xl font-bold text-white">
        Post-Room&apos;s Blog Editor!
      </h1>
      <div className="z-10 text-white">
        <h3 className="font-semibold">Create Your Own Blog in No Time</h3>
        <p className="text-sm opacity-90">
          We&apos;ve made it super easy for you to write and publish your blogs
          with our new, user-friendly editor. Start sharing your ideas with the
          world today!
        </p>
      </div>
      <button className="z-10 w-full self-center rounded-full bg-white p-1 text-sm font-semibold text-blue-950 backdrop-blur hover:bg-opacity-95">
        <Link href="/create">Start Writing Now</Link>
      </button>
    </div>
  );
};
export default BlogEditorIntro;
