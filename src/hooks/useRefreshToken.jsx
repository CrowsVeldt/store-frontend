import { useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const useRefreshToken = () => {
  const { setUser } = useContext(AuthContext);

  const refreshToken = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });

    setUser((prevUserDetails) => {
      return {
        ...prevUserDetails,
        accessToken: response.data.customerToken,
        user: response.data.user,
      };
    });

    return response.data.customerToken;
  };

  return refreshToken;
};

export default useRefreshToken;
