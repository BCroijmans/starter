import { Button } from "@chakra-ui/react";

export const AddButton = ({ onClick }) => {
  return (
    <Button color="red" onClick={onClick}>
      Add Event
    </Button>
  );
};
