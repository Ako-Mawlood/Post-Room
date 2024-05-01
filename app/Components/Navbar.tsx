"use client"

import { CgEricsson } from "react-icons/cg";
import NavLink from "./NavLink";
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    console.log(showMenu);
    const isRegistered = true;

    const toggleMenu = () => {
        setShowMenu(prevShowMenu => !prevShowMenu);
    };

    return (
        <nav className="flex h-20 items-center justify-between px-2 md:px-5 text-xs sm:text-base border-b">
            <FiMenu onClick={toggleMenu} className="md:hidden cursor-pointer" size={30} />

            {showMenu && (
                <div className={clsx("flex flex-col items-start justify-center h-screen fixed top-0 left-0 z-50 opacity-[0.98] duration-300", {
                    "w-screen animate-grow": showMenu,
                    "duration-300": !showMenu
                })}>
                    <div className="flex w-full h-15 mb-auto items-center border-b-2 border-gray-200">
                        <div className="ml-auto flex">
                            <CgEricsson className="text-blue-600" size={30} />
                            <h1 className="font-bold text-lg">Post Room</h1>
                        </div>
                        <IoClose
                            className="ml-auto cursor-pointer"
                            onClick={toggleMenu} size={30}
                        />
                    </div>

                    <div className="flex flex-col justify-between mb-auto text-2xl font-semibold mx-auto">
                        <NavLink href="/" LinkText="Home" />
                        <NavLink href="/explore" LinkText="Explore" />
                        <NavLink href="/ebout" LinkText="About" />
                        <NavLink href="/sign-in" LinkText="Sign in" />
                        <NavLink href="/sign-up" LinkText="Sign up" />
                    </div>




                </div>
            )}
            <div className="flex md:mx-0 text-sm sm:text-3xl">
                <CgEricsson className="text-blue-600" size={30} />
                <h1 className="text-base font-bold text-center">Post Room</h1>
            </div>
            <div className="hidden md:flex justify-between mx-auto w-3/12">
                <NavLink href="/" LinkText="Home" />
                <NavLink href="/explore" LinkText="Explore" />
                <NavLink href="/ebout" LinkText="About" />
            </div>
            {isRegistered ? (
                <Link href="/profile" className="p-2 bg-black text-white text-center font-bold rounded-full cursor-poiner">
                    AM
                </Link>
            ) : (
                <div className="hidden md:flex justify-evenly font-semibold">
                    <Link className="bg-primary text-gray-100 mx-2 p-1 rounded hover:opacity-80" href="/sign-up">
                        Sign up
                    </Link>
                    <Link className="bg-primary text-gray-100 p-1 rounded hover:opacity-80" href="/sign-in">
                        Sign in
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
