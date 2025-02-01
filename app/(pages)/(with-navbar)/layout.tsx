import React from "react";

import Navbar from "@/app/components/shared/Navbar";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default layout;
