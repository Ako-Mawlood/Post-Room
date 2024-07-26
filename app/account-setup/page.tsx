import UsernameSetup from "../components/pages/account-setup/UsernameSetup";
import FullNameSetup from "../components/pages/account-setup/FullNameSetup";
import CategorySetup from "../components/pages/account-setup/CategorySetup";
import { CgEricsson as Logo } from "react-icons/cg";
import { currentUserType } from "../types/currentUserType";
import { getCurrentUser } from "@/libs/getCurrentUser";

const CreateAcount = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const currentUser: currentUserType = await getCurrentUser();
  const setupStep = searchParams.setupStep || "fullname";

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

export default CreateAcount;
