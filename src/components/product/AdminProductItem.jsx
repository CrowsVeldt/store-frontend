import {
  Button,
  Flex,
  Image,
  LinkBox,
  LinkOverlay,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DeleteProductAlert from "../info/DeleteProductAlert";

export default function AdminProductItem({ state }) {
  const { index, item } = state;

  return (
    <Tr data-testid={"product-row"} key={index}>
      <Td>
        <Flex>
          <Text me={2}>{item.product_name}</Text>
          <LinkBox>
            <LinkOverlay
              as={Link}
              to={"/admin/edit/product"}
              state={item}
              _hover={{ color: "teal" }}
              textDecoration={"underline"}
            >
              <Text>(Edit)</Text>
            </LinkOverlay>
          </LinkBox>
        </Flex>
        <Flex>
          <DeleteProductAlert productId={item._id} />
        </Flex>
      </Td>
      <Td>{item.product_price}</Td>
      <Td>{item.product_description}</Td>
      <Td>{<Image src={item.product_image} />}</Td>
      <Td>
        {item.categories.map((cat, index) => {
          return <Text key={index + cat}>{cat.category_name}</Text>;
        })}
      </Td>
    </Tr>
  );
}
