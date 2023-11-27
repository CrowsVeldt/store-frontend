import {
  Badge,
  Button,
  Icon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  useDisclosure,
  Tbody,
  Tfoot,
  Thead,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../../context/CartContext";
import { navButtonStyles } from "../../themes/componentStyles";
import CartEntry from "../product/CartEntry";

export default function ShoppingCartModal() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cartItems } = useContext(CartContext);
  const nav = useNavigate();

  useEffect(() => {
    const price = cartItems.reduce((a, b) => {
      return (a += b.product_price * b.quantity);
    }, 0);
    setTotalPrice(price);
  }, [cartItems]);

  useEffect(() => {
    const productNumber = cartItems.reduce((a, b) => {
      return (a += b.quantity);
    }, 0);
    setTotalProducts(productNumber);
  }, [cartItems]);

  return (
    <>
      <Button sx={navButtonStyles} variant={"outline"} onClick={onOpen}>
        {cartItems.length > 0 && (
          <Badge
            fontSize={"2xs"}
            colorScheme="purple"
            position={"relative"}
            left={".4rem"}
            top={".4rem"}
            borderRadius={"full"}
          >
            {totalProducts}
          </Badge>
        )}
        <Icon as={ShoppingCartIcon} fontSize={"3xl"} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Shopping cart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                  return <CartEntry product={item} key={index} />;
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  {cartItems ? (
                    <Td>{`Total: $${totalPrice}`}</Td>
                  ) : (
                    <Td>total: $0</Td>
                  )}
                </Tr>
              </Tfoot>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                onClose();
                nav("/purchase");
              }}
            >
              Checkout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
