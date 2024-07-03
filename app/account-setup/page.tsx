import UsernameSetup from "../Components/pages/account-setup/UsernameSetup"
import FullNameSetup from "../Components/pages/account-setup/FullNameSetup"
import CategorySetup from "../Components/pages/account-setup/CategorySetup"
import {CgEricsson as Logo} from "react-icons/cg"
import axiosInstance from "@/libs/axiosInstance"
import {getCookie} from "cookies-next"
import {cookies} from "next/headers"
import {currentUserType} from "../types/currentUserType"
async function getCurrentUser() {
  const res = await axiosInstance("/api/me", {headers: {Authorization: getCookie("token", {cookies})}})
  return res.data
}
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
