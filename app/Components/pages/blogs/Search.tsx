import {CiSearch as SearchIcon} from "react-icons/ci"
import {Sheet, SheetContent, SheetTrigger} from "../../ui/sheet"

const Search = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <SearchIcon className="size-7 cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="flex justify-start items-start gap-4 h-[100px] py-2" side="top">
        <div className="flex justify-start items-center h-20 mx-auto">
          <SearchIcon className="size-10 cursor-pointer text-foreground" />
          <input
            className="text-4xl bg-transparent outline-none h-full"
            placeholder="Search for blogs..."
            type="text"
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default Search
