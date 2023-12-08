import { Box, Heading } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const loader = () => {
  return null;
};

export default function AdminUsers() {
  const getAllUsers = useLoaderData();
  return (
    <Box>
      <Heading>Users</Heading>
    </Box>
  );
}
