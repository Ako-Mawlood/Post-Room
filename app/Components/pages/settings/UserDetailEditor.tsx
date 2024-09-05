"use client";

import { Button } from "@/app/components/ui/button";
import { ImSpinner8 as Spinner } from "react-icons/im";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import axiosInstance from "@/libs/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { Textarea } from "../../ui/textarea";

type UserDetailEditorProps = {
  label: string;
  currentValue: string | undefined;
  schemaFactory: () => ZodSchema;
  type: "bio" | "username" | "fullname";
};

const UserDetailEditor = ({
  label,
  currentValue,
  schemaFactory,
  type,
}: UserDetailEditorProps) => {
  const [isUserDetailModalOpen, setIsUserDetailModalOpen] = useState(false);
  const formSchema = z.object({
    [type]: schemaFactory(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { [type]: currentValue },
    resolver: zodResolver(formSchema),
  });
  async function handleUpdateUserInfo(data: z.infer<typeof formSchema>) {
    try {
      await axiosInstance.put("/api/user", data, {
        headers: { Authorization: getCookie("token") },
      });
      setIsUserDetailModalOpen(false);
      form.setValue(`${type}`, form.getValues(type));
    } catch (err) {}
  }
  useEffect(() => {
    form.setValue(`${type}`, `${currentValue}`);
  }, [form, isUserDetailModalOpen]);

  return (
    <Dialog
      open={isUserDetailModalOpen}
      onOpenChange={setIsUserDetailModalOpen}
    >
      <div className="flex items-center justify-between p-3">
        <div className="flex flex-col justify-between">
          <h1 className="font-semibold">{label}</h1>
          <p className="mr-20 text-sm text-muted-foreground">{currentValue}</p>
        </div>
        <DialogTrigger asChild>
          <Button variant="secondary">Edit</Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {label}</DialogTitle>
          <DialogDescription>
            Make changes to your {label} here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateUserInfo)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name={type}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormMessage />
                  <FormControl>
                    {type === "bio" ? (
                      <Textarea
                        {...field}
                        className="bg-muted text-muted-foreground"
                        rows={5}
                      />
                    ) : (
                      <Input placeholder={`Enter ${type}`} {...field} />
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsUserDetailModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {form.formState.isSubmitting ? (
                  <Spinner className="size-5 animate-spin" />
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailEditor;
