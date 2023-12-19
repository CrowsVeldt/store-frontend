import { Box, Heading, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import AdminProductItem from "../../components/product/AdminProductItem";

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
              <AdminProductItem
                state={{ item, index }}
                key={index + item.product_name}
              />
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
