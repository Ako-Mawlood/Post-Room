import AuthField from "@/app/Components/AuthField";
import Link from "next/link";
import FeaturesPreview from "@/app/Components/FeaturesPreview";
import Slider from "@/app/Components/Slider";

export const metadata = {
  title: "Post-Room | Login",
};

const signIn = () => {
  return (
    <div className="flex">
      <Link
        href="/"
        className="absolute top-4 left-3 text-primary md:text-white font-Oswald text-lg"
      >
        Post-Room
      </Link>

      <aside className="hidden text-gray-200 md:flex justify-center flex-col items-center w-1/2 h-screen bg-primary border-r-[0.1px] border-r-gray-800 selection:bg-[#EDEDED] selection:text-primary">
        <h1 className="text-center text-slate-200 bold mb-10 font-Oswald text-2xl">
          Acquire knowledge; it&apos;s an ornament among friends and armor against
          enemies.
        </h1>
        <Slider>
          <FeaturesPreview />
        </Slider>
      </aside>

      <aside className="w-full md:w-4/6 lg:w-1/2 bg-[#EDEDED] h-screen flex justify-center items-center">
        <AuthField isLoginPage={true} />
      </aside>
    </div>
  );
};

export default signIn;
