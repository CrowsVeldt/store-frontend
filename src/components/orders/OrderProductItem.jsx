import {
  Button,
  Link as Chlink,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Text,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

export default function OrderProductItem(props) {
  const {
    product: productId,
    RTP,
    quantity,
    index,
    handleQuantity,
    removeProduct,
  } = props;

  const products = useLoaderData();

  const name = products.find(
    (product) => product._id === productId
  ).product_name;

  return (
    <Flex w={"100%"} direction={["column", "column", "row"]} align={["start", "start", "center"]}>
      <Button
        onClick={(e) => removeProduct(e, productId, index)}
        me={3}
        h={"1em"}
        w={"1em"}
      >
        X
      </Button>
      <Flex direction={["column", "column", "row"]} align={["start", "start", "center"]}>
        <Flex me={2}>
          <Text me={1}>Product Name:</Text>
          <Chlink
            as={Link}
            to={`/product/${productId}`}
            color={"black"}
            textDecoration={"underline"}
            _hover={{ color: "teal" }}
          >
            {`${name},`}
          </Chlink>
        </Flex>
        <Flex me={2}>
          <Text me={1}>Product Id: </Text>
          {productId.substring(productId.length - 3)},
        </Flex>
        <Text me={2}>{`RTP: ${RTP},`}</Text>
        <Flex align={["center"]}>
          <Text me={2}>Quantity:</Text>
          <NumberInput
            w={"4.5rem"}
            defaultValue={quantity}
            max={99}
            min={0}
            onChange={(e) => handleQuantity(e, index)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      </Flex>
    </Flex>
  );
}
