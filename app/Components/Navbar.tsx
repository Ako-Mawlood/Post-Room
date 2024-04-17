import { CgEricsson } from "react-icons/cg";
import NavLink from "./NavLink"
import Link from "next/link"
const Navbar = () => {
  return (
    <nav className="flex h-20 items-center px-1 text-xs sm:text-base font-Satoshi justify-between border-b">
        <div className="flex text-sm sm:text-3xl">
            <CgEricsson size={30}/>
            <h1 className="text-xs md:text-base font-bold sm:block text-center">Post Room</h1>
        </div>

        <div className="flex justify-between sm:w-3/12 lg:w-2/12">
            <NavLink href="/" LinkText="Home" />
            <NavLink href="/Explore" LinkText="Explore" />
            <NavLink href="/About" LinkText="About" />
        </div>

        <div className="flex justify-evenly font-semibold">
            <Link className="bg-primary text-gray-100 mx-2 p-1 rounded hover:opacity-80" href="/sign-up" >Sign up</Link>
            <Link className="bg-primary text-gray-100 p-1 rounded hover:opacity-80" href="/sign-in" >Sign in</Link>
        </div>
    </nav>

)
}

export default Navbar