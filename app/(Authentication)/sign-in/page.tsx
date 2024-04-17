import AuthLayout from "@/app/Components/AuthLayout";
import Link from "next/link";
import FeaturesPreview from "@/app/Components/FeaturesPreview";
import { CgEricsson } from "react-icons/cg";
import Slider from "@/app/Components/Slider";

export const metadata = {
  title: "Post-Room | Login",
};

const signIn = () => {
  return (
    <div className="flex">
         <div className="flex absolute top-3 left-2 md:text-gray-200 text-blacfont-bold text-sm sm:text-base">
            <CgEricsson size={20}/>
            <Link href="/" className="font-bold">Post Room</Link>
         </div>


      <aside className="hidden text-gray-200 md:flex justify-center flex-col items-center w-1/2 h-screen bg-black border-r-[0.1px] border-r-gray-800 selection:bg-[#EDEDED] selection:text-primary">
        <h1 className="text-center text-slate-200 bold mb-10 font-Oswald text-2xl">
          Acquire knowledge; it&apos;s an ornament among friends and armor against
          enemies.
        </h1>
        <Slider>
          <FeaturesPreview />
        </Slider>
      </aside>

      <aside className="w-full md:w-4/6 lg:w-1/2 bg-[#EDEDED] h-screen flex justify-center items-center">
        <AuthLayout isLoginPage={true} />
      </aside>
    </div>
  );
};

export default signIn;
