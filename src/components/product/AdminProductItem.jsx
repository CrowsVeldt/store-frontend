import {
  Center,
  Grid,
  GridItem,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DeleteProductAlert from "../modals/DeleteProductAlert";

export default function AdminProductItem({ state }) {
  const { index, item, reload } = state;

  return (
    <GridItem data-testid={"product-row"} key={index}>
      <Grid
        templateColumns={[null, null, "repeat(5, 1fr)"]}
        borderBottom={"1px solid black"}
        borderTop={"1px solid black"}
        w={"80vw"}
        my={1}
      >
        <GridItem
          w={["80vw", "80vw", `${80 / 5}vw`]}
          borderEnd={"1px solid black"}
          borderStart={"1px solid black"}
        >
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
          <DeleteProductAlert state={{ productId: item._id, reload }} />
        </GridItem>
        <GridItem
          w={["80vw", "80vw", `${80 / 5}vw`]}
          borderStart={"1px solid black"}
          borderEnd={"1px solid black"}
        >
          {item.product_price}
        </GridItem>
        <GridItem
          w={["80vw", "80vw", `${80 / 5}vw`]}
          borderStart={"1px solid black"}
          borderEnd={"1px solid black"}
        >
          {item.product_description}
        </GridItem>
        <GridItem
          w={["80vw", "80vw", `${80 / 5}vw`]}
          borderStart={"1px solid black"}
          borderEnd={"1px solid black"}
        >
          <Center>
            {<Image w={["60%", "60%", "100%"]} src={item.product_image} />}
          </Center>
        </GridItem>
        <GridItem
          w={["80vw", "80vw", `${80 / 5}vw`]}
          borderStart={"1px solid black"}
          borderEnd={"1px solid black"}
        >
          {item.categories.map((cat, index) => {
            return <Text key={index + cat}>{cat.category_name}</Text>;
          })}
        </GridItem>
      </Grid>
    </GridItem>
  );
}
