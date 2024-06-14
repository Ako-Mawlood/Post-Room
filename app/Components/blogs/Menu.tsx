import {Button} from "../ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card"
import {PiNotePencilLight as WriteIcon} from "react-icons/pi"
import {IoPersonOutline as ProfileIcon} from "react-icons/io5"
import {IoBookmarkOutline as BookmarkIcon, IoSettingsOutline as SettingsIcon} from "react-icons/io5"
import {Dispatch, SetStateAction, useEffect, useRef} from "react"
import Link from "next/link"

interface menuPropType {
  setIsMenuVisable: Dispatch<SetStateAction<boolean>>
}
const Menu = ({setIsMenuVisable}: menuPropType) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleRemoveMenu(e: MouseEvent) {
      if (menuRef.current && !menuRef.current?.contains(e.target as Node)) setIsMenuVisable(false)
    }
    window.addEventListener("mousedown", handleRemoveMenu)
    return () => window.removeEventListener("mousedown", handleRemoveMenu)
  }, [])

  return (
    <Card
      ref={menuRef}
      className="flex flex-col justify-start items-start w-64 absolute right-6 top-16 p-0 text-gray-500 modal-open-animation font-sans"
    >
      <CardHeader className="w-full">
        <CardTitle className="h-7 text-black truncate">Sangar Mawlood</CardTitle>
        <CardDescription className="truncate">sangar.mawlood@gmail.com</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start px-0 py-2 w-full border-y border-gray-300">
        <Button className="flex gap-3 w-full justify-start " variant="ghost">
          <ProfileIcon size={20} />
          <Link className="" href="/profile">
            Profile
          </Link>
        </Button>

        <Button className="flex gap-3 w-full justify-start " variant="ghost">
          <WriteIcon size={20} />
          <Link className="" href="/write">
            Write blog
          </Link>
        </Button>

        <Button className="flex gap-3 w-full justify-start " variant="ghost">
          <BookmarkIcon size={20} />
          <Link className="" href="/profile">
            Saved blogs
          </Link>
        </Button>

        <Button className="flex gap-3 w-full justify-start " variant="ghost">
          <SettingsIcon size={20} />
          <Link className="" href="/settings">
            Settings
          </Link>
        </Button>
      </CardContent>
      <CardFooter className="py-2 px-0 w-full">
        <Button className="w-full" variant="ghost">
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Menu
