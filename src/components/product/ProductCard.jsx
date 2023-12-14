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
  const categories = product.categories || [];

  return (
    <Flex mx="auto" direction="column" maxW="80%">
      <Flex minH="65vh" maxW="100%" mx="auto" py={10} px={4}>
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
              <Heading as={"h3"} size="sm">
                {product.product_name}
              </Heading>
              <Text
                w={250}
                fontSize="xs"
                overflowY="hidden"
                height={150}
                data-testid={"product-description"}
              >
                {product.product_description}
              </Text>
              <VStack alignItems={"start"}>
                {categories.map((item) => (
                  <Text
                    px={1}
                    width={"100%"}
                    borderRadius="14%"
                    textDecorationLine={"underline"}
                    fontSize="lg"
                    key={item._id}
                  >
                    {item.category_name}
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
              data-testid="add-to-cart"
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
