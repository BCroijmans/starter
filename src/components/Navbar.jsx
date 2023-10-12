import { Box, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <Box bg="teal.500" p="2">
      <Link as={RouterLink} to="/" color="white" mr="4">
        Home
      </Link>
      <Link as={RouterLink} to="/events" color="white" mr="4">
        Events
      </Link>
      {/* Add more links as needed */}
    </Box>
  );
};
