import axiosInstance from "@/libs/axiosInstance";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CiBellOn as Notfication } from "react-icons/ci";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

async function getNotifications() {
  try {
    const res = await axiosInstance(`/api/notification`, {
      headers: { Authorization: getCookie("token", { cookies }) },
    });
    return res.data;
  } catch (err) {}
}
const NotificationLog = async () => {
  const notifications = await getNotifications();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Notfication size={25} />
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex gap-1 text-lg">
          <Notfication size={25} />
          <h1>Nofications</h1>{" "}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationLog;
