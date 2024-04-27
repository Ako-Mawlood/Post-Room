import Slider from "../Hooks/useSlider"
import FeaturesPreview from "../Components/pages/Authentication/FeaturesPreview"
import Link from "next/link"
import { CgEricsson } from "react-icons/cg"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="flex absolute top-3 left-2 md:text-gray-200 text-blacfont-bold text-sm sm:text-base">
        <CgEricsson size={20} />
        <Link href="/" className="font-bold">Post Room</Link>
      </div>

      <aside className="hidden text-gray-200 md:flex justify-center flex-col items-center w-1/2 h-screen bg-black border-r-[0.1px] border-r-gray-800 selection:bg-[#EDEDED] selection:text-primary">
        <h1 className="text-center text-slate-200 bold mb-10 font-Oswald text-2xl">
          Acquire knowledge; it&apos;s an ornament among friends and armor against
          enemies.
        </h1>

        <FeaturesPreview />

      </aside>
      {children}
    </div>
  )
}

export default AuthLayout