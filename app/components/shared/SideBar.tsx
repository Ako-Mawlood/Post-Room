"use client";

import React, { useEffect } from "react";
import UserCategories from "./UserCategories";
import WhoToFollow from "./WhoToFollow";
import Search from "@/app/components/pages/search/Search";
import BlogEditorIntro from "./BlogEditorIntro";
import TopBlogs from "./TopBlogs";

const SideBar = () => {
  useEffect(() => {
    const container = document.querySelector(
      ".container",
    ) as HTMLElement | null;
    const sideBar = document.querySelector(".sidebar") as HTMLElement | null;

    if (!container || !sideBar) {
      console.error("Container or sidebar element not found.");
      return;
    }

    // Function to check if screen width is at least `md`
    const isMdScreen = () => window.innerWidth >= 768;

    const handleScroll = () => {
      if (!isMdScreen()) {
        // Reset styles if the screen is smaller than `md`
        container.style.position = "";
        container.style.width = "";
        return;
      }

      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const contentHeight = container.getBoundingClientRect().height;
      const sideBarTop = sideBar.getBoundingClientRect().top + scrollTop;
      const sideBarWidth = sideBar.getBoundingClientRect().width;

      if (scrollTop >= contentHeight - viewportHeight + sideBarTop) {
        container.style.transform = `translateY(-${
          contentHeight - viewportHeight + sideBarTop
        }px)`;
        container.style.position = "fixed";
        container.style.width = `${sideBarWidth}px`;
      } else {
        container.style.transform = "";
        container.style.position = "";
        container.style.width = "";
      }
    };

    const handleResize = () => {
      if (!isMdScreen()) {
        // Reset styles when resizing to smaller screens
        container.style.position = "";
        container.style.width = "";
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <aside className="sidebar order-1 flex w-full flex-col gap-5 md:order-2 md:w-[27rem]">
      <div className="container flex w-full flex-col gap-5 p-0">
        <Search />
        <div className="hidden flex-col gap-5 md:flex">
          <BlogEditorIntro />
          <WhoToFollow />
          <TopBlogs />
          <UserCategories />
          <div className="h-10"></div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
