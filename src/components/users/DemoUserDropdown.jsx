import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMoreOutlined";

export default function DemoUserDropdown({ action }) {
  return (
    <Box>
      <Menu>
        <MenuButton as={Button} rightIcon={<ExpandMoreIcon />}>
          Demo Users
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => action(0)}>Regular User</MenuItem>
          <MenuItem onClick={() => action(1)}>Admin User</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
