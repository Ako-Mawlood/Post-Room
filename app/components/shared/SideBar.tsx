"use client";

import React, { useEffect } from "react";
import UserCategories from "./UserCategories";
import WhoToFollow from "./WhoToFollow";
import Search from "../pages/search/Search";

import BlogEditorIntro from "./BlogEditorIntro";

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

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const contentHeight = container.getBoundingClientRect().height;
      const sideBarTop = sideBar.getBoundingClientRect().top + scrollTop;

      if (scrollTop >= contentHeight - viewportHeight + sideBarTop) {
        container.style.transform = `translateY(-${
          contentHeight - viewportHeight + sideBarTop
        }px)`;
        container.style.position = "fixed";
      } else {
        container.style.transform = "";
        container.style.position = "";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <aside className="sidebar order-1 hidden w-full flex-col gap-5 md:order-2 md:flex md:w-[27rem]">
      <div className="container flex w-[27rem] flex-col gap-5">
        <Search />
        <BlogEditorIntro />
        <WhoToFollow />

        <UserCategories />
        <div className="h-10"></div>
      </div>
    </aside>
  );
};

export default SideBar;
