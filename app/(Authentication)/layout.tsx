
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

      <aside className="hidden text-slate-200 md:flex justify-center flex-col items-center w-1/2 h-screen bg-gray-950 selection:bg-[#EDEDED] selection:text-primary">
        <h1 className="text-center font-bold mb-10 w-3/4 font-Oswald text-3xl">
          &quot;The strongest among you is the one who controls his anger.&quot; - Prophet Muhammad
        </h1>

        <FeaturesPreview />

      </aside>
      {children}
    </div>
  )
}

export default AuthLayout