import { Box, Heading, Text, UnorderedList } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import OrdersList from "../../components/orders/OrdersList";
import LoadingCircle from "../../components/info/LoadingCircle";

export default function UserOrders() {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const usePrivateRoutes = useAxiosPrivate();

  useEffect(() => {
    (async () => {
      try {
        const userOrders = await usePrivateRoutes.get(`/orders/${user?.user?._id}/orders`);
        setOrders(userOrders.data.orders);
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
      }
    })();
  }, []);

  return (
    <Box>
      <Heading>User Orders</Heading>
      {!isLoading ? (
        <UnorderedList>
          {(orders.length > 0 && (
            <OrdersList orders={orders} editable={false} />
          )) || <Text>No orders found</Text>}
        </UnorderedList>
      ) : (
        <LoadingCircle />
      )}
    </Box>
  );
}
