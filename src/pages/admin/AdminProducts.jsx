import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { convertToBase64 } from "../../utils/fileFuncs";
import { privateAxios } from "../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

export default function AdminProducts() {
  const [value, setValue] = useState(null);
  const getAllProducts = useLoaderData();
  const axiosPrivateRoute = privateAxios();

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

// const handleUpdateButton = async () => {
//   try {
//     // const response = await axiosPrivateRoute.put(
//     //   `/managers/update/product/${"6557a68e526da3558d73ed32"}`,
//     //   value
//     // );

//     toast.success(response?.data?.message);
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//   }
// };

// const handleFileUpload = async (e) => {
//   const file = e?.target?.files[0];
//   const base64image = await convertToBase64(file);
//   setValue(base64image);
// };

/* <Heading>Product</Heading>
      <Input
        name="product_image"
        type="file"
        onChange={handleFileUpload}
        accept=".jpeg, .png, .jpg"
      />
<Button onClick={handleUpdateButton}>Update</Button> */
