"use client";

import { useEffect, useState } from "react";

const AuthCallback = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Ensure we're in the browser (window object is only available on the client)
    if (typeof window !== "undefined") {
      const hash = window.location.hash;

      // Check if the hash exists
      if (hash) {
        const params = new URLSearchParams(hash.substring(1)); // Remove the '#' from the hash
        const token = params.get("access_token");

        // If the token is found, update the state
        if (token) {
          setAccessToken(token);
        }
      }
    }
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div>
      <h1>Authentication Callback</h1>
      {accessToken ? <p>Access Token: {accessToken}</p> : <p>No token found</p>}
    </div>
  );
};

export default AuthCallback;
