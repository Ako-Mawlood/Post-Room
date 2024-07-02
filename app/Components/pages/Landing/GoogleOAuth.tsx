"use client"

import Image from "next/image"
import {usePathname, useRouter} from "next/navigation"
const GoogleOAuth = () => {
  const pathname = usePathname()
  const router = useRouter()
  function handleClick() {
    router.push(
      `https://accounts.google.com/o/oauth2/auth?redirect_uri=http://localhost:3000/auth/session/callback&response_type=token&client_id=1021972391921-i0n0nr2fgje2ml9fqi1ccjunel82dl3d.apps.googleusercontent.com&scope=openid%20email%20profile`
    )
  }
  return (
    <button
      onClick={handleClick}
      className="flex justify-center w-full px-4 py-2 rounded-full bg-transparent border border-gray-200 hover:bg-gray-100 duration-150"
    >
      <Image
        src={`/assets/google.svg`}
        width={20}
        height={20}
        alt={"icon"}
        className="size-7 mr-auto text-black"
      />
      <span className="mr-auto">Sign in with Google</span>
    </button>
  )
}

export default GoogleOAuth
