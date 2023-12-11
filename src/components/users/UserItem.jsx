import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";

export default function UserItem({ user }) {
  const phoneSegments = user.user_phone.match(/.{1,3}/g);
  const endDigits = user.user_phone.slice(-4);
  const formattedPhone = `(${phoneSegments[0]}) ${phoneSegments[1]}-${endDigits}`;

  console.log(formattedPhone);

  return (
    <Box>
      <Accordion defaultIndex={[1]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {`User ID: ${user._id}`}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>{`Name: ${user.user_name}`}</Text>
            <Text>{`Email: ${user.user_email}`}</Text>
            <Text>{`Phone: ${formattedPhone}`}</Text>

            <Accordion defaultIndex={[1]} allowMultiple>
              <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {`Address:`}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                {user.user_address && (
                  <AccordionPanel>
                    <Text>{`City: ${user.user_address.city}`}</Text>
                    <Text>{`Street Name: ${user.user_address.street}`}</Text>
                    <Text>{`Street Number ${user.user_address.building}`}</Text>

                    {user.user_address.apartment && (
                      <Text>{`Apartment Number: ${user.user_address.apartment}`}</Text>
                    )}
                  </AccordionPanel>
                )}
              </AccordionItem>
            </Accordion>

            <Accordion defaultIndex={[1]} allowMultiple>
              <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {`Orders:`}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  {user.user_orders.map((order) => {
                    return (
                      <Box borderBottom={"1px solid black"}>
                        <Text>{`Order ID: ${order.order}`}</Text>
                      </Box>
                    );
                  })}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Text>{`User Avatar: ${"image"}`}</Text>
            <Text>{`User Type: ${
              (user.admin_id && "Admin") || "Customer"
            }`}</Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
