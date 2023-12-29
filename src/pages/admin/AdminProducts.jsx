import axios from "../../api/axios";
import { Box, Button, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import AdminProductItem from "../../components/product/AdminProductItem";
import LoadingCircle from "../../components/info/LoadingCircle";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/products/customers/all");
      setProducts(response.data.products);
      setIsLoading(false);
    })();
  }, []);

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
      {isLoading ? (
        <LoadingCircle />
      ) : products.length > 0 ? (
        products.map((item, index) => {
          return (
            <AdminProductItem
              state={{ item, index }}
              key={index + item.product_name}
            />
          );
        })
      ) : (
        <Text>No Products Found</Text>
      )}
    </Box>
  );
}
