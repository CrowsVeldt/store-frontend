import axios from "../../../api/axios";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import localforage from "localforage";
import LoadingCircle from "../../../components/info/LoadingCircle";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { CartContext } from "../../../context/CartContext";
import ProductCard from "../../../components/product/ProductCard";
import Pagination from "./ProductPagination";

export const productsPerPage = 6;

export default function Catalog() {
  const { addToCart } = useContext(CartContext);
  const [initialProducts, setInitialProducts] = useState([]);
  const [products, setProducts] = useState([...initialProducts]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/products/customers/all");
        setInitialProducts(response.data.products);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(true);
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    localforage.getItem(`main page`, (err, val) => {
      if (!err && val) {
        setCurrentPage(val);
      } else {
        console.log(err);
      }
    });
  });

  useEffect(() => {
    const searchResults = initialProducts.filter(
      (product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.product_description
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    setProducts(searchResults);
  }, [searchTerm, initialProducts]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const onHandleSearchChange = (e) => {
    handlePageChange(1);
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    localforage.setItem(`main page`, page, (err, val) => {
      if (!err) {
        setCurrentPage(val);
      } else {
        console.log(err);
      }
    });
  };

  return (
    <Box minH="65vh" py={10} px={4}>
      <Heading my={5}>Products</Heading>
      <InputGroup maxW={480}>
        <Input
          placeholder="Search by name or description"
          value={searchTerm}
          onChange={onHandleSearchChange}
        />
        <InputRightElement>
          <Icon as={SearchOutlinedIcon} fontSize={"3xl"} />
        </InputRightElement>
      </InputGroup>
      <Pagination
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        onPageChange={handlePageChange}
      />
      <Divider />

      {isLoading ? (
        <LoadingCircle />
      ) : currentProducts.length > 0 ? (
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
        <Text>No Products Found</Text>
      )}
      <Pagination
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
