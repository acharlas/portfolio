import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../app/page";
import Projects from "../app/projects/page";
import Contact from "../app/contact/page";

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock next/image
jest.mock("next/image", () => {
  return ({ src, alt, ...props }: any) => {
    return <img src={src} alt={alt} {...props} />;
  };
});

// Mock fetch for contact form
global.fetch = jest.fn();

describe("Home Page", () => {
  it("renders the main heading", () => {
    render(<Home />);
    const heading = screen.getByText(/Hi, I'm Axel/i);
    expect(heading).toBeInTheDocument();
  });

  it("displays the tech stack", () => {
    render(<Home />);
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("has navigation links", () => {
    render(<Home />);
    expect(screen.getByText("See My Work")).toBeInTheDocument();
    expect(screen.getByText("Contact Me")).toBeInTheDocument();
  });
});

describe("Projects Page", () => {
  it("renders the projects heading", () => {
    render(<Projects />);
    const heading = screen.getByText("Projects");
    expect(heading).toBeInTheDocument();
  });

  it("displays project cards", () => {
    render(<Projects />);
    expect(screen.getByText("Chaos Equations Simulation")).toBeInTheDocument();
    expect(screen.getByText("Transcendence")).toBeInTheDocument();
  });

  it("shows project technologies", () => {
    render(<Projects />);
    expect(screen.getByText("React Three Fiber")).toBeInTheDocument();
    expect(screen.getByText("NestJS")).toBeInTheDocument();
  });
});

describe("Contact Page", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("renders the contact form", () => {
    render(<Contact />);
    expect(screen.getByText("Send Me a Message")).toBeInTheDocument();
    expect(screen.getByLabelText("Name *")).toBeInTheDocument();
    expect(screen.getByLabelText("Email *")).toBeInTheDocument();
    expect(screen.getByLabelText("Message *")).toBeInTheDocument();
  });

  it("has contact information", () => {
    render(<Contact />);
    expect(screen.getByText("axel.charlassier@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("Paris, France")).toBeInTheDocument();
  });

  it("validates form fields", async () => {
    render(<Contact />);

    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Message is required")).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<Contact />);

    fireEvent.change(screen.getByLabelText("Name *"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email *"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message *"), {
      target: { value: "This is a test message" },
    });

    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("api/send-email"),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "John Doe",
            email: "john@example.com",
            message: "This is a test message",
          }),
        })
      );
    });
  });
});
