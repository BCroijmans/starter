import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Image,
  Flex,
  Badge,
  Text,
  Input,
  Modal,
  Select,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
  ChakraProvider,
  extendTheme,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AddButton } from "../components/Addbutton";
import { EventForm } from "../components/EventForm";
import { formatTime } from "../components/StartEndTime";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEvents = await fetch("http://localhost:3000/events");
        const dataEvents = await responseEvents.json();
        setEvents(dataEvents);

        const responseCategories = await fetch(
          "http://localhost:3000/categories"
        );
        const dataCategories = await responseCategories.json();
        setCategories(dataCategories);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const filteredEvents = events.filter((event) => {
    const filterNum = Number(filter);
    return (
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "" || event.categoryIds.includes(filterNum))
    );
  });

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
      <Box backgroundColor="black" color="white">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <Input
            fontWeight="bold"
            backgroundColor="yellow"
            color="black"
            id="searchEvents"
            name="searchEvents"
            placeholder="Search events"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <Select
            fontWeight="bold"
            bg="yellow"
            color="black"
            id="select"
            name="select"
            placeholder="All categories"
            onChange={(event) => setFilter(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <AddButton onClick={() => setIsAdding(true)} />

          <Modal isOpen={isAdding} onClose={() => setIsAdding(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Event</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <EventForm
                  event={{ title: "", description: "" }}
                  categories={categories}
                  onAddEvent={(newEvent) => {
                    fetch("http://localhost:3000/events", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(newEvent),
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        setEvents([...events, data]);
                        setIsAdding(false);
                        toast({
                          title: "Event added.",
                          description:
                            "Your event has been successfully added.",
                          status: "success",
                          duration: 9000,
                          isClosable: true,
                        });
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                        toast({
                          title: "An error occurred.",
                          description: "Unable to add event.",
                          status: "error",
                          duration: 9000,
                          isClosable: true,
                        });
                      });
                  }}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
          {filteredEvents.map((event) => {
            const categoryNames = event.categoryIds
              ? event.categoryIds.map(
                  (id) =>
                    categories.find((category) => category.id === id)?.name
                )
              : [];

            return (
              <Box key={event.id} p="5" shadow="md" borderWidth="1px">
                <Link to={`/event/${event.id}`}>
                  <Image
                    borderRadius="md"
                    src={event.image}
                    w="100%"
                    h="300px"
                    objectFit="cover"
                  />
                  <Flex align="baseline" mt={2}>
                    <Badge bg="yellow">Plus</Badge>
                    <Heading
                      ml={2}
                      textTransform="uppercase"
                      fontSize="2xl"
                      fontWeight="bold"
                      color="Yellow"
                    >
                      {event.title}
                    </Heading>
                  </Flex>
                  {categoryNames.length > 0 && (
                    <Box mt={2}>
                      <Text
                        color="black"
                        bg="rgba(255, 255, 0, 0.5)"
                        fontWeight="bold"
                      >
                        Categories:
                      </Text>
                      {categoryNames.map((name, index) => (
                        <Text
                          color="black"
                          bg="rgba(255, 255, 0, 0.5)"
                          key={index}
                        >
                          {name}
                        </Text>
                      ))}
                    </Box>
                  )}
                  <Box color="black" fontSize="md" pb="2rem">
                    {" "}
                    <Heading bg="rgba(255, 255, 0, 0.5)" fontSize="md" mt={2}>
                      What are we going to do ?
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
                      Start time event :
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
                      End time event :
                    </Heading>
                    <Text bg="rgba(255, 255, 0, 0.5)">
                      {formatTime(event.endTime)}
                    </Text>
                  </Box>
                </Link>
              </Box>
            );
          })}
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
