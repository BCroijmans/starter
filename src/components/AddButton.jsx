import { Button } from "@chakra-ui/react";

export const AddButton = ({ onClick }) => {
  return (
    <Button backgroundColor="yellow" color="black" onClick={onClick}>
      Add Event
    </Button>
  );
};
