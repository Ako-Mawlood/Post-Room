"use client";

import axios from "@/libs/axiosInstance";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
const Page = ({
  params: { activateToken },
}: {
  params: { activateToken: string };
}) => {
  const router = useRouter();
  const {
    mutate: handleActivateToken,
    error,
    isPending,
  } = useMutation({
    mutationFn: () =>
      axios.post(`/api/activate/${activateToken}`, {
        headers: { authorization: activateToken },
      }),
    onSuccess: () => router.push("/account-setup"),
  });
  useEffect(() => {
    handleActivateToken();
  }, [handleActivateToken]);
  if (error) {
    return (
      error && (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-2 text-center text-xl font-semibold text-destructive">
          <span>{(error as any).response?.data}</span>
        </div>
      )
    );
  }
  return (
    <div className="flex h-screen w-full items-center justify-center text-3xl">
      {isPending && <span>Verifying...</span>}
    </div>
  );
};

export default Page;
