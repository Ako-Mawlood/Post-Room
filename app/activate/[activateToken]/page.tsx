"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type User = {
  email: string;
};

export default function Activate({ params }: { params: { activateToken: string } }) {
  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState<User>();

  useEffect(() => {
    axios
      .post(`/api/activate/${params.activateToken}`)
      .then((res) => {
        setUser(res.data);
        setStatus("success");
      })
      .catch((err) => {
        setStatus(err);
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {status != "loading" && status !== "success" && <h1>{status.response.data}</h1>}
      {status == "success" && <h2>email verified for {user?.email}</h2>}
    </div>
  );
}
