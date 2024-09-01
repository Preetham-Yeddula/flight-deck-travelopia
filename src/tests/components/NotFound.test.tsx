import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotFound } from "../../components/NotFound";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("NotFound", () => {
  test("renders 404 page correctly", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Oops! Flight Not Found")).toBeInTheDocument();
    expect(screen.getByText("Return to Flight Board")).toBeInTheDocument();
  });

  test("navigates to home page when button is clicked", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const button = screen.getByText("Return to Flight Board");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
