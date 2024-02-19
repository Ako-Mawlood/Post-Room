import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          setIsPending(false);
          throw new Error("could not fetch the data");
        } else {
          setIsPending(true)
          return res.json();
        }
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [url]);
  return { data, isPending, error };
};

export default useFetch;
