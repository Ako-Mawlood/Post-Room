"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkType {
  href: string;
  LinkText: string;
}

const NavLink = ({ href, LinkText }: LinkType) => {
  const pathname = usePathname();

  return (
    <Link className={pathname === href ? "font-bold" : ""} href={href}>
      {LinkText}
    </Link>
  );
};

export default NavLink;
