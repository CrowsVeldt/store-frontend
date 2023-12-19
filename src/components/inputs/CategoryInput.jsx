import {
  Button,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function CategoryInput({ state }) {
  const { category, handleCategoryChange, removeCategoryInput } = state;

  const [currentValue, setCurrentValue] = useState(category);
  const categories = useLoaderData();

  return (
    <Menu overflow={"scroll"} isLazy>
      <ButtonGroup>
        <Button
          colorScheme="teal"
          onClick={() => removeCategoryInput(currentValue)}
        >
          -
        </Button>
        <MenuButton as={Button}>{`${currentValue.category_name}`}</MenuButton>
        <MenuList h={"20vh"} sx={{ overflow: "scroll" }}>
          {categories?.map((cat) => {
            if (cat._id !== category._id) {

              return (
                <MenuItem
                  key={cat._id}
                  onClick={() => {
                    setCurrentValue(cat);
                    handleCategoryChange(cat, currentValue);
                  }}
                >
                  {cat.category_name}
                </MenuItem>
              );
}
          })}
        </MenuList>
      </ButtonGroup>
    </Menu>
  );
}
