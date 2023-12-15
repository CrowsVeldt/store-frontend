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

export default function EditUser() {
  const location = useLocation();
  const user = location.state;
  const nav = useNavigate();
  const axiosPrivateRoute = useAxiosPrivate();

  const [values, setValues] = useState({
    _id: user._id,
    user_name: user?.user_name,
    user_email: user?.user_email,
    user_phone: user?.user_phone,
    user_avatar: user?.user_avatar,
    user_address: {
      city: user?.user_address?.city || "",
      street: user?.user_address?.street || "",
      building: user?.user_address?.building || "",
      apartment: user?.user_address?.apartment || "",
    },
  });

  const handleSaveButton = async () => {
    try {
      const response = await axiosPrivateRoute.patch(
        `/admin/${user._id}/edit/user`,
        values
      );

      setValues((prevValues) => {
        return { ...prevValues, ...response?.data?.user };
      });

      nav("/admin/edit/user", {
        state: response.data.user,
        replace: true,
      });

      toast.success(`Updated ${values?.user_name}'s account info`);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleNestedChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      user_address: {
        ...prevValues?.user_address,
        [e.target.name]: e?.target?.value,
      },
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e?.target?.files[0];
    const base64image = await convertToBase64(file);
    setValues((prevValues) => ({ ...prevValues, user_avatar: base64image }));
  };

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e?.target?.name]: e?.target?.value,
    }));
  };

  return (
    <Box minH="65vh" py={10} px={4}>
      <Avatar name={values?.user_name} src={values?.user_avatar} size={"xl"} />
      <Input
        name="user_avatar"
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
            name="user_name"
            type="text"
            placeholder={`${values.user_name ? values.user_name : "Name"}`}
            value={values?.user_name || ""}
            onChange={handleChange}
          />
        </Text>
        <Text fontSize="md">
          <Text as="span" fontWeight="bold">
            Email:{" "}
          </Text>
          <Input
            name="user_email"
            type="email"
            placeholder={`${
              values.user_email ? values.user_email : "Email Address"
            }`}
            value={values?.user_email || ""}
            onChange={handleChange}
          />
        </Text>
        <Text fontSize="md">
          <Text as="span" fontWeight="bold">
            Phone:{" "}
          </Text>
          <Input
            name="user_phone"
            type="text"
            placeholder={`${
              values.user_phone ? values.user_phone : "Phone Number"
            }`}
            value={values?.user_phone || ""}
            onChange={handleChange}
          />
        </Text>
        <Heading as="h3" fontSize="lg">
          Address
        </Heading>
        <Text>
          <Text as="span" fontWeight="bold">
            City:{" "}
          </Text>
          <Input
            name="city"
            type="text"
            placeholder={`${
              values.user_address.city
                ? values.user_address.city
                : "Town/City Name"
            }`}
            value={values.user_address?.city || ""}
            onChange={handleNestedChange}
          />
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Street:{" "}
          </Text>
          <Input
            name="street"
            type="text"
            placeholder={`${
              values.user_address.street
                ? values.user_address.street
                : "Street Name"
            }`}
            value={values.user_address?.street || ""}
            onChange={handleNestedChange}
          />
        </Text>
        <Text fontSize="md">
          <Text as="span" fontWeight="bold">
            Building:{" "}
          </Text>
          <Input
            name="building"
            type="text"
            placeholder={`${
              values.user_address.building
                ? values.user_address.building
                : "Building Number"
            }`}
            value={values?.user_address?.building || ""}
            onChange={handleNestedChange}
          />
        </Text>
        <Text fontSize="md">
          <Text as="span" fontWeight="bold">
            Apartment:{" "}
          </Text>
          <Input
            name="apartment"
            type="text"
            placeholder={`${
              values.user_address.apartment
                ? values.user_address.apartment
                : "Apartment Number"
            }`}
            value={values?.user_address?.apartment || ""}
            onChange={handleNestedChange}
          />
        </Text>
      </Stack>
      <Button mt={4} colorScheme="teal" onClick={handleSaveButton}>
        Save
      </Button>
    </Box>
  );
}
