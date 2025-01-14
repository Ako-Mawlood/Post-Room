import Image from "next/image";
import Link from "next/link";
import { Button } from "./components/ui/button";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const NotFound = () => {
  const token = getCookie("token", { cookies });

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-5 md:flex-row md:justify-between">
      <Image
        className="w-full dark:opacity-85 md:order-2 md:w-2/3"
        src="/assets/not-found.svg"
        width={800}
        height={500}
        alt="Not-found"
      />
      <div className="flex flex-col items-center gap-4 text-center font-semibold text-gray-800 dark:text-gray-100 md:w-1/3">
        <h1 className="text-3xl md:text-5xl">Page Not Found</h1>
        <p>Sorry, We couldn&apos;t find this page.</p>
        <Link href={token ? "/blogs" : "/"}>
          <Button>Back to home page</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
