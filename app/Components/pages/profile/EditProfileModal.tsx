"use client";

import Image from "next/image";
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
  const [fullnameCharacters, setFullnameCharacters] = useState(
    profileOwner?.fullname.length,
  );
  const [bioCharacters, setBioCharacters] = useState(
    profileOwner?.bio ? profileOwner.bio.length : 0,
  );
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<FormDataType>({
    defaultValues: {
      imageUrl: profileOwner?.imageUrl,
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
      <section className="modal absolute left-1/2 z-10 flex w-full -translate-x-1/2 flex-col items-center gap-5 rounded-md bg-card p-6 text-card-foreground shadow-md md:top-6 md:w-[30rem]">
        <Close
          onClick={handleModalToggle}
          className="absolute right-3 top-3 size-5 cursor-pointer"
        />
        <h1 className="text-2xl font-semibold">Profile information</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSave)}
            className="flex w-full flex-col gap-5 text-sm"
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
                      onChangeCapture={() =>
                        setFullnameCharacters(field.value.length)
                      }
                      className="h-8 bg-muted text-muted-foreground"
                    />
                  </FormControl>
                  <FormDescription className="ml-auto w-fit">
                    <span
                      className={clsx({
                        "text-destructive": field.value.length > 50,
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
                      className="bg-muted text-muted-foreground"
                      rows={5}
                      onChangeCapture={() =>
                        setBioCharacters(field.value.length)
                      }
                    />
                  </FormControl>
                  <FormDescription className="ml-auto w-fit">
                    <span
                      className={clsx({
                        "text-destructive": field.value.length > 250,
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
              href={`/@${currentUserUsername}/settings`}
              className="relative flex flex-col items-start gap-2 rounded-md p-2 duration-150 hover:bg-muted"
            >
              <h2 className="font-semibold">Manage Account Settings</h2>
              <p className="text-sm text-muted-foreground">
                Update your categories, username, and account preferences.
              </p>
              <Image
                className="absolute right-2 top-2"
                src="/assets/redirect.svg"
                width={20}
                height={20}
                alt="redirect"
              />
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
      <div className="fixed left-0 top-0 z-0 h-screen w-screen bg-black opacity-70"></div>
    </>
  );
};

export default EditProfileModal;
