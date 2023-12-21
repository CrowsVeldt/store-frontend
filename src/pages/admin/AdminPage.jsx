import { Box, Button, ButtonGroup, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function AdminPage() {
  const [activeButton, setActiveButton] = useState("button-1");
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2];

  useEffect(() => {
    setActiveButton(`${currentPath}-button`);
  }, [location]);

  return (
    <Box>
      <Heading as={"h5"}>Site Management</Heading>
      <ButtonGroup isAttached>
        <Button
          as={Link}
          id={"products-button"}
          to={"/admin/products"}
          isActive={true && activeButton === "products-button"}
        >
          Products
        </Button>
        <Button
          as={Link}
          id={"users-button"}
          to={"/admin/users"}
          isActive={true && activeButton === "users-button"}
        >
          Users
        </Button>
        <Button
          as={Link}
          id={"orders-button"}
          to={"/admin/orders"}
          isActive={true && activeButton === "orders-button"}
        >
          Orders
        </Button>
      </ButtonGroup>
      <Outlet />
    </Box>
  );
}
