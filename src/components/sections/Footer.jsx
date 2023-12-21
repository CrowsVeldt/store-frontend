import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const navButtonStyles = {
  _hover: {
    cursor: "pointer",
    border: "2px",
    borderColor: "black",
  },

  fontSize: ["16px", "16px", "20px"],
  border: "2px transparent solid",
};

export default function Footer() {
  return (
    <Flex justify={"center"} bottom="0" left="0" width="100vw" bg="twitter.200">
      <Flex
        justify={"space-around"}
        w={["100%", "80%"]}
        id="footer-button-container"
      >
        <Button
          as={Link}
          to="/about"
          sx={navButtonStyles}
          variant="outline"
          onClick={() => console.log("about")}
        >
          About
        </Button>

        <Button as={Link} to="/contact" sx={navButtonStyles} variant="outline">
          Contact
        </Button>

        <Button as={Link} to="/blog" sx={navButtonStyles} variant="outline">
          Blog
        </Button>

        <Button as={Link} to="/support" sx={navButtonStyles} variant="outline">
          Support
        </Button>
      </Flex>
    </Flex>
  );
}
