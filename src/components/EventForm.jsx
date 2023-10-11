import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

export const EventForm = ({ onAddEvent }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({ title, description, image, startTime, endTime });
    setTitle("");
    setDescription("");
    setImage("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <Box as="form" p="5" shadow="md" borderWidth="1px" onSubmit={handleSubmit}>
      <FormControl id="title">
        <FormLabel>Title</FormLabel>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl id="description">
        <FormLabel>Description</FormLabel>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>
      <FormControl id="image">
        <FormLabel>Image URL</FormLabel>
        <Input
          id="text"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </FormControl>
      <FormControl id="startTime">
        <FormLabel>Start Time</FormLabel>
        <Input
          id="startTime"
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </FormControl>
      <FormControl id="endTime">
        <FormLabel>End Time</FormLabel>
        <Input
          id="endTime"
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit">
        Add Event
      </Button>
    </Box>
  );
};
