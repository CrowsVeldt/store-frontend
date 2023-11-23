import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as Chlink,
} from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import PasswordInput from "../../components/inputs/PasswordInput";

export default function Register() {
  const [values, setValues] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    user_password: "",
    user_password_confirm: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        user_name,
        user_email,
        user_password,
        user_phone,
        user_password_confirm,
      } = values;
      if (user_password !== user_password_confirm)
        throw new Error("Passwords do not match");

      const response = await axios.post("/users/customers/register", {
        user_name,
        user_email: user_email.toLowerCase(),
        user_password,
        user_phone,
      });

      toast.success(response.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      minH="65vh"
      maxW="600px"
      mx="auto"
      py={10}
      px={4}
    >
      <Heading as="h1" size="xl" mb={5}>
        Register
      </Heading>
      <FormControl isRequired mb={4}>
        <FormLabel>Your Name</FormLabel>
        <Input
          name="user_name"
          type="text"
          placeholder="Type in your name"
          value={values.user_name}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired mb={4}>
        <FormLabel>Email Address</FormLabel>
        <Input
          name="user_email"
          type="email"
          placeholder="Type in your Email"
          value={values.user_email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired mb={4}>
        <FormLabel>Phone Number</FormLabel>
        <Input
          name="user_phone"
          type="text"
          placeholder="Type in your phone"
          value={values.user_phone}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl isRequired mb={4}>
        <PasswordInput
          name="user_password"
          placeholder="Password"
          value={values.user_password}
          state={handleChange}
        />
      </FormControl>
      <FormControl isRequired mb={4}>
        <PasswordInput
          name="user_password_confirm"
          placeholder="Confirm Password"
          value={values.user_password_confirm}
          state={handleChange}
        />
      </FormControl>
      <Button type="submit" colorScheme="teal" size="lg" mb={4}>
        Register
      </Button>
      <Chlink as={Link} to={"/login"}>
        Already have an account? Log in here!
      </Chlink>
    </Box>
  );
}
