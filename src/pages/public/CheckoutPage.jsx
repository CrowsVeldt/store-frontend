import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const [totalPrice, setTotalPrice] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);

  const [values, setValues] = useState({
    name: user?.user?.user_name || "",
    email: user?.user?.user_email || "",
    phone: user?.user?.user_phone || "",
    city: user?.user?.user_address.city || "",
    street: user?.user?.user_address.street || "",
    building: user?.user?.user_address.building || "",
    apartment: user?.user?.user_address.apartment || "",
  });
  const [paymentValues, setPaymentValues] = useState({
    credit: "4111111111111111",
    expDate: "12/28",
    cvv: "123",
  });
  const cartDetails = cartItems.map(
    ({ product_image, ...restOfItem }) => restOfItem
  );

  // seperate user_avatar from user
  const { user_avatar, ...userDetails } = user ? user : { userId: "no-user" };

  if (userDetails.userId === "no-user") {
    toast.warn("Please log in before purchasing");
    nav("/login", { replace: true });
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    const { credit, expDate, cvv } = paymentValues;

    try {
      const {
        data: { paymentStatus },
      } = await axios.post("/payments/pay", {
        cartDetails,
        cartTotal: totalPrice,
        creditNumber: credit,
        expDate,
        cvv,

        orderDetails: {
          userId: user?.user?._id,
          customer_details: {
            customer_name: values.name,
            customer_email: values.email,
            customer_phone: values.phone,
            customer_address: {
              city: values.city,
              street: values.street,
              building: values.building,
              apartment: values.apartment,
            },
          },
          products: cartItems.map((pr) => {
            return {
              product: pr._id,
              RTP: pr.product_price,
              quantity: pr.quantity,
            };
          }),
        },
      });
      console.log(paymentStatus);

      window.location.href = paymentStatus.redirectUrl;
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreditChange = (e) => {
    setPaymentValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const updatedNumber = cartItems.length;

    setTotalProducts(updatedNumber);

    const totalPrice = cartItems.reduce(
      (total, item) => total + item.quantity * item.product_price,
      0
    );

    setTotalPrice(totalPrice.toFixed(2));
  }, [cartItems]);

  return (
    <Box py={[2, 10]} >
      <Heading as="h2" size="xl" m={4}>
        Order Items
      </Heading>
      <Center>
        <Grid w={["90%"]}>
          <GridItem>
            <Grid
              templateColumns={"repeat(4, 1fr)"}
              textDecoration={"underline"}
              textAlign={"center"}
            >
              <GridItem>Product</GridItem>
              <GridItem>Price</GridItem>
              <GridItem>Quantity</GridItem>
              <GridItem>Total</GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            {cartItems.map((item) => (
              <Grid
                textAlign={"center"}
                key={item._id}
                templateColumns={"repeat(4, 1fr)"}
                borderBottom={"1px solid black"}
              >
                <GridItem>{item.product_name}</GridItem>
                <GridItem>${item.product_price}</GridItem>
                <GridItem>
                  <Text as="b">{item.quantity}</Text>
                </GridItem>
                <GridItem>
                  ${(item.quantity * item.product_price).toFixed(2)}
                </GridItem>
              </Grid>
            ))}
          </GridItem>
          <GridItem>
            <Grid templateColumns={"repeat(4, 1fr)"}>
              <GridItem></GridItem>
              <GridItem></GridItem>
              <GridItem></GridItem>
              <GridItem>Cart Total: ${totalPrice}</GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Center>
      <Heading m={4}>Customer and Shipping details</Heading>
      <Box mb={4}>
        <Flex direction="column" mb={4}>
          <Input
            value={values.name}
            isRequired
            onChange={handleChange}
            name="name"
            placeholder="Full Name"
            mb={2}
          />
          <Input
            value={values.email}
            isRequired
            onChange={handleChange}
            name="email"
            placeholder="Email"
            type="email"
            mb={2}
          />
          <Input
            value={values.phone}
            isRequired
            onChange={handleChange}
            name="phone"
            placeholder="Phone"
            mb={2}
          />
          <Input
            value={values.city}
            isRequired
            onChange={handleChange}
            name="city"
            placeholder="City"
            mb={2}
          />
          <Input
            value={values.street}
            isRequired
            onChange={handleChange}
            name="street"
            placeholder="Street Address"
            mb={2}
          />
          <Input
            value={values.building}
            isRequired
            onChange={handleChange}
            name="building"
            placeholder="Building Number"
            mb={2}
          />
          <Input
            value={values.apartment}
            isRequired
            onChange={handleChange}
            name="apartment"
            placeholder="Apartment Number"
            mb={2}
          />
        </Flex>
      </Box>
      <Heading m={4}>Credit Card Details</Heading>
      <Box mb={4}>
        <Flex direction="column" mb={4}>
          <Input
            value={
              paymentValues.credit ? paymentValues.credit : "4111111111111111"
            }
            isRequired
            onChange={handleCreditChange}
            name="credit"
            placeholder="Card Number"
            mb={2}
            min={8}
            max={16}
          />
          <Input
            value={paymentValues.expDate ? paymentValues.expDate : "12/28"}
            isRequired
            onChange={handleCreditChange}
            name="expDate"
            placeholder="Expiration Date"
            mb={2}
          />
          <Input
            value={paymentValues.cvv ? paymentValues.cvv : "123"}
            isRequired
            onChange={handleCreditChange}
            name="cvv"
            placeholder="CVV"
            mb={2}
          />
        </Flex>
      </Box>
      <Button type="submit" colorScheme="teal">
        Place Order
      </Button>
    </Box>
  );
}
