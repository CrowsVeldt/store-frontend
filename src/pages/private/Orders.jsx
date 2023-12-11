import { Box, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import OrderItem from "../../components/orders/OrderItem";

export default function UserOrders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const usePrivateRoutes = useAxiosPrivate();

  useEffect(() => {
    (async () => {
      const userOrders = await usePrivateRoutes.get(
        `/orders/${user?.user?._id}/orders`
      );
      setOrders(userOrders.data.orders);
    })();
  }, []);

  return (
    <Box>
      <Heading>User Orders</Heading>
      <UnorderedList>
        {(orders.length > 0 &&
          orders.map((order, index) => {
            return <OrderItem order={order} key={index} />;
          })) || <Text>No orders found</Text>}
      </UnorderedList>
    </Box>
  );
}
