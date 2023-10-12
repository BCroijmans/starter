import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  let navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }

  function handleRegister() {
    navigate("/register");
  }
  return (
    <Box p="4">
      <h1>Welcome to My Website!</h1>
      <Button onClick={handleLogin} colorScheme="teal" mr="4">
        Login
      </Button>
      <Button onClick={handleRegister} colorScheme="teal">
        Register
      </Button>
    </Box>
  );
};
