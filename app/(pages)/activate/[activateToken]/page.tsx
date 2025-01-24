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
        <div className="flex flex-col gap-2 text-center">
          <span className="text-red-600">Couldn&apos;t verify...</span>
          <span className="p-2 text-center text-xl">
            please refresh or try again later
          </span>
        </div>
      )
    );
  }
  return (
    <div className="flex h-screen w-full items-center justify-center text-3xl">
      {isPending && <span>Verifing...</span>}
    </div>
  );
};

export default Page;
