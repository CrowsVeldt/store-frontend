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
import { useState } from "react";

export default function SupportPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e) => {
    if (
      (e.target.id =
        ("support-form-submit-button" && e.type === "click") ||
        e.code === "Enter")
    ) {
      const data = {
        name: name,
        email: email,
        message: message,
      };

      axios.post("/support/add-ticket", data, { withCredentials: true });
    }
  };

  return (
    <Box onKeyDown={submit}>
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
        <Button id="support-form-submit-button" onClick={(e) => submit(e)}>
          Submit
        </Button>
      </FormControl>
    </Box>
  );
}
