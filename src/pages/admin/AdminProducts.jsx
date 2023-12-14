import {
  Box,
  Button,
  Heading,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";

export default function AdminProducts() {
  const getAllProducts = useLoaderData();

  return (
    <Box>
      <Heading>Products</Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Description</Th>
            <Th>Image</Th>
            <Th>Categories</Th>
          </Tr>
        </Thead>
        <Tbody>
          {getAllProducts.map((item, index) => {
            return (
              <Tr data-testid={"product-row"} key={index}>
                <Button as={Link} to={"/admin/edit/product"} state={item}>
                  Edit
                </Button>
                <Td>
                  <Text>{item.product_name}</Text>{" "}
                </Td>
                <Td>{item.product_price}</Td>
                <Td>{item.product_description}</Td>
                <Td>{<Image src={item.product_image} />}</Td>
                <Td>
                  {item.categories.map((cat, index) => {
                    return (
                      <Text key={index}>{cat.category.category_name}</Text>
                    );
                  })}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
