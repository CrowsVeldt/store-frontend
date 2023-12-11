import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import OrderItem from "../../components/orders/OrderItem";

export default function AdminOrders() {
  const privateRoutes = useAxiosPrivate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const fetch = await privateRoutes.get("/admin/orders");
      setOrders([...fetch.data.data]);
    })();
  }, []);

  return (
    <Box>
      <Heading>Orders</Heading>
      {orders.map((order, index) => {
        return <OrderItem order={order} key={index} />;
      })}
    </Box>
  );
}
