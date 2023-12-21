import { Box, Button, Grid, GridItem, Heading } from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import AdminProductItem from "../../components/product/AdminProductItem";

export default function AdminProducts() {
  const getAllProducts = useLoaderData();

  return (
    <Box>
      <Heading>Products</Heading>
      <Button as={Link} to={"/admin/add/product"}>
        Add new product
      </Button>
      <Grid templateColumns={"repeat(5, 1fr)"} w={"80vw"} my={1}>
        <GridItem w={`${80 / 5}vw`} display={["none", "none", "inline"]}>
          Name
        </GridItem>
        <GridItem w={`${80 / 5}vw`} display={["none", "none", "inline"]}>
          Price
        </GridItem>
        <GridItem w={`${80 / 5}vw`} display={["none", "none", "inline"]}>
          Description
        </GridItem>
        <GridItem w={`${80 / 5}vw`} display={["none", "none", "inline"]}>
          Image
        </GridItem>
        <GridItem w={`${80 / 5}vw`} display={["none", "none", "inline"]}>
          Categories
        </GridItem>
      </Grid>
      {getAllProducts.map((item, index) => {
        return (
          <AdminProductItem
            state={{ item, index }}
            key={index + item.product_name}
          />
        );
      })}
    </Box>
  );
}
