import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function PurchasePage() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const [totalPrice, setTotalPrice] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [payments, setPayments] = useState(null);

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
    credit: "",
    expDate: "",
    cvv: "",
  });

  const continuePlaceOrder = async (paymentStatus) => {
    try {
      const end_point = user ? "customer-order" : "order";

      const { data: order_status } = await axios.post(
        "/orders/customer-order",
        {
          user: user?.user?._id,
          customer_details: {
            customer_name: values.name,
            customer_email: values.email,
            customer_phone: values.phone,
            customer_address: {
              street: values.street,
              city: values.city,
              building: values.building,
              apartment: values.apartment,
            },
          },
          payment_details: paymentStatus,
          products: cartItems.map((pr) => {
            return {
              product: pr._id,
              RTP: pr.product_price,
              quantity: pr.quantity,
            };
          }),
        }
      );
      setCartItems([]);
      // console.log(order_status.data);
      // alert(`Your order is placed, order number: ${order_status.order_number}`);
      nav("/");
    } catch (error) {
      toast.error(error.response?.data.error);
    }
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { paymentStatus },
      } = await axios.post("/payments/pay", {
        credit_number: paymentValues.credit,
      });
      setPayments(paymentStatus);
      continuePlaceOrder(paymentStatus);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e?.target?.name]: e?.target?.value,
    }));
  };

  const handleCreditChange = (e) => {
    setPaymentValues((prevValues) => ({
      ...prevValues,
      [e?.target?.name]: e?.target?.value,
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
    <form onSubmit={placeOrder}>
      <Box minH="65vh" maxW="90%" mx="auto" py={10} px={4}>
        <Heading as="h2" size="xl" mb={4}>
          Order Items
        </Heading>
        <Box mb={4}>
          <Table colorScheme="black">
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Price</Th>
                <Th minW={170}>Quantity</Th>
                <Th>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cartItems.map((item) => (
                <Tr key={item._id}>
                  <Td>{item.product_name}</Td>
                  <Td>${item.product_price}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>${(item.quantity * item.product_price).toFixed(2)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Heading as="h3" size="md" mt={2}>
            Cart Total: ${totalPrice}
          </Heading>
        </Box>
        <Heading mb={4}> Customer and Shipping Details </Heading>
        <Box mb={4}>
          <Flex direction="column" m={4}>
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
              type="Email"
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
              value={values.street}
              isRequired
              onChange={handleChange}
              name="street"
              placeholder="Street"
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
        <Heading m={4}>Payment Details</Heading>
        <Box mb={4}>
          <Flex direction="column" mb={4}>
            <Input
              value={paymentValues.credit}
              isRequired
              onChange={handleCreditChange}
              name="credit"
              placeholder="Credit Card Number"
              mb={2}
            />
            <Input
              value={paymentValues.expDate}
              isRequired
              onChange={handleCreditChange}
              name="expDate"
              placeholder="Expiration Date"
              mb={2}
            />
            <Input
              value={paymentValues.cvv}
              isRequired
              onChange={handleCreditChange}
              name="cvv"
              placeholder="CVV"
              mb={2}
            />
          </Flex>
        </Box>
        <Button type="submit">Place Order</Button>
      </Box>
    </form>
  );
}
