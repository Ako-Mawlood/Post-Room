"use client";

import React, { useEffect } from "react";
import UserCategories from "./UserCategories";
import WhoToFollow from "./WhoToFollow";
import Search from "../pages/search/Search";

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

      // Adjust with an offset to make sure the last element is fully visible
      const offsetPadding = 20; // Add space to prevent clipping
      const totalOffset =
        contentHeight - viewportHeight + sideBarTop + offsetPadding;

      if (scrollTop >= totalOffset) {
        container.style.transform = `translateY(-${totalOffset - sideBarTop}px)`;
        container.style.position = "fixed";
      } else {
        container.style.transform = "";
        container.style.position = "";
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup scroll event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <aside className="sidebar order-1 mb-5 hidden w-full flex-col gap-5 p-5 md:order-2 md:flex md:w-[27rem]">
      <div className="container flex w-[27rem] flex-col gap-5">
        <Search />
        <WhoToFollow />
        <UserCategories />
        <WhoToFollow />
        <UserCategories />
        <div className="h-6 w-full"></div>
      </div>
    </aside>
  );
};

export default SideBar;
