"use client";

import { GoArrowUpRight as GoIcon } from "react-icons/go";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { Input } from "@/app/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useToast } from "@/app/Hooks/use-toast";
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
import ProfileImageEditor from "@/app/components/shared/ProfileImageEditor";
import { editProfileSchema } from "@/libs/validations";
import { X as Close } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

type EditProfileModalType = {
  profileOwner: profileOwnerType;
};

type FormDataType = z.infer<typeof editProfileSchema>;

const EditProfileModal = ({ profileOwner }: EditProfileModalType) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Animation control
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

  const openModal = () => {
    setIsProfileEditModalOpen(true);
    setTimeout(() => setIsModalVisible(true), 10); // Delay for animation
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setIsProfileEditModalOpen(false), 50); // Matches the closing animation duration
  };

  async function handleSave(data: FormDataType) {
    try {
      await axiosInstance.put("/api/user", data, {
        headers: { Authorization: getCookie("token") },
      });

      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "profileOwner" ||
          query.queryKey[0] === "currentUser",
      });

      closeModal();
    } catch (error) {
      console.error("Failed to save profile:", error);
      toast({
        title: "Could not save changes",
        variant: "destructive",
        description: "An unexpected error occurred while saving the changes.",
      });
    }
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={openModal}
        className="absolute bottom-6 right-6"
      >
        Edit Profile
      </Button>

      {isModalVisible && (
        <div
          className={clsx("fixed inset-0 z-40 bg-black/50")}
          onClick={closeModal}
        />
      )}

      {isProfileEditModalOpen && (
        <section
          className={clsx(
            "fixed left-1/2 top-1/2 z-50 flex w-full max-w-[35rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5 rounded-md bg-background p-6 text-card-foreground shadow-md transition-transform duration-300",
            isModalVisible ? "scale-100" : "scale-[0.97]",
          )}
        >
          <Close
            onClick={closeModal}
            className="absolute right-3 top-3 size-5 cursor-pointer"
          />
          <h1 className="text-2xl font-semibold">Profile information</h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="my-10 flex w-full flex-col gap-6 text-sm"
            >
              <ProfileImageEditor form={form} profileOwner={profileOwner} />
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
                  onClick={closeModal}
                  variant="outline"
                  type="button"
                  className="w-20 border-green-500 text-green-500 hover:bg-green-500/15 hover:text-green-500"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 hover:opacity-90"
                >
                  {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </section>
      )}
    </>
  );
};

export default EditProfileModal;
