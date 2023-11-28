import axios from "../../api/axios";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useState } from "react";

export default function SupportPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const data = {
        user_name: name,
        user_email: email,
        message: message,
      };

      const request = await axios.post(
        "/mailer/send-tech-support-ticket",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success("Email sent");
    } catch (error) {
      toast.error("Email not sent");
    }
  };

  return (
    <Box onSubmit={handleSubmit}>
      <Heading id="support-header">Tech Support</Heading>
      <FormControl isRequired id="support-form-name-control">
        <FormLabel htmlFor="support-form-name-input">Name</FormLabel>
        <Input
          id="support-form-name-input"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired id="support-form-email-control">
        <FormLabel htmlFor="support-form-email-input">Email</FormLabel>
        <Input
          id="support-form-email-input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired id="support-form-message-control">
        <FormLabel htmlFor="support-form-message-input">Message</FormLabel>
        <Textarea
          id="support-form-message-input"
          placeholder="What can we help with?"
          onChange={(e) => setMessage(e.target.value)}
        />
      </FormControl>
      <FormControl id="support-form-submit-control">
        <Button
          id="support-form-submit-button"
          type={"submit"}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
}
