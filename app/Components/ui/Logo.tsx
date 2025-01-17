import Link from "next/link";
import { CgEricsson } from "react-icons/cg";

type Props = {
  href: string;
  className?: string;
};
const Logo = ({ href, className = "md:text-2xl text-lg" }: Props) => {
  return (
    <Link href={href} className={`flex items-center font-bold ${className}`}>
      <CgEricsson />
      <h1>Post-Room</h1>
    </Link>
  );
};

export default Logo;
