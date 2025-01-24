import React from "react";
import CurrentUserProvider from "@/app/providers/CurrentUserProvider";
import Navbar from "@/app/components/shared/Navbar";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CurrentUserProvider>
      <Navbar />
      {children}
    </CurrentUserProvider>
  );
};

export default layout;
