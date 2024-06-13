
import Search from "./Search"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import logo from "../../../public/Icons/logo.svg"
import { Button } from "../ui/button"
import Image from "next/image"
import { FaRegPenToSquare } from "react-icons/fa6";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center h-14 px-4 border-b border-gray-300">
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center font-bold text-md sm:text-2xl">
                    <Image src={logo} alt="Post-Room logo" />
                    <h1>Post-Room</h1>
                </Link>
                <Search />
            </div>
            <div className="flex gap-4 items-center">
                <Button variant="ghost">
                    <Link className="flex gap-2 items-center text-gray-600 font-normal" href="/">
                        <FaRegPenToSquare size={20} />
                        Write
                    </Link>
                </Button>
                <Avatar className=" cursor-pointer">
                    <AvatarImage src="https://scontent.febl5-2.fna.fbcdn.net/v/t39.30808-6/274879156_2177696605718753_4655404325092292858_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=LDZ-1TfT64AQ7kNvgEPvJNF&_nc_ht=scontent.febl5-2.fna&oh=00_AYCJP1XZLdZ3WLgvJJ4sm0igh_QZOpCnJE2osYXn1CL2FA&oe=66666DAA" />
                    <AvatarFallback>
                        SM
                    </AvatarFallback>
                </Avatar>
            </div>
        </nav>
    )
}

export default Navbar