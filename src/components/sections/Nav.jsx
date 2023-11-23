import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Link as Chlink,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { AuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
import ShoppingCartModal from "./ShoppingCart";
import {
  hamburgerStyles,
  navButtonStyles,
  navStyles,
} from "../../themes/componentStyles";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const logout = useLogout();

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const NavButton = ({ children }) => {
    return (
      <Button sx={navButtonStyles} variant="outline">
        {children}
      </Button>
    );
  };

  return (
    <Box position="sticky" w="100%" top="0" zIndex="2" bg="twitter.200">
      <Button
        onClick={handleMenuClick}
        sx={hamburgerStyles}
        size="lg"
        variant="outline"
      >
        <Icon as={MenuOutlinedIcon} />
      </Button>
      <Flex
        justifyContent="space-between"
        alignItems={["center"]}
        direction={["column", "row"]}
        sx={navStyles(menuOpen)}
      >
        <ButtonGroup w="35%">
          <Chlink as={Link} to="/">
            <NavButton>
              <Icon as={HomeIcon} boxSize={[null, "2em"]} />
            </NavButton>
          </Chlink>
        </ButtonGroup>
        <ButtonGroup w="45%" flexDirection={["column", "row"]}>
          {!user && (
            <Chlink as={Link} to="/register">
              <Button sx={navButtonStyles} variant="outline">
                <Icon as={HowToRegIcon} fontSize={"3xl"} />
                Register
              </Button>
            </Chlink>
          )}
          {!user && (
            <Chlink as={Link} to="/login">
              <Button sx={navButtonStyles} variant="outline">
                <Icon ml={1} as={LoginIcon} fontSize={"3xl"} />
                Login
              </Button>
            </Chlink>
          )}
          {user && (
            <Chlink as={Link} to="/profile">
              <Button sx={navButtonStyles} variant="outline">
                <Avatar
                  name={user?.user?.user_name}
                  src={user?.user?.user_avatar}
                  size={"sm"}
                />
                <Text ml={1}>{user?.user?.user_name}</Text>
              </Button>
            </Chlink>
          )}
          {user && (
            <Button sx={navButtonStyles} variant="outline" onClick={logout}>
              <Icon as={LogoutIcon} fontSize={"3xl"} />
              Logout
            </Button>
          )}
          <FormControl id="shopping-cart-modal-control">
            <ShoppingCartModal id="shopping-cart-modal" />
          </FormControl>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}
