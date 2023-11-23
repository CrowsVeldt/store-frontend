import { Box, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export default function Checkout() {
  const checkoutItems = useLocation().state.items;
  return (
    <Box>
      <Heading>Checkout</Heading>
    </Box>
  );
}
