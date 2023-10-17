import { React } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { EventsPage } from "./pages/EventsPage";
import { EventPage } from "./pages/EventPage";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/events" element={<EventsPage />} />
          <Route path="/event/:eventId" element={<EventPage />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
