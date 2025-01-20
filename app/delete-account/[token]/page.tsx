import axiosInstance from "@/libs/axiosInstance";
import { deleteCookie, getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const DeleteAccountPage = async ({ params }: { params: { token: string } }) => {
  const token = getCookie("token", { cookies });
  axiosInstance
    .delete(`/api/user/${params.token}`, { headers: { Authorization: token } })
    .then(() => {
      deleteCookie("token");
      redirect("/");
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default DeleteAccountPage;
