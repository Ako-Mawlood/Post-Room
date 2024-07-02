"use client"

import {CldUploadWidget} from "next-cloudinary"
import {Dispatch, ReactNode, SetStateAction} from "react"

const UploadWidget = ({
  children,
  setUploadedProfileImageUrl,
}: {
  children: ReactNode
  setUploadedProfileImageUrl: Dispatch<SetStateAction<string | undefined>>
}) => {
  return (
    <CldUploadWidget
      onSuccess={(result: any) => {
        setUploadedProfileImageUrl(result.info.url)
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
      {({open}) => {
        return <div onClick={() => open()}>{children}</div>
      }}
    </CldUploadWidget>
  )
}

export default UploadWidget
