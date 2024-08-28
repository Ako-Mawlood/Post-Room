"use client";

import { useRouter } from "next/navigation";
import { IconType } from "react-icons/lib";
const OAuthBtn = ({
  isNewUser,
  name,
  href,
  color,
  Icon,
}: {
  isNewUser: boolean;
  name: string;
  href: string;
  color: string;
  Icon: IconType;
}) => {
  const router = useRouter();

  function handleRedirect() {
    router.push(href);
  }
  return (
    <button
      onClick={handleRedirect}
      className="flex w-full items-center justify-center rounded-full border border-gray-200 bg-transparent px-4 py-2 duration-150 hover:bg-gray-100"
    >
      <Icon className="mr-auto size-8" style={{ color: color }} />
      {isNewUser ? (
        <span className="mr-auto">Sign up with {name}</span>
      ) : (
        <span className="mr-auto">Sign in with {name}</span>
      )}
    </button>
  );
};

export default OAuthBtn;
//      `https://accounts.google.com/o/oauth2/auth?redirect_uri=http://localhost:3000/auth/session/callback&response_type=token&client_id=1021972391921-i0n0nr2fgje2ml9fqi1ccjunel82dl3d.apps.googleusercontent.com&scope=openid%20email%20profile`,
