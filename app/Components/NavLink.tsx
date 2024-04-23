"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkType {
  href: string;
  LinkText: string;
}

const NavLink = ({ href, LinkText }: LinkType) => {
  const pathname = usePathname();

  return (
    <Link className={clsx("ml-4 sm:ml-0 hover:underline hover:underline-offset-4 duration-300", { 'font-bold': href == pathname })}
      href={href}>
      {LinkText}
    </Link>
  );
};

export default NavLink;
