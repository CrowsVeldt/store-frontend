import { Box, Button, Heading, Input } from "@chakra-ui/react";
import { convertToBase64 } from "../../utils/fileFuncs";
import { privateAxios } from "../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AdminProductPage() {
  const [value, setValue] = useState(null);
  const axiosPrivateRoute = privateAxios();

  const handleUpdateButton = async () => {
    try {
      // const response = await axiosPrivateRoute.put(
      //   `/managers/update/product/${"6557a68e526da3558d73ed32"}`,
      //   value
      // );

      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e?.target?.files[0];
    const base64image = await convertToBase64(file);
    setValue(base64image);
  };

  return (
    <Box>
      <Heading>Product</Heading>

      <Input
        name="product_image"
        type="file"
        onChange={handleFileUpload}
        accept=".jpeg, .png, .jpg"
      />
      <Button onClick={handleUpdateButton}>Update</Button>
    </Box>
  );
}
