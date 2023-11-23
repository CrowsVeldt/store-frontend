import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";

export default function PasswordInput(props) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  // set id in parent element
  // parent element should have state [password, setPassword]
  // PasswordInput receives {setPassword} as a prop

  return (
    <FormControl isRequired>
      <FormLabel htmlFor={`${props.name}-password-input`}>
        {props.placeholder}
      </FormLabel>
      <InputGroup size="md">
        <Input
          name={props.name}
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder={props.placeholder}
          id={`${props.name}`}
          onChange={(e) => props.state(e)}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            id={`${props.name}-button`}
            size="sm"
            onClick={handleClick}
          >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}
