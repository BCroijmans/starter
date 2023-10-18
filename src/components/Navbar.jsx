import { Box, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <Box bg="yellow" border="black solid 2px" p="4">
      <Link
        as={RouterLink}
        to="/events"
        color="black"
        fontWeight="extrabold"
        mr="4"
      >
        Events
      </Link>
    </Box>
  );
};
