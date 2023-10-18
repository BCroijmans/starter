import { Box } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box
      bg="yellow"
      p="2"
      position="fixed"
      bottom="0"
      width="100%"
      textAlign="center"
      fontWeight="bold"
      border="solid black 2px "
    >
      © 2023 BC Designs
    </Box>
  );
};
