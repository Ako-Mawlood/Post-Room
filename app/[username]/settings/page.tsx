import Navbar from "@/app/components/Navbar";
import ProfileImageUpdater from "@/app/components/ProfileImageUpdater";
import { Button } from "@/app/components/ui/button";
import { profileOwnerType } from "@/app/types/profileOwnerType";
import { getProfileOwner } from "@/libs/getProfileOwner";

const Settings = async ({ params }: { params: { username: string } }) => {
  const profileOwner: profileOwnerType = await getProfileOwner(
    params.username.substring(3),
  );
  return (
    <>
      <Navbar />
      <main className="mx-auto flex w-1/2 flex-col gap-8">
        <h1 className="mt-6 w-full border-b py-4 text-4xl font-semibold">
          Settings
        </h1>
        <h1 className="text-2xl font-semibold">Personal Information</h1>
        <section className="flex flex-col gap-3 border p-4">
          <ProfileImageUpdater form={undefined} profileOwner={profileOwner} />
          <div className="flex items-center justify-between p-3">
            <div className="flex flex-col justify-between">
              <h1 className="font-semibold">Full name</h1>
              <p className="text-muted-foreground">{profileOwner.fullname}</p>
            </div>
            <Button variant="secondary">Edit</Button>
          </div>

          <div className="flex items-center justify-between p-3">
            <div className="flex flex-col justify-between">
              <h1 className="font-semibold">Username</h1>
              <p className="text-muted-foreground">@{profileOwner.username}</p>
            </div>
            <Button variant="secondary">Edit</Button>
          </div>

          <div className="flex items-center justify-between p-3">
            <div className="flex flex-col justify-between">
              <h1 className="font-semibold">Bio</h1>
              <p className="text-muted-foreground">{profileOwner.bio}</p>
            </div>
            <Button variant="secondary">Edit</Button>
          </div>
          <div className="flex items-center justify-between p-3">
            <div className="flex flex-col justify-between">
              <h1 className="font-semibold">Categories</h1>
              <p className="text-muted-foreground">{profileOwner.bio}</p>
            </div>
            <Button variant="secondary">Edit</Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Settings;
