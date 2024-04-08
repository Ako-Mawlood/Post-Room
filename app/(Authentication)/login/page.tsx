import AuthFeild from "@/app/Components/AuthFeild";
import Link from "next/link";
import { handleLogin } from "@/app/actions/loginUser";
import FeaturesPreview from "@/app/Components/FeaturesPreview";

export const metadata = {
  title: "Post-Room | Login ",
};

const login = () => {
  return (
    <div className="flex">
      <Link
        href="/"
        className="absolute top-4 left-3 text-primary md:text-white font-Oswald text-lg"
      >
        Post-Room
      </Link>
      <FeaturesPreview />

      <aside className="w-screen md:w-4/6 lg:w-1/2  bg-gray-50 h-screen flex justify-center items-center">
        <AuthFeild isLoginPage={true} actionFunc={handleLogin} />
      </aside>
    </div>
  );
};

export default login;
