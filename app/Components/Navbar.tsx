import { CgEricsson } from "react-icons/cg";
import NavLink from "./NavLink"
import Link from "next/link"

const Navbar = () => {
    const isRegistered = false;
    return (
        <nav className="flex h-20 items-center px-1 md:px-4 text-xs sm:text-base border-b">
            <div className="flex text-sm sm:text-3xl">
                <CgEricsson size={30} />
                <h1 className="text-xs md:text-base font-bold sm:block text-center">Post Room</h1>
            </div>

            <div className="flex justify-between mx-auto sm:w-3/12">
                <NavLink href="/" LinkText="Home" />
                <NavLink href="/explore" LinkText="Explore" />
                <NavLink href="/ebout" LinkText="About" />
            </div>
            {
                isRegistered ?
                    <Link href='/profile' className="p-2 bg-black text-white text-center font-bold rounded-full">AM</Link> :
                    <div className="flex justify-evenly font-semibold">
                        <Link className="bg-primary text-gray-100 mx-2 p-1 rounded hover:opacity-80" href="/sign-up" >Sign up</Link>
                        <Link className="bg-primary text-gray-100 p-1 rounded hover:opacity-80" href="/sign-in" >Sign in</Link>
                    </div>

            }
        </nav>

    )
}

export default Navbar