import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import OrdersList from "../../components/orders/OrdersList";

export default function AdminOrders() {
  const privateRoutes = useAxiosPrivate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const fetch = await privateRoutes.get("/orders/admin");
      setOrders([...fetch.data.data]);
    })();
  }, []);

  return (
    <Box>
      <Heading>Orders</Heading>
      {(orders.length > 0 && (
        <OrdersList orders={orders} editable={true} />
      )) || <Text>No orders found</Text>}
    </Box>
  );
}
