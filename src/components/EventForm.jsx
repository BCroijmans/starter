import { useState } from "react";
import { Input, Button, Select } from "@chakra-ui/react";

export const EventForm = ({ event, onAddEvent, categories }) => {
  const [title, setTitle] = useState(event.title || "");
  const [description, setDescription] = useState(event.description || "");
  const [image, setImage] = useState(event.image || "");
  const [startTime, setStartTime] = useState(event.startTime || "");
  const [endTime, setEndTime] = useState(event.endTime || "");
  const [location, setLocation] = useState(event.location || "");
  const [categoryIds, setCategoryIds] = useState(event.categoryIds || []);
  const [createdBy, setCreatedBy] = useState(event.createdBy || "");

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({
      title,
      description,
      image,
      startTime,
      endTime,
      location,
      categoryIds,
      createdBy,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="title"
        name="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <Input
        id="description"
        name="description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <Input
        id="image"
        name="image"
        type="file"
        onChange={handleImageUpload}
        placeholder="Upload Image"
      />
      <Input
        id="startTime"
        name="startTime"
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        placeholder="Start Time"
      />
      <Input
        id="endTime"
        name="endTime"
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        placeholder="End Time"
      />
      <Input
        id="location"
        name="location"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <Select
        id="categoryIds"
        name="categoryIds"
        placeholder="Select category"
        onChange={(e) => setCategoryIds([Number(e.target.value)])}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
      <Select
        id="select user"
        name="select user"
        placeholder="Created By (User ID)"
        onChange={(e) => setCreatedBy(Number(e.target.value))}
      >
        <option value={1}>User 1</option>
        <option value={2}>User 2</option>
      </Select>
      <Button type="submit">Save</Button>
    </form>
  );
};
