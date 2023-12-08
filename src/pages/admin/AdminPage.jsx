import {
  Box,
  Button,
  ButtonGroup,
  Link as Chlink,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <Box>
      <Heading as={"h5"}>Site Management</Heading>
      <ButtonGroup isAttached>
        <Button as={Link} to={"/admin/products"}>
          Products
        </Button>
        <Button as={Link} to={"/admin/users"}>
          User
        </Button>
        <Button as={Link} to={"/admin/orders"}>
          Orders
        </Button>
      </ButtonGroup>

      {/* <HStack>
        <Chlink as={Link} to={"/admin/products"}>
          Products
        </Chlink>
        <Chlink as={Link} to={"/admin/users"}>
          Users
        </Chlink>
        <Chlink as={Link} to={"/admin/orders"}>
          Orders
        </Chlink>
      </HStack> */}
      <Outlet />
    </Box>
  );
}
