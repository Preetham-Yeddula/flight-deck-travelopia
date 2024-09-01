import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "../../components/ThemeToggle";
import { ThemeProvider } from "../../context/ThemeContext";

describe("ThemeToggle", () => {
  test("renders theme toggle button", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toBeInTheDocument();
  });

  test("toggles theme when clicked", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggleButton = screen.getByRole("button");

    // Initial state (light theme)
    expect(toggleButton.textContent).toBe("🌙");

    // Click to toggle
    fireEvent.click(toggleButton);

    // Dark theme
    expect(toggleButton.textContent).toBe("☀️");

    // Click to toggle back
    fireEvent.click(toggleButton);

    // Light theme again
    expect(toggleButton.textContent).toBe("🌙");
  });
});
