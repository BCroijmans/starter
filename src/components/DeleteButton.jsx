import { Button } from "@chakra-ui/react";

export const DeleteButton = ({ onClick }) => {
  return (
    <Button m="2" backgroundColor="yellow" color="black" onClick={onClick}>
      Delete
    </Button>
  );
};
