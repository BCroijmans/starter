import { Button } from "@chakra-ui/react";

export const EditButton = ({ onClick }) => {
  return (
    <Button m="2" backgroundColor="yellow" color="black" onClick={onClick}>
      Edit
    </Button>
  );
};
