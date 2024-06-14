"use client"

import {CiSearch} from "react-icons/ci"
const Search = () => {
  return (
    <form className="flex justify-start items-center gap-1 w-56 p-2 text-base bg-gray-100 rounded-full">
      <CiSearch className="" size={25} />
      <input className="bg-gray-100 focus:outline-none" placeholder="Search" type="text" />
    </form>
  )
}

export default Search
