"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Send, Mail, MapPin, ExternalLink } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        "https://portfolio-backend-three-umber.vercel.app/api/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            message: formData.message.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="blue-divider w-full mb-8"></div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-6">
          Contact
        </h1>

        <div className="grid md:grid-cols-2 gap-3 mb-8">
          {/* Contact Information - Hidden on mobile */}
          <div className="hidden md:block space-y-8 order-1">
            <p className="text-gray-400 mb-4">Feel free to contact me!</p>

            {/* Email Block */}
            <div className="bg-gray-900/60 border border-gray-800/80 rounded-xl p-4 hover:border-[#00a2ff]/30 transition-all w-5/6">
              <div className="flex items-start">
                <div className="bg-[#00a2ff]/10 p-2 rounded-full mr-3">
                  <Mail className="h-5 w-5 text-[#00a2ff]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Email</h3>
                  <a
                    href="mailto:axel.charlassier@gmail.com"
                    className="text-gray-400 hover:text-[#00a2ff] flex items-center transition-colors"
                  >
                    axel.charlassier@gmail.com
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Location Block */}
            <div className="bg-gray-900/60 border border-gray-800/80 rounded-xl p-4 hover:border-[#00a2ff]/30 transition-all w-5/6">
              <div className="flex items-center">
                <div className="bg-[#00a2ff]/10 p-2 rounded-full mr-3">
                  <MapPin className="h-5 w-5 text-[#00a2ff]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Location</h3>
                  <p className="text-gray-400">Paris, France</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900/60 border border-gray-800/80 rounded-xl p-5 md:p-8 order-1 md:order-2">
            <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full px-4 py-3 bg-gray-800/80 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-700/80 focus:ring-[#00a2ff]"
                  }`}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-400 text-sm mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full px-4 py-3 bg-gray-800/80 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-700/80 focus:ring-[#00a2ff]"
                  }`}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-400 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={isMobile ? 3 : 6}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className={`w-full px-4 py-3 bg-gray-800/80 border rounded-md focus:outline-none focus:ring-2 transition-colors resize-vertical ${
                    errors.message
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-700/80 focus:ring-[#00a2ff]"
                  } ${isMobile ? "min-h-[80px]" : "min-h-[150px]"}`}
                />
                {errors.message && (
                  <p id="message-error" className="text-red-400 text-sm mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-6 py-3 bg-[#00a2ff] text-white rounded-md hover:bg-[#0080cc] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base focus:outline-none focus:ring-2 focus:ring-[#00a2ff] focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="p-4 bg-green-900/20 border border-green-500/20 rounded-md">
                  <p className="text-green-400 text-sm">
                    Your message has been sent successfully! I&apos;ll get back
                    to you soon.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-md">
                  <p className="text-red-400 text-sm">
                    There was an error sending your message. Please try again or
                    contact me directly.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
