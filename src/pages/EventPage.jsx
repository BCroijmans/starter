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
    // Make a PUT request to your server
    fetch(`http://localhost:3000/events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setEvent(data); // Update the event with the updated data
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = () => {
    // Make a DELETE request to your server
    fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log("Success:", response);
        // Redirect to the events page or another page
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
          <DeleteButton onClick={handleDelete} />
        </>
      )}
    </Box>
  );
};
