import OrderItem from "./OrderItem";

export default function OrdersList({ orders, editable }) {
  return orders.map((order, index) => {
    return (
      <OrderItem order={order} editable={editable} key={order._id + index} />
    );
  });
}
