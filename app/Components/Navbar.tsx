import { BsStars } from "react-icons/bs";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full absolute top-3 left-0 z-50">
        
        <div className="flex ml-4 text-xl font-extrabold text-darkPurple">
            <BsStars scale={23} size={23} />
            <h1 >Post Room</h1>
        </div>
        <ul className="flex justify-evenly  text-sm w-[26%] text-darkPurple">
            <Link href="/">Features</Link>
            <Link href="/explore">Explore</Link>
            <Link href="/pricing">Pricing</Link>
        </ul>
        <button className="w-24 text-white py-1.5 rounded-xl mr-4  font-bold bg-purple text-center ">Sign in</button>
    </div>
  )
}

export default Navbar