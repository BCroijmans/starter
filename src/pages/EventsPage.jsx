import React, { useEffect, useState } from "react";
import { Box, Image, Flex, Badge, Text, Button, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const responseEvents = await fetch("http://localhost:3000/events");
      const dataEvents = await responseEvents.json();
      setEvents(dataEvents);

      const responseCategories = await fetch(
        "http://localhost:3000/categories"
      );
      const dataCategories = await responseCategories.json();
      setCategories(dataCategories);
    };
    fetchData();
  }, []);

  const filteredEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      event.categoryIds.includes(filter)
    );
  });

  return (
    <div>
      <Input
        placeholder="Search events"
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <select onChange={(event) => setFilter(event.target.value)}>
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {filteredEvents.map((event) => (
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
            <Text mt={2}>{event.description}</Text>
          </Link>
        </Box>
      ))}
      <Button colorScheme="blue" onClick={() => alert("Add event clicked!")}>
        Add event
      </Button>
    </div>
  );
};
