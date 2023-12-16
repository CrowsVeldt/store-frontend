import {
  Box,
  Button,
  Link as Chlink,
  Flex,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function OrderProductItem(props) {
  const { product, RTP, quantity, index, handleQuantity, removeProduct } =
    props;

  return (
    <Box>
      <Flex>
        <Button onClick={(e) => removeProduct(e, product, index)} me={3} h={"1em"} w={"1em"}>
          X
        </Button>
        <Text me={1}>Product Id: </Text>
        <Chlink as={Link} to={`/product/${product}`}>
          {product},
        </Chlink>
        <Text ms={1}>{`RTP: ${RTP}`}</Text>
        <NumberInput defaultValue={quantity} max={99} min={0} onChange={(e) => handleQuantity(e, index)}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
    </Box>
  );
}

//<Input
//type="text"
//placeholder="Quantity"
//value={quantity}
//onChange={(e) => handleQuantity(e, index)}
//></Input>
