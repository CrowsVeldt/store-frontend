import { Button, CloseButton, Image, Td, Tr } from "@chakra-ui/react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function CartItem(props) {
  const { addToCart, removeFromCart } = useContext(CartContext);
  const { product } = props;

  return (
    <Tr h={20}>
      <Td px={1} textAlign={"center"}>
        {product.product_name}
      </Td>
      <Td px={1} textAlign={"center"}>{`$${product.product_price}`}</Td>
      <Td px={1} textAlign={"center"}>
        <Image src={product.product_image} />
      </Td>
      <Td px={1} textAlign={"center"}>
        <Button
          variant={"ghost"}
          h={"1em"}
          onClick={() => {
            removeFromCart(product);
          }}
        >
          {"-"}
        </Button>
        {product.quantity}
        <Button
          variant={"ghost"}
          h={"1em"}
          onClick={() => {
            addToCart(product);
          }}
        >
          {"+"}
        </Button>
      </Td>

      <CloseButton
        size={"sm"}
        position={"relative"}
        right={7}
        bottom={-1}
        onClick={() => removeFromCart(product, true)}
      />
    </Tr>
  );
}
