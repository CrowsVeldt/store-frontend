import { Box, Heading } from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import UserItem from "../../components/users/UserItem";

export default function AdminUsers() {
  const privateRoutes = useAxiosPrivate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const fetch = await privateRoutes.get("/users/admin");
      setUsers([...fetch.data.data]);
    })();
  }, []);

  return (
    <Box>
      <Heading>Users</Heading>
      {users.map((user, index) => {
        return <UserItem user={user} key={index} />;
      })}
    </Box>
  );
}
