import Image from "next/image"
import Link from "next/link"
import {Button} from "./Components/ui/button"
const NotFound = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full h-screen p-5 bg-background">
      <Image
        className="w-full md:w-2/3 md:order-2 dark:opacity-85"
        src="/assets/not-found.svg"
        width={800}
        height={500}
        alt="Not-found"
      />
      <div className="flex flex-col items-center md:w-1/3 text-center gap-4 font-semibold text-gray-800 dark:text-gray-100">
        <h1 className="text-3xl md:text-5xl">Page Not Found</h1>
        <p>Sorry, We couldn't find this page.</p>
        <Link href="/blogs">
          <Button>Back to home page</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
