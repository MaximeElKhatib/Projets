import { useState, useCallback } from "react";
import { useContext } from "react";
import { AuthContext } from "../Containers/AuthContext";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      try {
        headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
          ...headers,
        };

        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };
  return { isLoading, error, sendRequest, clearError };
};
