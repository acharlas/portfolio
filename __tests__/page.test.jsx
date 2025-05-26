import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import Projects from "../app/projects/page";
import Contact from "../app/contact/page";

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock next/image
jest.mock("next/image", () => {
  return ({ src, alt, ...props }: any) => {
    return <img src={src} alt={alt} {...props} />;
  };
});

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
});

describe("Contact Page", () => {
  it("renders the contact form", () => {
    render(<Contact />);
    expect(screen.getByText("Send Me a Message")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("has contact information", () => {
    render(<Contact />);
    expect(screen.getByText("axel.charlassier@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("Paris, France")).toBeInTheDocument();
  });
});
