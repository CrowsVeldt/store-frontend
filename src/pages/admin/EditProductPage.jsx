import {
  Box,
  Button,
  Heading,
  Image,
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
import axios from "../../api/axios";
import { uniqueObjectArray } from "../../utils/utilFuncs";

export const loader = async () => {
  try {
    const categories = await axios.get("/categories");
    const sortedCategories = categories.data.categories.sort(
      (a, b) => a.category_name > b.category_name
    );
    return sortedCategories;
  } catch (error) {
    console.error("Error occured in category fetch" + error);
  }
};

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
    categories: product?.categories,
  });

  const handleSaveButton = async () => {
    try {
      const updates = {...values, categories: uniqueObjectArray(values.categories)}
      updates.categories.sort((a,b) => a.category_name > b.category_name)

      const response = await axiosPrivateRoute.patch(
        `/products/${product._id}/admin/edit`,
        updates
      );

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

  const setCategories = (cat) => {
    const catSet = new Set(cat);

    setValues((prevValues) => ({
      ...prevValues,
      categories: Array.from(catSet),
    }));
  };

  const handleCategoryChange = (newCategory, oldCategory) => {
    const categoryIndex = values.categories.indexOf(oldCategory);

    const categories = values.categories.toSpliced(
      categoryIndex,
      1,
      newCategory
    );

    setCategories(categories);
  };

  const addCategoryInput = () => {
    const cat = { _id: "0", category_name: "0" };
    const categories = [...values.categories, cat];

    setCategories(categories);
  };

  const removeCategoryInput = (value) => {
    const index = values.categories.findIndex((cat) => value.category_name === cat.category_name)
    const categories = values.categories.toSpliced(index, 1);
    setCategories(categories);
  };

  const categoryInputs = () => {
    return values?.categories
      .sort((a, b) => a.category_name > b.category_name)
      .map((category, index) => {
        return (
          <CategoryInput
            state={{
              category,
              handleCategoryChange,
              removeCategoryInput,
            }}
            key={index + category._id}
          />
        );
      });
  };

  return (
    <Box minH="65vh" py={10} px={4}>
      <Image
        name={values?.product_name}
        src={values?.product_image}
        h={"200px"}
        w={"200px"}
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
        {categoryInputs()}
        <Button colorScheme="teal" w={"50px"} onClick={addCategoryInput}>
          +
        </Button>
      </Stack>
      <Button mt={4} colorScheme="teal" onClick={handleSaveButton}>
        Save
      </Button>
    </Box>
  );
}
