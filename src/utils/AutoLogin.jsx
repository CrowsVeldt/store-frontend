import { Center, Spinner } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useRefreshToken from "../hooks/useRefreshToken";

export default function AutoLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    !user ? refreshToken() : setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Center mt={["200px", "400px"]}>
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      ) : (
        <Outlet />
      )}
    </>
  );
}
