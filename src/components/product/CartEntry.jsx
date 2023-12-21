import {
  Button,
  CloseButton,
  Flex,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function CartEntry(props) {
  const { addToCart, removeFromCart } = useContext(CartContext);
  const { product } = props;

  return (
    <Grid h={20} templateColumns={"repeat(4, 1fr)"}>
      <GridItem px={1} textAlign={"center"}>
        {product.product_name}
      </GridItem>
      <GridItem
        px={1}
        textAlign={"center"}
      >{`$${product.product_price}`}</GridItem>
      <GridItem px={1} textAlign={"center"}>
        <Image src={product.product_image} h={"70px"} w={"70px"} />
      </GridItem>
      <GridItem px={1} textAlign={"center"}>
        <Flex>
          <Button
            variant={"ghost"}
            h={"1em"}
            onClick={() => {
              removeFromCart(product);
            }}
          >
            -
          </Button>
          {product.quantity}
          <Button
            variant={"ghost"}
            h={"1em"}
            onClick={() => {
              addToCart(product);
            }}
          >
            +
          </Button>
        </Flex>
      </GridItem>
      <CloseButton
        size={"sm"}
        position={"relative"}
        right={"20px"}
        bottom={"70"}
        border={"1px solid black"}
        onClick={() => removeFromCart(product, true)}
      />
    </Grid>
  );
}
