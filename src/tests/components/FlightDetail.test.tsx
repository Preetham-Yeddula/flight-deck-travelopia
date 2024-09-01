import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { FlightDetails } from "../../components/FlightDetail";
import { useFlightDetail } from "../../hooks/useFlightDetail";

jest.mock("../../hooks/useFlightDetail");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
  useNavigate: () => jest.fn(),
}));

describe("FlightDetails", () => {
  it("displays loading state", () => {
    (useFlightDetail as jest.Mock).mockReturnValue({
      flightDetail: null,
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/flight/1"]}>
        <Routes>
          <Route path="/flight/:id" element={<FlightDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "Loading flight details..."
    );
  });

  it("displays error state", () => {
    (useFlightDetail as jest.Mock).mockReturnValue({
      flightDetail: null,
      loading: false,
      error: "Failed to fetch flight details",
    });

    render(
      <MemoryRouter initialEntries={["/flight/1"]}>
        <Routes>
          <Route path="/flight/:id" element={<FlightDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Failed to fetch flight details"
    );
  });

  it("displays flight details when loaded", () => {
    const mockFlightDetail = {
      id: "1",
      flightNumber: "AA123",
      airline: "American Airlines",
      origin: "New York",
      destination: "Los Angeles",
      departureTime: "2023-09-01T10:00:00Z",
      status: "On Time",
    };

    (useFlightDetail as jest.Mock).mockReturnValue({
      flightDetail: mockFlightDetail,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/flight/1"]}>
        <Routes>
          <Route path="/flight/:id" element={<FlightDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Flight Details")).toBeInTheDocument();
    expect(screen.getByText("AA123")).toBeInTheDocument();
    expect(screen.getByText("American Airlines")).toBeInTheDocument();
  });
});
