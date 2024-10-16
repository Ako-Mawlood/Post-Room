"use client";

import { GoArrowUpRight as GoIcon } from "react-icons/go";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { profileOwnerType } from "@/app/types/profileOwnerType";
import ProfileImageEditer from "../../ProfileImageUpdater";
import { editProfileSchema } from "@/libs/validations";
import { X as Close } from "lucide-react";
type EditProfileModalType = {
  profileOwner: profileOwnerType;
  currentUserUsername: string;
  searchParams?: { [key: string]: string | string[] | undefined };
};

type FormDataType = z.infer<typeof editProfileSchema>;

const EditProfileModal = ({
  profileOwner,
  currentUserUsername,
  searchParams,
}: EditProfileModalType) => {
  const router = useRouter();
  const pathname = usePathname();
  const [fullnameCharacters, setFullnameCharacters] = useState(
    profileOwner?.fullname ? profileOwner.fullname.length : 0,
  );
  const [bioCharacters, setBioCharacters] = useState(
    profileOwner?.bio ? profileOwner.bio.length : 0,
  );
  const form = useForm<FormDataType>({
    defaultValues: {
      imageUrl: profileOwner?.imageUrl || "",
      fullname: profileOwner?.fullname || "",
      bio: profileOwner?.bio || "",
    },
    resolver: zodResolver(editProfileSchema),
  });

  const handleModalToggle = () => {
    const params = new URLSearchParams(searchParams as any);
    if (params.get("edit") === "t") {
      params.delete("edit");
    } else {
      params.append("edit", "t");
    }
    router.push(pathname + "?" + params.toString(), { scroll: false });
  };

  async function handleSave(data: FormDataType) {
    try {
      await axiosInstance.put("/api/user", data, {
        headers: { Authorization: getCookie("token") },
      });
      handleModalToggle();
      router.refresh();
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  }

  return (
    <>
      <section className="modal absolute left-1/2 top-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5 rounded-md bg-card p-6 text-card-foreground shadow-md md:w-[35rem]">
        <Close
          onClick={handleModalToggle}
          className="absolute right-3 top-3 size-5 cursor-pointer"
        />
        <h1 className="text-2xl font-semibold">Profile information</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSave)}
            className="my-10 flex w-full flex-col gap-6 text-sm"
          >
            <ProfileImageEditer form={form} profileOwner={profileOwner} />
            <FormField
              name="fullname"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      {...field}
                      onChangeCapture={(e) =>
                        setFullnameCharacters(e.currentTarget.value.length)
                      }
                      className="h-8 bg-muted text-muted-foreground"
                    />
                  </FormControl>
                  <FormDescription className="ml-auto w-fit">
                    <span
                      className={clsx({
                        "text-destructive": fullnameCharacters > 50,
                      })}
                    >
                      {fullnameCharacters}
                    </span>
                    /50
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              name="bio"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Textarea
                      {...field}
                      className="resize-none bg-muted text-muted-foreground"
                      rows={5}
                      onChangeCapture={(e) =>
                        setBioCharacters(e.currentTarget.value.length)
                      }
                    />
                  </FormControl>
                  <FormDescription className="ml-auto w-fit">
                    <span
                      className={clsx({
                        "text-destructive": bioCharacters > 250,
                      })}
                    >
                      {bioCharacters}
                    </span>
                    /250
                  </FormDescription>
                </FormItem>
              )}
            />
            <Link
              href={`/settings`}
              className="relative flex flex-col items-start gap-2 rounded-md p-2 duration-150 hover:bg-muted"
            >
              <h2 className="font-semibold">Manage Account Settings</h2>
              <p className="text-sm text-muted-foreground">
                Update your categories, username, and account preferences.
              </p>
              <GoIcon className="absolute right-2 top-2 size-5 text-muted-foreground" />
            </Link>
            <div className="flex justify-end gap-3">
              <Button
                onClick={handleModalToggle}
                variant="outline"
                type="button"
                className="w-20 border-green-500 text-green-500 hover:bg-green-500/15 hover:text-green-500"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-20 bg-green-500 hover:bg-green-600 hover:opacity-90"
              >
                {form.formState.isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </section>
      <div className="fixed left-0 top-0 z-0 h-screen w-screen bg-black opacity-70 dark:bg-neutral-900"></div>
    </>
  );
};

export default EditProfileModal;
