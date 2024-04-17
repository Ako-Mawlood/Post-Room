import Link from "next/link";
import AuthLayout from "@/app/Components/AuthLayout";
import FeaturesPreview from "@/app/Components/FeaturesPreview";
import Slider from "@/app/Components/Slider";
import { CgEricsson } from "react-icons/cg";
export const metadata = {
  title: "Post-Room | Create account",
};

const signUp = () => {
 
  return (
    <div className="flex">
        <div className="flex absolute top-3 left-2 md:text-gray-200 text-blacfont-bold text-sm sm:text-base">
            <CgEricsson size={20}/>
            <Link href="/" className="font-bold">Post Room</Link>
         </div>
 

      <aside className="hidden text-gray-200 md:flex justify-center flex-col items-center w-1/2 h-screen bg-black border-r-[0.1px] selection:bg-[#ffffff] selection:text-primary">
        <h1 className="text-center text-slate-200 bold mb-10 font-Oswald text-2xl">
          Acquire knowledge; it&apos;s an ornament among friends and armor against
          enemies.
        </h1>
        <Slider>
          <FeaturesPreview />
        </Slider>
      </aside>
      <aside className="w-screen md:w-4/6 lg:w-1/2 bg-[#EDEDED] h-screen flex justify-center items-center">
      <AuthLayout isLoginPage={false} />
      </aside>
    </div>
  );
};

export default signUp;
