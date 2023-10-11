import React, { useEffect, useState } from "react";
import { Box, Image, Flex, Badge, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { EditButton } from "../components/EditButton";
import { DeleteButton } from "../components/DeleteButton";
import { EventForm } from "../components/EventForm";

export const EventPage = () => {
  const [event, setEvent] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/events/${eventId}`);
      const data = await response.json();
      setEvent(data);
    };
    fetchData();
  }, [eventId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedEvent) => {
    // Save updated event to server
    setIsEditing(false);
  };

  return (
    <Box key={event.id} p="5" shadow="md" borderWidth="1px">
      {isEditing ? (
        <EventForm event={event} onAddEvent={handleSave} />
      ) : (
        <>
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
          <EditButton onClick={handleEdit} />
          <DeleteButton onClick={() => alert("Delete event clicked!")} />
        </>
      )}
    </Box>
  );
};
