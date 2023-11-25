import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
// import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import axios from "../../api/axios";
import CheckoutEntry from "../../components/product/CheckoutEntry";

export default function Checkout() {
  // const checkoutItems = useLocation().state.items;
  const { cartItems } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const deliveryCost = 5;
  const totalItems = cartItems.reduce((a, b) => {
    return a + b.quantity;
  }, 0);

  useEffect(() => {
    const price = cartItems.reduce((a, b) => {
      return (a += b.product_price * b.quantity);
    }, 0);
    setTotalPrice(price);
  }, [cartItems]);

  const makeOrder = () => {
    // const response = axios.post("/customers/orders", {orderData}, {withCredentials: true})
  };

  return (
    <Box>
      <Heading>Checkout</Heading>

      {cartItems.length > 0 ? (
        <Flex
          direction={["column", "column", "row", "row"]}
          flexWrap="wrap"
          my={6}
          justifyContent="space-between"
        >
          <Table colorScheme="black">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>Image</Th>
                <Th>Quantity</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cartItems.map((item, index) => {
                return <CheckoutEntry product={item} key={index} />;
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                {cartItems ? (
                  <Td>{`Price: $${totalPrice}`}</Td>
                ) : (
                  <Td>total: $0</Td>
                )}
                <Td>{`Price + Shipping and Handling: $${
                  totalPrice + deliveryCost * totalItems
                }`}</Td>
              </Tr>
            </Tfoot>
          </Table>
          <Button>Order now!</Button>
        </Flex>
      ) : (
        <Box>
          <Heading>Nothing here yet!</Heading>
        </Box>
      )}
    </Box>
  );
}
