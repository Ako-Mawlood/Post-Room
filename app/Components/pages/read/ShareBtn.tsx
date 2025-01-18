"use client";

import { RWebShare } from "react-web-share";
import { LuShare as ShareIcon } from "react-icons/lu";
import { Button } from "../../ui/button";

const ShareBtn = ({ blogId }: { blogId: string }) => {
  return (
    <RWebShare
      data={{
        title: "Share",
        url: `http://localhost:3000/read/${blogId}`,
      }}
      sites={["copy", "mail", "facebook", "telegram", "whatsapp", "linkedin"]}
      disableNative={true}
    >
      <Button size="sm" variant="ghost">
        <ShareIcon size={20} />
        <span className="hidden sm:block">Share</span>{" "}
      </Button>
    </RWebShare>
  );
};

export default ShareBtn;
