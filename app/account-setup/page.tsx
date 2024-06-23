import UsernameSetup from "../Components/pages/account-setup/UsernameSetup"
import FullNameSetup from "../Components/pages/account-setup/FullNameSetup"
import CategorySetup from "../Components/pages/account-setup/CategorySetup"
import {CgEricsson as Logo} from "react-icons/cg"

const CreateAcount = ({searchParams}: {searchParams: any}) => {
  const setupStep = searchParams.setupStep || "username"

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex items-center mb-14 text-primary font-bold font-PT text-4xl">
        <Logo size={35} />
        <h1>Post-Room</h1>
      </div>
      {setupStep === "username" && <UsernameSetup />}
      {setupStep === "fullname" && <FullNameSetup />}
      {setupStep === "category" && <CategorySetup />}
    </div>
  )
}

export default CreateAcount
