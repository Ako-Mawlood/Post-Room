"use client"

import { CgEricsson } from "react-icons/cg";
import NavLink from "./NavLink";
import Link from "next/link";
import { useState, useContext } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";
import { currentUserContext } from "./CurrentUserContextProvider";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCookie } from "cookies-next";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const currentUser = useContext(currentUserContext)
    const router = useRouter()
    const token = localStorage.getItem("token")
    console.log(currentUser)
    console.log(getCookie("token"))
    console.log(token)

    const toggleMenu = () => {
        setShowMenu(prevShowMenu => !prevShowMenu);
    };

    return (
        <nav className="flex h-20 items-center justify-between px-5 text-xs sm:text-base border-b">
            <FiMenu onClick={toggleMenu} className="md:hidden cursor-pointer" size={30} />

            {showMenu && (
                <div className={clsx("flex flex-col items-start justify-start h-screen fixed top-0 left-0 z-50 opcity-[0.98] bg-slate-50 duration-150", {
                    "w-screen animate-grow": showMenu,
                    "duration-300": !showMenu
                })}>
                    <div className="flex w-full h-20 items-center border-b-2 border-gray-200">
                        <div className="ml-auto flex">
                            <CgEricsson className="text-blue-600" size={30} />
                            <h1 className="font-bold text-lg">Post Room</h1>
                        </div>
                        <IoClose
                            className="ml-auto mr-4 cursor-pointer"
                            onClick={toggleMenu} size={30}
                        />
                    </div>

                    <div onClick={toggleMenu} className={clsx("flex flex-col justify-between animate-show translate-y-[15px] mr-auto m-5 font-normal h-44 text-2xl", {
                        "opacity-100 duration-500": showMenu,
                        "opacity-0 duration-500": !showMenu
                    })}>
                        <NavLink href="/" LinkText="Home" />
                        <NavLink href="/explore" LinkText="Explore" />
                        <NavLink href="/about" LinkText="About" />
                        {token ? <button onClick={() => { localStorage.removeItem("token"); revalidatePath("/"); router.push("/sign-in") }} className="p-2 bg-black text-center text-gray-100 rounded-lg">Log out</button> :
                            <>
                                <NavLink href="/sign-in" LinkText="Sign in" />
                                <NavLink href="/sign-up" LinkText="Sign up" />
                            </>
                        }
                    </div>
                </div>
            )}
            <div className="flex md:mx-0 text-sm sm:text-3xl">
                <CgEricsson className="text-blue-600" size={30} />
                <h1 className="text-base font-bold text-center">Post Room</h1>
            </div>
            <div className="hidden md:flex mx-auto">
                <NavLink href="/" LinkText="Home" />
                <NavLink href="/explore" LinkText="Explore" />
                {currentUser && <NavLink href="/add" LinkText="Add" />}
            </div>
            {token ? (
                <Link href="/profile" className="bg-black text-white size-10 flex justify-center items-center rounded-full text-center font-semibold text-lg cursor-poiner">
                    {currentUser?.email.slice(0, 1).toUpperCase()}
                </Link>

            )
                :
                (
                    <div className="hidden md:flex justify-between items-center text-lg font-semibold">
                        <Link className="text-gray-500 text-center md:mr-2" href="/sign-in">
                            Sign in
                        </Link>
                        <Link className="text-blue-500 mx-2 p-2 border-2 border-blue-500 rounded duration-100 hover:bg-blue-500 hover:text-gray-50" href="/sign-up">
                            Create account
                        </Link>
                    </div>
                )
            }
        </nav >
    );
};

export default Navbar;
