import Link from "next/link";
import AuthFeild from "@/app/Components/AuthFeild";
import { handleSignIn } from "@/app/actions/sginInUser";
import FeaturesPreview from "@/app/Components/FeaturesPreview";
export const metadata = {
  title: "Post-Room | Create account ",
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
      <FeaturesPreview />

      <aside className="w-screen md:w-4/6 lg:w-1/2 bg-gray-50 h-screen flex justify-center items-center">
        <AuthFeild isLoginPage={false} actionFunc={handleSignIn} />
      </aside>
    </div>
  );
};

export default signIn;
