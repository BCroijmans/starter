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
  ChakraProvider,
  extendTheme,
  Heading,
  Grid,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { EditButton } from "../components/EditButton";
import { DeleteButton } from "../components/DeleteButton";
import { EventForm } from "../components/EventForm";
import { formatTime } from "../components/StartEndTime";

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
  const [users, setUsers] = useState([]);

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

      const responseUsers = await fetch("http://localhost:3000/users");

      const dataUsers = await responseUsers.json();
      setUsers(dataUsers);
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

        useToast({
          title: "Event deleted.",
          description: "The event has been successfully deleted.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        useToast({
          title: "An error occurred.",
          description: "Unable to delete event.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
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
  const creator = users.find((user) => user.id === event.createdBy);
  const categoryNames = event.categoryIds
    ? event.categoryIds.map(
        (id) => categories.find((category) => category.id === id)?.name
      )
    : [];

  return (
    <ChakraProvider // Added extendTheme to set global styles
      theme={extendTheme({
        fonts: {
          heading: "Courier New",
          body: "Courier New",
        },
        styles: {
          global: {
            body: {
              backgroundColor: "black", // Set the background color of the entire page to black
            },
          },
        },
      })}
    >
      <Box
        backgroundColor="black"
        key={event.id}
        p="5"
        shadow="md"
        borderWidth="1px"
        maxWidth={{ base: "90%", md: "80%", lg: "800px" }} // Added responsive maxWidth for different breakpoints
        margin="auto"
      >
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          gap={6}
        >
          <Box>
            <Image borderRadius="md" src={event.image} />
            <Flex align="baseline" mt={2}>
              <Badge bg="yellow">Plus</Badge>
              <Text
                ml={2}
                textTransform="uppercase"
                fontSize="2xl"
                fontWeight="bold"
                color="Yellow"
              >
                {event.title}
              </Text>
            </Flex>
            <EditButton onClick={handleEdit} />
            <DeleteButton onClick={handleDelete} />
          </Box>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            gap={6}
          >
            <Box>
              {categoryNames.length > 0 && (
                <Box mt={2}>
                  <Text bg="rgba(255, 255, 0, 0.5)" fontWeight="bold">
                    Categories:
                  </Text>
                  {categoryNames.map((name, index) => (
                    <Text bg="rgba(255, 255, 0, 0.5)" key={index}>
                      {name}
                    </Text>
                  ))}
                </Box>
              )}
              <Box color="black" fontSize="md" pb="2rem">
                {" "}
                <Heading bg="rgba(255, 255, 0, 0.5)" fontSize="md" mt={2}>
                  Description :
                </Heading>
                <Text bg="rgba(255, 255, 0, 0.5)">{event.description}</Text>
                <Heading
                  bg="rgba(255, 255, 0, 0.5)"
                  fontSize="md"
                  fontWeight="bold"
                  mt={2}
                >
                  Location :{" "}
                </Heading>
                <Text bg="rgba(255, 255, 0, 0.5)">{event.location}</Text>
                <Heading
                  bg="rgba(255, 255, 0, 0.5)"
                  fontSize="md"
                  fontWeight="bold"
                  mt={2}
                >
                  Starttime event :
                </Heading>
                <Text bg="rgba(255, 255, 0, 0.5)">
                  {formatTime(event.startTime)}
                </Text>
                <Heading
                  bg="rgba(255, 255, 0, 0.5)"
                  fontSize="md"
                  fontWeight="bold"
                  mt={2}
                >
                  Endtime event :
                </Heading>
                <Text bg="rgba(255, 255, 0, 0.5)">
                  {formatTime(event.endTime)}
                </Text>
              </Box>
            </Box>

            {creator && (
              <Flex
                key={event.id}
                p="5"
                shadow="md"
                borderWidth="1px"
                direction="column"
                alignItems="center"
              >
                <Box flexShrink={0}>
                  <Image
                    borderRadius="full"
                    boxSize="100px"
                    src={creator.image}
                    alt={creator.name}
                    mb="4"
                  />
                </Box>
                <Box ml={4}>
                  <Text color="yellow" mt={2}>
                    Created By: {creator.name}
                  </Text>
                </Box>
              </Flex>
            )}
          </Grid>
        </Grid>

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
                Are you sure you want to delete this event? This action cannot
                be undone.
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
    </ChakraProvider>
  );
};
