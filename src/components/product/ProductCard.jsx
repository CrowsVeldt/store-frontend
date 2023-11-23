import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Flex,
  Heading,
  Image,
  Link as Chlink,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ({ product, addToCart }) {
  return (
    <Flex mx="auto" direction="column" maxW="80%">
      {" "}
      <Flex minH="65vh" maxW="100%" mx="auto" py={10} px={4}>
        {" "}
        <Card>
          <CardBody>
            <Chlink as={Link} to={`/product/${product._id}`}>
              <Image
                src={product.product_image}
                fallbackSrc={"https://placehold.co/400"}
                borderRadius="lg"
                maxHeight={"170px"}
              />
            </Chlink>
            <Stack mt="6" spacing="2">
              <Heading size="sm">{product.product_name}</Heading>
              <Text w={250} fontSize="xs" overflowY="hidden" height={150}>
                {product.product_description}
              </Text>
              <VStack>
                {product.categories.map((item) => (
                  <Text
                    bg="purple.200"
                    px={1}
                    borderRadius="14%"
                    fontSize="lg"
                    key={item?.category._id}
                  >
                    {item.category.category_name}
                  </Text>
                ))}
              </VStack>
              <Text color="blue.500" fontSize="xl">
                ${product.product_price}
              </Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <Button
              onClick={() => {
                addToCart(product);
              }}
            >
              Add To Cart
            </Button>
          </CardFooter>
        </Card>
      </Flex>
    </Flex>
  );
}
