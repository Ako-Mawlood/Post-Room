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
