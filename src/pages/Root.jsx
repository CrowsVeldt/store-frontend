import { Box, Divider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../components/sections/Footer";
import Nav from "../components/sections/Nav";

export default function Root() {
  return (
    <>
      <Nav />
      <Box minH="90vh" maxW="92%" mx="auto">
        <Divider />
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
