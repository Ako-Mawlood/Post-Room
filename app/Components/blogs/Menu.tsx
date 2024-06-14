// import {Button} from "../ui/button"
// import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card"
// import {PiNotePencilLight as WriteIcon} from "react-icons/pi"
// import {IoPersonOutline as ProfileIcon} from "react-icons/io5"
// import {IoBookmarkOutline as BookmarkIcon, IoSettingsOutline as SettingsIcon} from "react-icons/io5"
// import {Dispatch, SetStateAction, useEffect, useRef} from "react"
// import Link from "next/link"

// interface menuPropType {
//   setIsMenuVisable: Dispatch<SetStateAction<boolean>>
// }
// const Menu = ({setIsMenuVisable}: menuPropType) => {
//   const menuRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     function handleRemoveMenu(e: MouseEvent) {
//       if (menuRef.current && !menuRef.current?.contains(e.target as Node)) setIsMenuVisable(false)
//     }
//     window.addEventListener("mousedown", handleRemoveMenu)
//     return () => window.removeEventListener("mousedown", handleRemoveMenu)
//   }, [])

//   return (

//   )
// }

// export default Menu
