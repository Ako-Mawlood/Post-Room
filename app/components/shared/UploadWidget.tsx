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
        updateImageUrlState(result.info.url);
        if (form) {
          form.setValue("imageUrl", result.info.url);
        }
      }}
      options={{
        multiple: false,
        sources: ["local", "unsplash", "camera", "url"],
        styles: {
          palette: {
            window: "#111111",
            sourceBg: "#111111",
            windowBorder: "#333333",
            tabIcon: "#FFFFFF",
            inactiveTabIcon: "#888888",
            menuIcons: "#FFFFFF",
            link: "#FFFFFF",
            action: "#10B981",
            inProgress: "#EAB308",
            complete: "#10B981",
            error: "#EF4444",
            textDark: "#111111",
            textLight: "#BBBBBB",
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
