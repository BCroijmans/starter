import React from "react";
import { Button } from "@chakra-ui/react";

export const DeleteButton = ({ onClick }) => {
  return (
    <Button colorScheme="red" onClick={onClick}>
      Delete event
    </Button>
  );
};
