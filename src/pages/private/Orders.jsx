import { Box, Heading, Text, UnorderedList } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import OrdersList from "../../components/orders/OrdersList";

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
        {(orders.length > 0 && (
          <OrdersList orders={orders} editable={false} />
        )) || <Text>No orders found</Text>}
      </UnorderedList>
    </Box>
  );
}
