import UsernameSetup from "../Components/pages/account-setup/UsernameSetup"
import FullNameSetup from "../Components/pages/account-setup/FullNameSetup"
import CategorySetup from "../Components/pages/account-setup/CategorySetup"
import {CgEricsson as Logo} from "react-icons/cg"
import {currentUserType} from "../types/currentUserType"
import {getCurrentUser} from "@/libs/getCurrentUser"

const CreateAcount = async ({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | undefined}
}) => {
  const currentUser: currentUserType = await getCurrentUser()
  const setupStep = searchParams.setupStep || "fullname"

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex items-center mb-14 text-primary font-bold font-PT text-4xl">
        <Logo size={35} />
        <h1>Post-Room</h1>
      </div>
      {setupStep === "fullname" && <FullNameSetup currentUser={currentUser} />}
      {setupStep === "username" && <UsernameSetup currentUser={currentUser} />}
      {setupStep === "category" && <CategorySetup />}
    </div>
  )
}

export default CreateAcount
