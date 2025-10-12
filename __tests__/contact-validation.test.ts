import { validateContactForm } from "@/lib/contact-validation";

describe("validateContactForm", () => {
  it("returns no errors for valid input", () => {
    const { errors, isValid } = validateContactForm({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "This is a message with sufficient length.",
    });

    expect(errors).toEqual({});
    expect(isValid).toBe(true);
  });

  it("validates required fields", () => {
    const { errors, isValid } = validateContactForm({
      name: "",
      email: "",
      message: "",
    });

    expect(errors).toEqual({
      name: "Name is required",
      email: "Email is required",
      message: "Message is required",
    });
    expect(isValid).toBe(false);
  });

  it("validates minimum lengths and email format", () => {
    const { errors, isValid } = validateContactForm({
      name: "A",
      email: "not-an-email",
      message: "Too short",
    });

    expect(errors).toEqual({
      name: "Name must be at least 2 characters",
      email: "Please enter a valid email address",
      message: "Message must be at least 10 characters",
    });
    expect(isValid).toBe(false);
  });
});
