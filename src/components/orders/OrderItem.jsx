import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import {Link} from "react-router-dom"
import { formatPhone } from "../../utils/utilFuncs";

export default function OrderItem({ order }) {
  return (
    <Box>
      <Accordion defaultIndex={[1]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Button as={Link} to={`/admin/edit/order`} state={order}>
                Edit
              </Button>
              <Box as="span" flex="1" textAlign="left">
                {`Order ID: ${order._id}`}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Accordion defaultIndex={[1]} allowMultiple>
              <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {`Customer Details:`}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Text>{`Name: ${order.customer_details.customer_name}`}</Text>
                  <Text>{`Email: ${order.customer_details.customer_email}`}</Text>
                  <Text>{`Phone: ${formatPhone(
                    order.customer_details.customer_phone
                  )}`}</Text>
                  <Accordion defaultIndex={[1]} allowMultiple>
                    <AccordionItem>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          {`Address:`}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      {order.customer_details.customer_address && (
                        <AccordionPanel>
                          <Text>{`City: ${order.customer_details.customer_address.city}`}</Text>
                          <Text>{`Street Name: ${order.customer_details.customer_address.street}`}</Text>
                          <Text>{`Street Number ${order.customer_details.customer_address.building}`}</Text>
                          {order.customer_details.customer_address && (
                            <Text>{`Apartment Number: ${order.customer_details.customer_address.apartment}`}</Text>
                          )}
                        </AccordionPanel>
                      )}
                    </AccordionItem>
                  </Accordion>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Accordion defaultIndex={[1]} allowMultiple>
              <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {`Payment Details:`}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Text>{`Terminal Number: ${order.payment_details.terminal_number}`}</Text>
                  <Text>{`Transaction Number: ${order.payment_details.transaction_number}`}</Text>
                  <Text>{`Last Four Digits: ${order.payment_details.last_digits}`}</Text>
                  <Text>{`Transaction Date: ${order.payment_details.transaction_date}`}</Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Accordion defaultIndex={[1]} allowMultiple>
              <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {`Products:`}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  {order.products.map((product, index) => {
                    return (
                      <Box borderBottom={"1px solid black"} key={index}>
                        <Text>{`Product ID: ${product.product}`}</Text>
                        <Text>{`RTP: ${product.RTP}`}</Text>
                        <Text>{`Quantity: ${product.quantity}`}</Text>
                      </Box>
                    );
                  })}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Text>{`Total Price: ${order.total_price}`}</Text>
            <Text>{`Order Status: ${order.order_status}`}</Text>
            <Text>{`Created At: ${order.created_at}`}</Text>
            <Text>{`Order Number: ${order.order_number}`}</Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

/*
order schema:
    {_id,
    user,
    customer_details: {
        customer_name,
        customer_email,
        customer_phone,
        customer_address: {
            city,
            street,
            building,
            apartment
        }
    },
    total_price,
    payment_details: {
        terminal_number,
        transaction_number,
        last_digits,
        transaction_date
    },
    products: [
        {
            product,
            RTP,
            quantity
        }
    ],
    order_status,
    created_at,
    order_number
}
*/
