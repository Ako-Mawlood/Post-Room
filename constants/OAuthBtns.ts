import { FcGoogle as Google } from "react-icons/fc";
import { IconType } from "react-icons/lib";
// import {
//   RiFacebookBoxFill as Facebook,
//   RiAppleFill as Apple,
// } from "react-icons/ri";
// import { FaXTwitter as X } from "react-icons/fa6";

type oAuthBtnsType = {
  id: number;
  href: string;
  icon: IconType;
  name: string;
  color: string;
}[];

export const oAuthBtns: oAuthBtnsType = [
  {
    id: 1,
    href: `https://accounts.google.com/o/oauth2/auth?redirect_uri=https://post-room.vercel.app/auth/session/callback&response_type=token&client_id=470120195082-ttpbl4443g713hog435cpqptde3urrgk.apps.googleusercontent.com&scope=openid%20email%20profile`,
    icon: Google,
    name: "Google",
    color: "",
  },
  // {
  //   id: 2,
  //   href: "/facebook",
  //   icon: Facebook,
  //   name: "Facebook",
  //   color: "#1877F2",
  // },
  // {
  //   id: 3,
  //   href: `/`,
  //   icon: X,
  //   name: "X",
  //   color: "#000000",
  // },
  // {
  //   id: 4,
  //   href: "/",
  //   icon: Apple,
  //   name: "Apple",
  //   color: "#111111",
  // },
];
