import {
  Avatar,
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function EditOrder() {
  const location = useLocation();
  const order = location.state;
  const nav = useNavigate();
  const axiosPrivateRoute = useAxiosPrivate();

  const [values, setValues] = useState({
    _id: order?._id,
    user: order?.user,
    customer_details: {
      customer_name: order?.customer_details.customer_name,
      customer_email: order?.customer_details.customer_email,
      customer_phone: order?.customer_details.customer_phone,
      customer_address: {
        city: order?.customer_details.city,
        street: order?.customer_details.street,
        building: order?.customer_details.building,
        apartment: order?.customer_details.apartment,
      },
    },
    total_price: order?.total_price,
    payment_details: {
      terminal_number: order?.payment_details.terminal_number,
      transaction_number: order?.payment_details.transaction_number,
      last_digits: order?.payment_details.last_digits,
      transaction_date: order?.payment_details.transaction_date,
    },
    products: order?.products, // product, RTP, quantity // not sure how to do this one
    order_status: order?.order_status,
    created_at: order?.created_at,
    order_number: order?.order_number,
  });

  const handleSaveButton = async () => {
    try {
      const response = await axiosPrivateRoute.patch(
        `/admin/${order._id}/edit/order`,
        values
      );

      setValues((prevValues) => {
        return { ...prevValues, ...response?.data?.order };
      });

      nav("/admin/edit/order", {
        state: response.data.order,
        replace: true,
      });

      toast.success(`Updated order #${values._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleNestedChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      customer_details: {
        ...prevValues?.customer_details,
        [e.target.name]: e?.target?.value,
      },
      payment_details: {
        ...prevValues?.payment_details,
        [e.target.name]: e?.target?.value,
      },
    }));
  };

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e?.target?.name]: e?.target?.value,
    }));
  };

  return (
    <Box minH="65vh" py={10} px={4}>
      <Stack spacing={2}>
        <Heading as="h3" fontSize="lg">
          Order Details
        </Heading>
        <Text fontSize="md">
          <Text as="span" fontWeight="bold">
            User:{" "}
          </Text>
          <Input
            name="user"
            type="text"
            placeholder={`${values.user ? values.user : "User"}`}
            value={values?.user || ""}
            onChange={handleChange}
          />
        </Text>
        <Heading as="h3" fontSize="lg">
          Customer Details
        </Heading>
        <Text>
          <Text as="span" fontWeight="bold">
            Customer Name:{" "}
          </Text>
          <Input
            name="customer_name"
            type="text"
            placeholder={`${
              values.customer_details.customer_name
                ? values.customer_details.customer_name
                : "Customer Name"
            }`}
            value={values.customer_details.customer_name || ""}
            onChange={handleNestedChange}
          />
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Customer Email:{" "}
          </Text>
          <Input
            name="customer_email"
            type="text"
            placeholder={`${
              values.customer_details.customer_email
                ? values.customer_details.customer_email
                : "Customer Email"
            }`}
            value={values.customer_details.customer_email || ""}
            onChange={handleNestedChange}
          />
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Customer Phone:{" "}
          </Text>
          <Input
            name="customer_phone"
            type="text"
            placeholder={`${
              values.customer_details.customer_phone
                ? values.customer_details.customer_phone
                : "Customer Phone"
            }`}
            value={values.customer_details.customer_phone || ""}
            onChange={handleNestedChange}
          />
        </Text>
        <Heading as="h3" fontSize="lg">
          Customer Address
        </Heading>
        <Text>
          <Text as="span" fontWeight="bold">
            City:{" "}
          </Text>
          <Input
            name="city"
            type="text"
            placeholder={`${
              values.customer_details.customer_address.city
                ? values.customer_details.customer_address.city
                : "City"
            }`}
            value={values.customer_details.customer_address.city || ""}
            onChange={handleNestedChange}
          />
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Street:{" "}
          </Text>
          <Input
            name="street"
            type="text"
            placeholder={`${
              values.customer_details.customer_address.street
                ? values.customer_details.customer_address.street
                : "Street"
            }`}
            value={values.customer_details.customer_address.street || ""}
            onChange={handleNestedChange}
          />
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Building:{" "}
          </Text>
          <Input
            name="building"
            type="text"
            placeholder={`${
              values.customer_details.customer_address.building
                ? values.customer_details.customer_address.building
                : "Building"
            }`}
            value={values.customer_details.customer_address.building || ""}
            onChange={handleNestedChange}
          />
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Apartment:{" "}
          </Text>
          <Input
            name="apartment"
            type="text"
            placeholder={`${
              values.customer_details.customer_address.apartment
                ? values.customer_details.customer_address.apartment
                : "Apartment"
            }`}
            value={values.customer_details.customer_address.apartment || ""}
            onChange={handleNestedChange}
          />
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Total Price:{" "}
          </Text>
          <Input
            name="total_price"
            type="text"
            placeholder={`${
              values.total_price ? values.total_price : "Total Price"
            }`}
            value={values.total_price || ""}
            onChange={handleNestedChange}
          />
        </Text>
        <Heading as="h3" fontSize="lg">
          Payment Details
        </Heading>
        <Text>
          <Text as="span" fontWeight="bold">
            Terminal Number:{" "}
          </Text>
          <Input
            name="terminal_number"
            type="text"
            placeholder={`${
              values.payment_details.terminal_number
                ? values.payment_details.terminal_number
                : "Terminal Number"
            }`}
            value={values.payment_details.terminal_number || ""}
            onChange={handleNestedChange}
          />
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Transaction Number:{" "}
          </Text>
          <Input
            name="transaction_number"
            type="text"
            placeholder={`${
              values.payment_details.transaction_number
                ? values.payment_details.transaction_number
                : "Transaction Number"
            }`}
            value={values.payment_details.transaction_number || ""}
            onChange={handleNestedChange}
          />
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Last Digits:{" "}
          </Text>
          <Input
            name="last_digits"
            type="text"
            placeholder={`${
              values.payment_details.last_digits
                ? values.payment_details.last_digits
                : "Last Digits"
            }`}
            value={values.payment_details.last_digits || ""}
            onChange={handleNestedChange}
          />
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Transaction Date:{" "}
          </Text>
          <Input
            name="transaction_date"
            type="text"
            placeholder={`${
              values.payment_details.transaction_date
                ? values.payment_details.transaction_date
                : "Transaction Date"
            }`}
            value={values.payment_details.transaction_date || ""}
            onChange={handleNestedChange}
          />
        </Text>
        {/* make OrderProductInput component -- product, RTP, quantity */}
        <Text>
          <Text as="span" fontWeight="bold">
            Order Status:{" "}
          </Text>
          <Input
            name="order_status"
            type="text"
            placeholder={`${
              values.order_status ? values.order_status : "Order Status"
            }`}
            value={values.order_status || ""}
            onChange={handleNestedChange}
          />
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Created At:{" "}
          </Text>
          <Input
            name="created_at"
            type="text"
            placeholder={`${
              values.created_at ? values.created_at : "Created At"
            }`}
            value={values.created_at || ""}
            onChange={handleNestedChange}
          />
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Order Number:{" "}
          </Text>
          <Input
            name="order_number"
            type="text"
            placeholder={`${
              values.order_number ? values.order_number : "Order Number"
            }`}
            value={values.order_number || ""}
            onChange={handleNestedChange}
          />
        </Text>
      </Stack>
      <Button mt={4} colorScheme="teal" onClick={handleSaveButton}>
        Save
      </Button>
    </Box>
  );
}

/* 
  Order Schema: {
    _id,
    user: user<ref>,
    customer_details: {
        customer_name,
        customer_email,
        customer_phone,
        customer_address: {
          city,
          street,
          building,
          apartment,
        },
    },
    total_price,
    payment_details: {
      terminal_number,
      transaction_number,
      last_digits,
      transaction_date,
    },
    products: [
      {
        product: product<ref>,
        RTP,
        quantity,
      },
      etc.
    ],
    order_status,
    created_at,
    order_number,
  } 
*/
