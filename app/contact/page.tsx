"use client";

import type React from "react";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // This would be replaced with your actual form submission logic
      // For example, using a server action or API route
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate successful submission
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="blue-divider w-full mb-16"></div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-8">
          Contact
        </h1>

        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a2ff]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a2ff]"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a2ff]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-4 py-2 bg-[#00a2ff] text-white rounded-md hover:bg-[#0080cc] transition-colors"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </button>

            {submitStatus === "success" && (
              <p className="text-green-400 text-sm mt-2">
                Your message has been sent successfully! I&apos;ll get back to
                you soon.
              </p>
            )}

            {submitStatus === "error" && (
              <p className="text-red-400 text-sm mt-2">
                There was an error sending your message. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
