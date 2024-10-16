"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ReactNode } from "react";

const UploadWidget = ({
  children,
  form,
  updateImageUrlState,
}: {
  children: ReactNode;
  form?: any;
  updateImageUrlState: (url: string) => void;
}) => {
  return (
    <CldUploadWidget
      onSuccess={(result: any) => {
        //setImageUrl(result.info.url);
        updateImageUrlState(result.info.url);
        if (form) {
          form.setValue("imageUrl", result.info.url);
        }
      }}
      options={{
        multiple: false,
        sources: ["local"],
        styles: {
          palette: {
            window: "FFFFFF",
            sourceBg: "#FFFFFF",
            windowBorder: "#262626",
            tabIcon: "#FFFFFF",
            inactiveTabIcon: "#FFFFFF",
            menuIcons: "#262626",
            link: "#262626",
            action: "#FFFFFF",
            inProgress: "#262626",
            complete: "#262626",
            error: "red",
            textDark: "#FFFFFF",
            textLight: "#FFFFFF",
          },
        },
      }}
      uploadPreset="ebh5pne5"
    >
      {({ open }) => {
        return (
          <div className="w-fit" onClick={() => open()}>
            {children}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadWidget;
