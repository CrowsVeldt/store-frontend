import {
  Avatar,
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { convertToBase64 } from "../../utils/fileFuncs";
import CategoryInput from "../../components/inputs/CategoryInput";

/* 
    Product Schema
      product_name
      product_description
      product_price
      product_image
      catagories: [categoryid 1... 2... etc]
  */

export default function EditProduct() {
  const location = useLocation();
  const product = location.state;
  const nav = useNavigate();
  const axiosPrivateRoute = useAxiosPrivate();

  const [values, setValues] = useState({
    _id: product._id,
    product_name: product?.product_name,
    product_description: product?.product_description,
    product_price: product?.product_price,
    product_image: product?.product_image,
    //     categories: [
    //     categories(?)
    //     ],
  });

  const handleSaveButton = async () => {
    try {
      const response = await axiosPrivateRoute.patch(
        `/admin/${product._id}/edit/product`,
        values
      );

      console.log(response);

      setValues((prevValues) => {
        return { ...prevValues, ...response?.data?.product };
      });

      nav("/admin/edit/product", {
        state: response.data.product,
        replace: true,
      });

      toast.success(`Updated ${values?.product_name} details`);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  //   const handleNestedChange = (e) => {
  //     setValues((prevValues) => ({
  //       ...prevValues,
  //       user_address: {
  //         ...prevValues?.user_address,
  //         [e.target.name]: e?.target?.value,
  //       },
  //     }));
  //   };

  const handleFileUpload = async (e) => {
    const file = e?.target?.files[0];
    const base64image = await convertToBase64(file);
    setValues((prevValues) => ({ ...prevValues, product_image: base64image }));
  };

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e?.target?.name]: e?.target?.value,
    }));
  };

  return (
    <Box minH="65vh" py={10} px={4}>
      <Avatar
        name={values?.product_name}
        src={values?.product_image}
        size={"xl"}
      />
      <Input
        name="product_image"
        type="file"
        onChange={handleFileUpload}
        accept=".jpeg, .png, .jpg"
      />
      <Stack spacing={2}>
        <Heading as="h3" fontSize="lg">
          Details
        </Heading>
        <Text fontSize="md">
          <Text as="span" fontWeight="bold">
            Name:{" "}
          </Text>
          <Input
            name="product_name"
            type="text"
            placeholder={`${
              values.product_name ? values.product_name : "Name"
            }`}
            value={values?.product_name || ""}
            onChange={handleChange}
          />
        </Text>
        <Text fontSize="md">
          <Text as="span" fontWeight="bold">
            Description:{" "}
          </Text>
          <Input
            name="product_description"
            type="text"
            placeholder={`${
              values.product_description
                ? values.product_description
                : "Description"
            }`}
            value={values?.product_description || ""}
            onChange={handleChange}
          />
        </Text>
        <Text fontSize="md">
          <Text as="span" fontWeight="bold">
            Price:{" "}
          </Text>
          <Input
            name="product_price"
            type="text"
            placeholder={`${
              values.product_price ? values.product_price : "Price"
            }`}
            value={values?.product_price || ""}
            onChange={handleChange}
          />
        </Text>
        {/* categories input */}
        {product.categories.map((category, index) => {
          <CategoryInput state={category._id} key={index} />;
        })}
      </Stack>
      <Button mt={4} colorScheme="teal" onClick={handleSaveButton}>
        Save
      </Button>
    </Box>
  );
}
