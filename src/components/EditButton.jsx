import { Button } from "@chakra-ui/react";

export const EditButton = ({ onClick }) => {
  return (
    <Button colorScheme="blue" onClick={onClick}>
      Edit event
    </Button>
  );
};
