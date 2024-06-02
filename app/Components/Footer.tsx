"use client"
import { CgEricsson, CgFacebook, CgMail } from "react-icons/cg"
import { FaTwitter } from "react-icons/fa";
import Link from "next/link"
import { FaLinkedin } from "react-icons/fa";
import { useContext } from "react";
import { currentUserContext } from "./CurrentUserContextProvider";
const Footer = () => {
    const currentUser = useContext(currentUserContext)

    return (
        <footer className="flex justify-around items-center h-20 border border-t-2 text-gray-800">
            <div className="w-1/3 sm:w-fit">
                <div className="flex md:text-3xl">
                    <CgEricsson className="text-blue-600" size={30} />
                    <h1 className="ml-2 font-bold">Post Room</h1>
                </div>
                <p className="font-semibold text-xs text-gray-600 mt-2">&copy; 2024 Post Room. All Rights Reserved.</p>

            </div>

            <div className="flex gap-3 text-xl md:text-2xl">
                <Link href="/">Home</Link>
                <Link href="/explore">Explore</Link>
                <Link href="/add" >Add</Link>
                {!currentUser &&
                    <>
                        <Link href="/sign-up" >Sign up </Link>
                        <Link href="/sign-in" >Sign in </Link>
                    </>
                }
            </div>

            <div className="flex flex-col md:flex-row cursor-pointer justify-between md:w-52 text-blue-600">
                <CgFacebook className="" size={40} />
                <FaTwitter className="" size={40} />
                <CgMail className="" size={40} />
                <FaLinkedin className="" size={40} />
            </div>
        </footer>
    )
}

export default Footer