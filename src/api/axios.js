import axios from "axios";

export default axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? `${window.location.protocol}////${window.location.hostname}:3000`
      : "https://store-backend-2uck.onrender.com",
});

// Private route
export const privateAxios = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? `${window.location.protocol}////${window.location.hostname}:3000`
      : "https://store-backend-2uck.onrender.com",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
