"use client";

import type React from "react";
import { useState } from "react";
import { Send, Mail, MapPin, ExternalLink } from "lucide-react";

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
    setSubmitStatus(null);

    try {
      const response = await fetch(
        "https://portfolio-backend-three-umber.vercel.app/api/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      let data = null;

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.error || "Something went wrong");
      }

      // Success
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

        <div className="grid md:grid-cols-2 gap-3 mb-2">
          {/* Contact Information Blocks - Left on desktop, hidden on mobile */}
          <div className="hidden md:block space-y-8 order-1">
            <p className="text-gray-400 mb-4">Feel free to contact me!</p>
            {/* Email Block */}
            <a
              href="mailto:axel.charlassier@gmail.com"
              className="block bg-gray-900/60 border border-gray-800/80 rounded-xl p-4 hover:border-[#00a2ff]/30 hover:bg-gray-900/70 transition-all w-5/6"
            >
              <div className="flex items-center">
                <div className="bg-[#00a2ff]/10 p-2 rounded-full mr-3">
                  <Mail className="h-5 w-5 text-[#00a2ff]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Email</h3>
                  <span className="text-gray-400 group-hover:text-[#00a2ff] flex items-center">
                    axel.charlassier@gmail.com
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </a>

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

          {/* Contact Form - Right on desktop, top on mobile */}
          <div className="bg-gray-900/60 border border-gray-800/80 rounded-xl p-6 md:p-8 order-1 md:order-2">
            <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
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
                  className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/80 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a2ff]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
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
                  className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/80 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a2ff]"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/80 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a2ff]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-6 py-3 bg-[#00a2ff] text-white rounded-md hover:bg-[#0080cc] transition-colors text-base"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
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

        {/* Mobile-only contact blocks that appear below the form */}
        <div className="md:hidden grid grid-cols-2 gap-3 mb-2">
          {/* Email Block */}
          <a
            href="mailto:axel.charlassier@gmail.com"
            className=" bg-gray-900/60 border border-gray-800/80 rounded-xl p-4 hover:border-[#00a2ff]/30 hover:bg-gray-900/70 transition-all h-32 flex flex-col justify-center"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#00a2ff]/10 p-2 rounded-full mb-2">
                <Mail className="h-5 w-5 text-[#00a2ff]" />
              </div>
              <div>
                <h3 className="text-base font-medium mb-1">Email</h3>
                <span className="text-gray-400 text-xs ">
                  axel.charlassier@gmail.com
                </span>
              </div>
            </div>
          </a>

          {/* Location Block */}
          <div className="bg-gray-900/60 border border-gray-800/80 rounded-xl p-4 hover:border-[#00a2ff]/30 transition-all h-32 flex flex-col justify-center">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#00a2ff]/10 p-2 rounded-full mb-2">
                <MapPin className="h-5 w-5 text-[#00a2ff]" />
              </div>
              <h3 className="text-base font-medium mb-1">Location</h3>
              <p className="text-gray-400 text-xs">Paris, France</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
