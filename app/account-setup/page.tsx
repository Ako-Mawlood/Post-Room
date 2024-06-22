import UsernameSetup from "../Components/pages/account-setup/UsernameSetup"
import FullNameSetup from "../Components/pages/account-setup/FullNameSetup"
import CatagorySetup from "../Components/pages/account-setup/CatagorySetup"
import {CgEricsson as Logo} from "react-icons/cg"

const CreateAcount = ({searchParams}: {searchParams: any}) => {
  const setupStep = searchParams.setupStep || "username"

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="flex items-center absolute top-4 left-1/2 -translate-x-1/2 mb-14 text-primary font-bold font-PT text-4xl">
        <Logo size={35} />
        <h1>Post-Room</h1>
      </div>
      {setupStep === "username" && <UsernameSetup />}
      {setupStep === "fullname" && <FullNameSetup />}
      {setupStep === "catagory" && <CatagorySetup />}
    </div>
  )
}

export default CreateAcount
