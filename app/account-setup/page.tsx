import UsernameSetup from "../components/pages/account-setup/UsernameSetup";
import FullNameSetup from "../components/pages/account-setup/FullNameSetup";
import CategorySetup from "../components/pages/account-setup/CategorySetup";
import { CgEricsson as Logo } from "react-icons/cg";
import { currentUserType } from "../types/currentUserType";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import axiosInstance from "@/libs/axiosInstance";

async function getCurrentUser() {
  const token = getCookie("token", { cookies });
  const res = await axiosInstance("/api/me", {
    headers: { Authorization: token },
  });
  return res.data;
}

const CreateAccount = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const currentUser: currentUserType = await getCurrentUser();
  const setupStep = searchParams.setupStep || "fullname";
  if (!currentUser) return;
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-14 flex items-center font-PT text-4xl font-bold text-primary">
        <Logo size={35} />
        <h1>Post-Room</h1>
      </div>
      {setupStep === "fullname" && <FullNameSetup currentUser={currentUser} />}
      {setupStep === "username" && <UsernameSetup currentUser={currentUser} />}
      {setupStep === "category" && <CategorySetup />}
    </div>
  );
};

export default CreateAccount;
