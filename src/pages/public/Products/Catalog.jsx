import {
  Box,
  CircularProgress,
  Divider,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import localforage from "localforage";
import axios from "../../../api/axios";
import { CartContext } from "../../../context/CartContext";
import ProductCard from "../../../components/product/ProductCard";
import Pagination from "./Pagination";

export const getAllProducts = async () => {
  try {
    const {
      data: { products },
    } = await axios.get("/products/customers/all");
    return products;
  } catch (error) {
    toast.error("Failed to load products");
    return error;
  }
};

export default function Catalog() {
  const products = useLoaderData();
  const [data, setData] = useState(false);
  const { addToCart } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    localforage.getItem(`main page`, (err, val) => {
      if (!err && val) {
        setCurrentPage(val);
      } else {
        // console.log(err);
      }
    });
  });

  const productPerPage = 6;
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page) => {
    localforage.setItem(`main page`, page, (err, val) => {
      if (!err) {
        setCurrentPage(val);
      } else {
        console.log(err);
      }
    });
  };

  useEffect(() => {
    if (products.length > 0) {
      setData(true);
    }
  }, [products]);

  return (
    <Box minH="65vh" py={10} px={4}>
      <Heading my={5}>Products</Heading>
      <Pagination
        currentPage={currentPage}
        productsPerPage={productPerPage}
        totalProducts={products.length}
        onPageChange={handlePageChange}
      />
      <Divider />
      {data ? (
        <Flex
          direction={["column", "column", "row", "row"]}
          flexWrap="wrap"
          my={6}
          justifyContent="space-between"
        >
          {currentProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            >
              {product.product_name}
            </ProductCard>
          ))}
        </Flex>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress isIndeterminate />
        </Box>
      )}
      <Pagination
        currentPage={currentPage}
        productsPerPage={productPerPage}
        totalProducts={products.length}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
