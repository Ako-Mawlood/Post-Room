"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
const GoogleOAuth = ({ isNewUser }: { isNewUser: boolean }) => {
  const router = useRouter();
  function handleClick() {
    router.push(
      `https://accounts.google.com/o/oauth2/auth?redirect_uri=http://localhost:3000/auth/session/callback&response_type=token&client_id=1021972391921-i0n0nr2fgje2ml9fqi1ccjunel82dl3d.apps.googleusercontent.com&scope=openid%20email%20profile`,
    );
  }
  return (
    <button
      onClick={handleClick}
      className="flex w-full items-center justify-center rounded-full border border-gray-200 bg-transparent px-4 py-2 duration-150 hover:bg-gray-100"
    >
      <Image
        src={`/assets/google.svg`}
        width={20}
        height={20}
        alt={"icon"}
        className="mr-auto size-7 text-black"
      />
      {isNewUser ? (
        <span className="mr-auto">Sign up with Google</span>
      ) : (
        <span className="mr-auto">Sign in with Google</span>
      )}
    </button>
  );
};

export default GoogleOAuth;
