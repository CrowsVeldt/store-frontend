import { Box, Heading, Text } from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

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
        return (
          <Text data-testid={"order"} key={index}>
            {order._id}
          </Text>
        );
      })}
    </Box>
  );
}
