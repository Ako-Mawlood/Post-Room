"use client";
import UsernameSetup from "@/app/components/pages/account-setup/UsernameSetup";
import FullNameSetup from "@/app/components/pages/account-setup/FullNameSetup";
import CategorySetup from "@/app/components/pages/account-setup/CategorySetup";
import { CgEricsson as Logo } from "react-icons/cg";
import { useContext } from "react";
import { CurrentUserContext } from "@/app/providers/CurrentUserProvider";

const CreateAccount = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const setupStep = searchParams.setupStep || "fullname";
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);
  console.log("hello dude ");
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
