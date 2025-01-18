import {Button} from "../../ui/button"
import {Skeleton} from "../../ui/skeleton"
import {IoSettingsOutline as SettingsIcon} from "react-icons/io5"

const ProfileSkeleton = () => {
  return (
    <>
      <section className="flex items-center w-screen h-[40vh] relative px-6 border-b border-border">
        <Skeleton className="h-[120px] w-4/5 mb-4" />
        <div className="flex items-center gap-2 absolute left-6 bottom-4">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Button className="absolute right-6 bottom-4">Edit Profile</Button>
        <SettingsIcon className="absolute right-6 top-4 cursor-pointer" size={20} />
      </section>
      <section className="flex flex-col md:flex-row justify-between w-screen">
        <ul className="flex gap-3 items-start w-full md:w-1/3 px-6 py-4 border-b md:border-none border-border">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
        </ul>
        <div className="flex flex-col gap-2 w-full md:w-2/3 p-6">
          <Skeleton className="h-5 w-5/5" />
          <Skeleton className="h-5 w-4/5 md:w-5/5" />
          <Skeleton className="h-5 w-3/5" />
        </div>
      </section>
    </>
  )
}

export default ProfileSkeleton
