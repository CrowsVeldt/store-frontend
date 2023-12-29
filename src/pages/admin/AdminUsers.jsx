import { Box, Heading } from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import UserItem from "../../components/users/UserItem";
import LoadingCircle from "../../components/info/LoadingCircle";

export default function AdminUsers() {
  const privateRoutes = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const fetch = await privateRoutes.get("/users/admin");
      setUsers([...fetch.data.data]);

      setIsLoading(false);
    })();
  }, []);

  return (
    <Box>
      <Heading>Users</Heading>
      {!isLoading ? (
        users.map((user, index) => {
          return <UserItem user={user} key={index} />;
        })
      ) : (
        <LoadingCircle />
      )}
    </Box>
  );
}
