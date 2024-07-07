import Navbar from "@/app/Components/Navbar"
import {Button} from "@/app/Components/ui/button"
import {profileOwnerType} from "@/app/types/profileOwnerType"
import {getProfileOwner} from "@/libs/getProfileOwner"

const Settings = async ({params}: {params: {username: string}}) => {
  const profileOwner: profileOwnerType = await getProfileOwner(params.username.substring(3))
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-8 w-1/2 mx-auto">
        <h1 className="w-full mt-6 py-4 text-4xl font-semibold border-b">Settings</h1>
        <section className="flex flex-col gap-3 p-4">
          <h1 className="text-2xl font-semibold">Personal Information</h1>
          <div className="flex justify-between p-3 border rounded-md">
            <div className="flex flex-col justify-between">
              <h1 className="font-semibold">Full name</h1>
              <p className="text-muted-foreground">{profileOwner.fullname}</p>
            </div>
            <Button variant="secondary">Edit</Button>
          </div>

          <div className="flex justify-between p-3 border rounded-md">
            <div className="flex flex-col justify-between">
              <h1 className="font-semibold">Username</h1>
              <p className="text-muted-foreground">@{profileOwner.username}</p>
            </div>
            <Button variant="secondary">Edit</Button>
          </div>

          <div className="flex justify-between p-3 border rounded-md">
            <div className="flex flex-col justify-between">
              <h1 className="text-muted-foreground">Bio</h1>
              <p>{profileOwner.bio}</p>
            </div>
            <Button variant="secondary">Edit</Button>
          </div>
        </section>
      </main>
    </>
  )
}

export default Settings
