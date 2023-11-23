import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

export default function AlertPopup(props) {
  return (
    <Alert status={props.status}>
      <AlertIcon />
      <AlertTitle>{props.title}</AlertTitle>
    </Alert>
  );
}
