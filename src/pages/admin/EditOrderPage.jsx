import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import OrderProductItem from "../../components/orders/OrderProductItem";

export default function EditOrder() {
  const location = useLocation();
  const order = location.state;
  const nav = useNavigate();
  const axiosPrivateRoute = useAxiosPrivate();

  const [values, setValues] = useState({
    _id: order?._id,
    user: order?.user,
    customer_details: {
      customer_name: order?.customer_details?.customer_name,
      customer_email: order?.customer_details?.customer_email,
      customer_phone: order?.customer_details?.customer_phone,
      customer_address: {
        city: order?.customer_details?.customer_address?.city || "",
        street: order?.customer_details?.customer_address?.street || "",
        building: order?.customer_details?.customer_address?.building || "",
        apartment: order?.customer_details?.customer_address?.apartment || "",
      },
    },
    total_price: order?.total_price,
    payment_details: {
      terminal_number: order?.payment_details.terminal_number,
      transaction_number: order?.payment_details.transaction_number,
      last_digits: order?.payment_details.last_digits,
      transaction_date: order?.payment_details.transaction_date,
    },
    products: order?.products, 
    order_status: order?.order_status,
    created_at: order?.created_at,
    order_number: order?.order_number,
  });

  const handleSaveButton = async () => {
    try {
      const response = await axiosPrivateRoute.patch(
        `/orders/${order._id}/admin/edit`,
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

  const handleQuantityChange = (e, index) => {
    const products = values.products
    const prodToChange = products[index]
    prodToChange.quantity = parseInt(e)
    const newProducts = products.toSpliced(index, 1, prodToChange)

    setValues((prevValues) => ({
      ...prevValues,
      products: newProducts

    }));
  };

  const handleRemoveProduct = (e, product) => {
    setValues((prevValues) => ({
      ...prevValues,
      products: prevValues.products.filter(i => i.product !== product)
    }))
  }

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      total_price: (prevValues.products.reduce((acc, prod) => acc += prod.RTP * prod.quantity, 0))
      }))
  }, [values.products])

  return (
    <Box minH="65vh" py={10} px={4}>
      <Stack spacing={2}>
        <Heading as="h3" fontSize="xl" textDecoration={"underline"}>
          Order Details
        </Heading>
        <Text as="span" fontWeight="bold">
          User Id: {values?.user}
        </Text>
        <Heading as="h3" fontSize="md" textDecoration={"underline"}>
          Customer Details
        </Heading>
        <Text as="span" fontWeight="bold">
          Name:{" "}
          <Text as={"span"} fontWeight={"normal"}>
            {values?.customer_details.customer_name}
          </Text>
        </Text>
        <Text as="span" fontWeight="bold">
          Email:{" "}
          <Text as={"span"} fontWeight={"normal"}>
            {values?.customer_details.customer_email}
          </Text>
        </Text>
        <Text as="span" fontWeight="bold">
          Phone:{" "}
          <Text as={"span"} fontWeight={"normal"}>
            {values?.customer_details.customer_phone}
          </Text>
        </Text>
        <Heading as="h4" fontSize="lg">
          Address
        </Heading>
        <Text as="span" fontWeight="bold">
          City/Town:{" "}
          <Text as={"span"} fontWeight={"normal"}>
            {values?.customer_details.customer_address.city || "None"}
          </Text>
        </Text>
        <Text as="span" fontWeight="bold">
          Street:{" "}
          <Text as={"span"} fontWeight={"normal"}>
            {values?.customer_details.customer_address.street || "None"}
          </Text>
        </Text>
        <Text as="span" fontWeight="bold">
          Building #:{" "}
          <Text as={"span"} fontWeight={"normal"}>
            {values?.customer_details.customer_address.building || "None"}
          </Text>
        </Text>
        <Text as="span" fontWeight="bold">
          Apartment #:{" "}
          <Text as={"span"} fontWeight={"normal"}>
            {values?.customer_details.customer_address.apartment || "None"}
          </Text>
        </Text>
        <Heading as="h4" fontSize="md" textDecoration={"underline"}>
          Payment Details
        </Heading>
        <Flex>
          <Text fontWeight="bold" w={"14rem"}>
            Terminal Number:
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
        </Flex>
        <Flex>
          <Text fontWeight="bold" w={"14rem"}>
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
        </Flex>
        <Flex>
          <Text fontWeight="bold" w={"14rem"}>
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
        </Flex>
        <Flex>
          <Text fontWeight="bold" w={"14rem"}>
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
        </Flex>
        {values?.products.map((product, index) => {
          return (
            <OrderProductItem
              product={product?.product}
              RTP={product?.RTP}
              quantity={values?.products[index]?.quantity}
              index={index}
              handleQuantity={handleQuantityChange}
              removeProduct={ handleRemoveProduct }
              key={index}
            />
          );
        })}
        <Flex>
          <Text fontWeight="bold" w={"14rem"}>
            Total Price: {values.total_price}
          </Text>
        </Flex>
        <Flex>
          <Text fontWeight="bold" w={"14rem"}>
            Order Status:{" "}
          </Text>
          <Input
            name="order_status"
            type="text"
            placeholder={`${
              values.order_status ? values.order_status : "Order Status"
            }`}
            value={values.order_status || ""}
            onChange={handleChange}
          />
        </Flex>
        <Flex>
          <Text fontWeight="bold" w={"14rem"}>
            Created At:{" "}
          </Text>
          <Input
            name="created_at"
            type="text"
            placeholder={`${
              values.created_at ? values.created_at : "Created At"
            }`}
            value={values.created_at || ""}
            onChange={handleChange}
          />
        </Flex>
        <Flex>
          <Text fontWeight="bold" w={"14rem"}>
            Order Number:{" "}
          </Text>
          <Input
            name="order_number"
            type="text"
            placeholder={`${
              values.order_number ? values.order_number : "Order Number"
            }`}
            value={values.order_number || ""}
            onChange={handleChange}
          />
        </Flex>
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
