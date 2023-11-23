import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../api/axios";

export default function PasswordReset() {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/mailer/send-password-reset-link",
        {
          user_email: email,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success(`Please check your email for a reset link`);
    } catch (error) {
      toast.error(
        `Something went wrong! Please check the email address. If it is correct, try again later.`
      );
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Box
      as="form"
      onSubmit={handlePasswordReset}
      minH="65vh"
      maxW="600px"
      mx="auto"
      py={10}
      px={4}
    >
      <FormControl isRequired mb={4}>
        <FormLabel>Email</FormLabel>
        <InputGroup>
          <Input
            name="user_email"
            placeholder="Type in your email address"
            value={email}
            onChange={handleChange}
          />
        </InputGroup>
      </FormControl>
      <Button type="submit" colorScheme="teal">
        Reset
      </Button>
    </Box>
  );
}
