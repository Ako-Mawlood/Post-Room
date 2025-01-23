import { CurrentUserContext } from "@/app/providers/CurrentUserProvider";
import { currentUserType } from "@/app/types/currentUserType";
import { useContext } from "react";

export async function isMe(userId: number) {
  const currentUser = useContext(CurrentUserContext);
  return currentUser && currentUser.id === userId;
}
