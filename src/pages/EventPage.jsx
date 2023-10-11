import React, { useEffect, useState } from "react";
import { Box, Image, Flex, Badge, Text, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const EventPage = () => {
  const [event, setEvent] = useState({});
  const { eventId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/events/${eventId}`);
      const data = await response.json();
      setEvent(data);
    };
    fetchData();
  }, [eventId]);

  return (
    <Box key={event.id} p="5" shadow="md" borderWidth="1px">
      <Image borderRadius="md" src={event.image} />
      <Flex align="baseline" mt={2}>
        <Badge colorScheme="pink">Plus</Badge>
        <Text
          ml={2}
          textTransform="uppercase"
          fontSize="sm"
          fontWeight="bold"
          color="pink.800"
        >
          {event.title}
        </Text>
      </Flex>
      <Text mt={2}>{event.description}</Text>
      <Button colorScheme="blue" onClick={() => alert("Edit event clicked!")}>
        Edit event
      </Button>
      <Button colorScheme="red" onClick={() => alert("Delete event clicked!")}>
        Delete event
      </Button>
    </Box>
  );
};
