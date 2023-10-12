import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <Box as="form" p="5" shadow="md" borderWidth="1px" onSubmit={handleSubmit}>
      <FormControl id="username">
        <FormLabel>Username</FormLabel>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit">
        Login
      </Button>
    </Box>
  );
};
