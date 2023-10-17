import { Box, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <Box bg="teal.500" p="2">
      <Link as={RouterLink} to="/events" color="white" mr="4">
        Events
      </Link>
    </Box>
  );
};
