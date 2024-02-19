import { BsStars } from "react-icons/bs";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex ml-3 justify-between  items-center w-[98%] absolute top-3 left-0 z-50">
        
        <div className="flex  lg:text-xl font-extrabold text-darkPurple">
            <BsStars scale={23} size={23} />
            <h1 >Post Room</h1>
        </div>
        <ul className="flex justify-evenly gap-1 text-sm sm:text-xs    w-[26%] text-darkPurple">
            <Link href="/">Features</Link>
            <Link href="/explore">Explore</Link>
            <Link href="/pricing">Pricing</Link>
        </ul>
        <Link href="/sign-in" className=" text-sm md:text-md  sm:px-4 text-white py-1.5 rounded-xl  font-bold bg-purple text-center ">Sign in</Link>
    </div>
  )
}

export default Navbar