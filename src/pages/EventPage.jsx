import { useEffect, useState, useRef } from "react";
import {
  Box,
  Image,
  Flex,
  Badge,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { EditButton } from "../components/EditButton";
import { DeleteButton } from "../components/DeleteButton";
import { EventForm } from "../components/EventForm";

export const EventPage = () => {
  const [event, setEvent] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { eventId } = useParams();
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const responseEvent = await fetch(
        `http://localhost:3000/events/${eventId}`
      );
      const dataEvent = await responseEvent.json();
      setEvent(dataEvent);

      const responseCategories = await fetch(
        "http://localhost:3000/categories"
      );
      const dataCategories = await responseCategories.json();
      setCategories(dataCategories);
    };
    fetchData();
  }, [eventId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setIsOpen(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log("Success:", response);

        navigate("/events");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setIsOpen(false);
  };

  const handleSave = (updatedEvent) => {
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
        setEvent(data);
        setIsEditing(false);
        toast({
          title: "Event updated.",
          description: "The event has been successfully updated.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast({
          title: "An error occurred.",
          description: "Unable to update event.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

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
      <Text mt={2}>{event.location}</Text>
      <Text mt={2}>{event.startTime}</Text>
      <Text mt={2}>{event.endTime}</Text>
      <EditButton onClick={handleEdit} />
      <DeleteButton onClick={handleDelete} />

      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EventForm
              event={event}
              categories={categories}
              onAddEvent={handleSave}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Event
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this event? This action cannot be
              undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};
