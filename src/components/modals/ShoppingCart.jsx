import {
  Badge,
  Button,
  Grid,
  GridItem,
  Icon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
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
            <Grid textAlign={"center"}>
              <GridItem>
                <Grid templateColumns={"repeat(4 ,1fr)"}>
                  <GridItem>Name</GridItem>
                  <GridItem>Price</GridItem>
                  <GridItem>Image</GridItem>
                  <GridItem>Quantity</GridItem>
                </Grid>
              </GridItem>
              <GridItem>
                {cartItems.map((item, index) => {
                  return <CartEntry product={item} key={index} />;
                })}
              </GridItem>
              <GridItem>
                <Grid templateColumns={"repeat(4, 1fr)"}>
                  <GridItem></GridItem>
                  {cartItems ? (
                    <GridItem>{`Total: $${totalPrice}`}</GridItem>
                  ) : (
                    <GridItem>total: $0</GridItem>
                  )}
                </Grid>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {cartItems.length > 0 && (
              <Button
                onClick={() => {
                  onClose();
                  nav("/checkout");
                }}
              >
                Checkout
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
