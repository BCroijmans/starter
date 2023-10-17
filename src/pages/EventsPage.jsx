import { useEffect, useState } from "react";
import {
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
    <div>
      <Input
        id="searchEvents"
        name="searchEvents"
        placeholder="Search events"
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <Select
        id="select"
        name="select"
        placeholder="All categories"
        onChange={(event) => setFilter(event.target.value)}
      >
        <option value="category.id">All categories</option>
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
                      description: "Your event has been successfully added.",
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
              (id) => categories.find((category) => category.id === id)?.name
            )
          : [];

        return (
          <Box key={event.id} p="5" shadow="md" borderWidth="1px">
            <Link to={`/event/${event.id}`}>
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
              {categoryNames.length > 0 && (
                <Box mt={2}>
                  <Text fontWeight="bold">Categories:</Text>
                  {categoryNames.map((name, index) => (
                    <Text key={index}>{name}</Text>
                  ))}
                </Box>
              )}
              <Text fontWeight="bold" mt={2}>
                What are we going to do ?
              </Text>
              <Text>{event.description}</Text>
              <Text fontWeight="bold" mt={2}>
                Location :{" "}
              </Text>
              <Text>{event.location}</Text>
              <Text fontWeight="bold" mt={2}>
                Start time event :
              </Text>
              <Text>{formatTime(event.startTime)}</Text>
              <Text fontWeight="bold" mt={2}>
                End time event :
              </Text>
              <Text>{formatTime(event.endTime)}</Text>
            </Link>
          </Box>
        );
      })}
    </div>
  );
};
