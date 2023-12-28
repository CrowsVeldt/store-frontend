import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import OrdersList from "../../components/orders/OrdersList";
import LoadingCircle from "../../components/info/LoadingCircle";

export default function AdminOrders() {
  const privateRoutes = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const fetch = await privateRoutes.get("/orders/admin");
      setOrders([...fetch.data.data]);
      setIsLoading(false);
    })();
  }, []);

  return (
    <Box>
      <Heading>Orders</Heading>
      {(!isLoading ? (
        <OrdersList orders={orders} editable={true} />
      ) : (
        <LoadingCircle />
      )) || <Text>No orders found</Text>}
    </Box>
  );
}
