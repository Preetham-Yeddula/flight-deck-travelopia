import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FlightTable } from "../../components/FlightTable";
import { BrowserRouter } from "react-router-dom";
import { useFlights } from "../../hooks/useFlights";
import "@testing-library/jest-dom";

// Mock the useFlights hook
jest.mock("../../hooks/useFlights");

const mockFlights = [
  {
    id: "1",
    flightNumber: "AA123",
    airline: "American Airlines",
    origin: "New York",
    destination: "Los Angeles",
    departureTime: "2023-08-31T10:00:00Z",
    status: "On Time",
  },
  // Add more mock flights as needed
];

describe("FlightTable", () => {
  beforeEach(() => {
    (useFlights as jest.Mock).mockReturnValue({
      flights: mockFlights,
      loading: false,
      error: null,
    });
  });

  test("renders flight table with correct data", () => {
    render(
      <BrowserRouter>
        <FlightTable />
      </BrowserRouter>
    );

    expect(
      screen.getByText("Real-Time Flight Status Board")
    ).toBeInTheDocument();
    expect(screen.getByText("AA123")).toBeInTheDocument();
    expect(screen.getByText("American Airlines")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("Los Angeles")).toBeInTheDocument();
  });

  test("filters flights by flight number", () => {
    render(
      <BrowserRouter>
        <FlightTable />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search by Flight Number");
    fireEvent.change(searchInput, { target: { value: "AA123" } });

    expect(screen.getByText("AA123")).toBeInTheDocument();
    expect(screen.queryByText("BB456")).not.toBeInTheDocument();
  });

  test("toggles between UTC and IST time formats", () => {
    render(
      <BrowserRouter>
        <FlightTable />
      </BrowserRouter>
    );

    const toggleButton = screen.getByText("Show UTC");
    fireEvent.click(toggleButton);

    expect(screen.getByText("Show IST")).toBeInTheDocument();
    // Add more assertions to check if the time format has changed
  });
});
