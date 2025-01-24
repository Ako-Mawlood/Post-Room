import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/components/ui/form";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { ImSpinner8 as Spinner } from "react-icons/im";
import { useEffect, useState } from "react";
import { useToast } from "@/app/Hooks/use-toast";

const emailValidation = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Please provide your email address"),
});

type FormDataType = z.infer<typeof emailValidation>;

export function ResetPassword() {
  const { toast } = useToast();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const form = useForm<FormDataType>({
    defaultValues: { email: "" },
    resolver: zodResolver(emailValidation),
  });

  async function handleSendResetLinkRequest(data: FormDataType) {
    try {
      await axiosInstance.post(
        `/api/user/reset-password`,
        { email: data.email },
        { headers: { Authorization: getCookie("token") } },
      );
      setIsResetModalOpen(false);
      toast({
        title: "Reset Link Sent",
        description: `A password reset link has been sent to ${data.email}. Please check your inbox.`,
      });
    } catch (err) {
      console.log("Failed to send reset link", err);
      toast({
        variant: "destructive",
        title: "Reset Link Failed",
        description: `We couldn't send a reset link to ${data.email}. Please ensure the email address is correct and try again.`,
      });
    }
  }
  useEffect(() => {
    form.setValue("email", "");
  }, [form, isResetModalOpen]);

  return (
    <>
      <div className="absolute right-10 top-10 z-50"></div>
      <Dialog open={isResetModalOpen} onOpenChange={setIsResetModalOpen}>
        <DialogTrigger asChild>
          <Button variant="link" className="m-0 p-0 text-base text-neutral-900">
            Reset it
          </Button>
        </DialogTrigger>
        <DialogContent className="flex w-full flex-col justify-between bg-neutral-50 text-neutral-900 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Reset Your Password</DialogTitle>
            <DialogDescription className="mt-4">
              Please provide your email address below. We will send you a link
              to reset your password.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSendResetLinkRequest)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="off"
                        {...field}
                        className="border-gray-200 bg-transparent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className="flex w-20 items-center justify-center rounded-full bg-black p-2 text-gray-50"
              >
                {form.formState.isSubmitting ? (
                  <Spinner className="animate-spin" />
                ) : (
                  <span>Send</span>
                )}
              </button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
