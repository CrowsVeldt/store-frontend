import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import AdminIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
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
  const isAdmin = user?.user.admin_id ? true : false;

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Box position="sticky" w="100%" top="0" zIndex="2" bg="twitter.200">
      <Button
        onClick={handleMenuClick}
        sx={hamburgerStyles}
        size="lg"
        variant="outline"
      >
        <Icon as={MenuIcon} />
      </Button>

      <Flex
        w={"100vw"}
        justifyContent="space-between"
        alignItems={["start","center"]}
        direction={["column", "row"]}
        sx={navStyles(menuOpen)}
      >
        <Button
          as={Link}
          to={"/"}
          sx={navButtonStyles}
          variant={"outline"}
          marginEnd={["none", "auto"]}
        >
          <Icon as={HomeOutlinedIcon} boxSize={["1.5em", "2em"]} />
        </Button>
        {isAdmin && (
          <Button
            as={Link}
            to={"/admin/products"}
            sx={navButtonStyles}
            variant={"outline"}
            marginEnd={"2"}
          >
            <Icon me={1} as={AdminIcon} fontSize={"3xl"} />
            Admin
          </Button>
        )}
        {user && (
          <Flex direction={["column", "row"]} alignItems={["start", "center"]}>
            <Button
              as={Link}
              to={"/profile"}
              sx={navButtonStyles}
              variant={"outline"}
            >
              <Avatar
                name={user?.user?.user_name}
                src={user?.user?.user_avatar}
                size={"sm"}
              />
              <Text ms={1}>{user?.user?.user_name}</Text>
            </Button>
            <Button sx={navButtonStyles} variant={"outline"} onClick={logout}>
              <Icon me={1} as={LogoutIcon} fontSize={"3xl"} />
              Logout
            </Button>
          </Flex>
        )}
        {!user && (
          <Flex direction={["column", "row"]} alignItems={["start", "center"]}>
            <Button
              as={Link}
              to={"/register"}
              sx={navButtonStyles}
              variant={"outline"}
            >
              <Icon me={1} as={HowToRegIcon} fontSize={"3xl"} />
              Register
            </Button>
            <Button
              as={Link}
              to={"/login"}
              sx={navButtonStyles}
              variant={"outline"}
            >
              <Icon me={1} as={LoginIcon} fontSize={"3xl"} />
              Login
            </Button>
          </Flex>
        )}
        <FormControl id="shopping-cart-modal-control" w={"fit-content"}>
          <ShoppingCartModal id="shopping-cart-modal" />
        </FormControl>
      </Flex>
    </Box>
  );
}
