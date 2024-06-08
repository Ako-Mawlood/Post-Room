import { Dispatch, SetStateAction } from "react"
import AuthForm from "./AuthForm"
import closeIcon from "../../../../../public/Icons/close.svg"
import Image from "next/image"
interface AuthModalPropsType{
    setIsAuthModalOpen:Dispatch<SetStateAction<boolean>>
}
const AuthModal = ({setIsAuthModalOpen}:AuthModalPropsType) => {
  return (
    <>
    <div onClick={()=>setIsAuthModalOpen(false)} className="w-screen h-screen fixed top-0 left-0 bg-gray-50 opacity-95 z-30"></div>
      <main className="flex justify-center items-center w-full md:w-[678px] h-full fixed md:absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md shadow-gray-300 border-x z-40 modal-open-animation">
        <Image className=" size-10 absolute top-2 right-2 p-2 cursor-pointer" onClick={()=>setIsAuthModalOpen(false)} src={closeIcon} alt="close icon"/>
        <AuthForm isSignInPage={true} />
      </main>
      </>
  )
}

export default AuthModal