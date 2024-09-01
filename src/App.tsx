// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { FlightTable } from "./components/FlightTable";
import { FlightDetails } from "./components/FlightDetail";
import NotFound from "./components/NotFound";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        <Router>
          <ThemeToggle />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<FlightTable />} />
              <Route path="/flight/:id" element={<FlightDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
