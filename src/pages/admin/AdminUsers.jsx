import { Box, Heading, Text } from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

export default function AdminUsers() {
  const privateRoutes = useAxiosPrivate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const fetch = await privateRoutes.get("/admin/users");
      setUsers([...fetch.data.data]);
    })();
  }, []);

  return (
    <Box>
      <Heading>Users</Heading>
      {users.map((user, index) => {
        return (
          <Text data-testid={"user"} key={index}>
            {user._id}
          </Text>
        );
      })}
    </Box>
  );
}
