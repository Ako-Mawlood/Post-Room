import EmailPasswordInputs from "../Components/registeration/EmailPasswordInputs"
export default function SignIn() {
  return(
   <div className="">
    <div className="w-1/2 absolute top-0 right-0 h-full bg-darkPurple"></div>
    <div className="w-1/2 absolute top-0 left-0 h-full">
      <EmailPasswordInputs />

    </div>
  </div>
  )
}
