import React from "react";
import CurrentUserProvider from "@/app/providers/CurrentUserProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <CurrentUserProvider>{children}</CurrentUserProvider>;
};

export default layout;
