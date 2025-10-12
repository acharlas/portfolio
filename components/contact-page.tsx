"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Send, Mail, MapPin, ExternalLink } from "lucide-react";
import {
  CONTACT_API_ENDPOINT,
  CONTACT_MOBILE_BREAKPOINT,
  CONTACT_RATE_LIMIT_MS,
} from "@/lib/config";
import {
  validateContactForm,
  type ContactFormData,
  type ContactFormErrors,
} from "@/lib/contact-validation";
import { logClientError } from "@/lib/logger";

type SubmitStatus = {
  type: "success" | "error" | null;
  message?: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: null,
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isMobile, setIsMobile] = useState(false);
  const [honeypotValue, setHoneypotValue] = useState("");
  const lastSubmissionRef = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth < CONTACT_MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitStatus((prev) => (prev.type ? { type: null } : prev));

    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypotValue) {
      setSubmitStatus({
        type: "error",
        message:
          "Submission blocked. If you're human, please leave the hidden field untouched.",
      });
      return;
    }

    if (
      lastSubmissionRef.current &&
      Date.now() - lastSubmissionRef.current < CONTACT_RATE_LIMIT_MS
    ) {
      setSubmitStatus({
        type: "error",
        message: "Please wait a few moments before sending another message.",
      });
      return;
    }

    const { errors: validationErrors, isValid } = validateContactForm(formData);

    setErrors(validationErrors);

    if (!isValid) {
      setSubmitStatus({ type: "error", message: "Please fix the errors above." });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null });

    let response: Response | undefined;

    try {
      response = await fetch(CONTACT_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorBody}`
        );
      }

      lastSubmissionRef.current = Date.now();
      setSubmitStatus({
        type: "success",
        message: "Your message has been sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setHoneypotValue("");
    } catch (error) {
      await logClientError({
        message: "Contact form submission failed",
        error,
        context: {
          status: response?.status,
        },
      });

      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? `There was an error sending your message: ${error.message}`
            : "There was an unexpected error sending your message.",
      });
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
          <div className="hidden md:block space-y-8 order-1">
            <p className="text-gray-400 mb-4">Feel free to contact me!</p>

            <ContactInfoCard
              icon={<Mail className="h-5 w-5 text-[#00a2ff]" />}
              title="Email"
              href="mailto:axel.charlassier@gmail.com"
              text="axel.charlassier@gmail.com"
              isExternal
            />

            <ContactInfoCard
              icon={<MapPin className="h-5 w-5 text-[#00a2ff]" />}
              title="Location"
              text="Paris, France"
            />
          </div>

          <div className="bg-gray-900/60 border border-gray-800/80 rounded-xl p-5 md:p-8 order-1 md:order-2">
            <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <input
                type="text"
                name="company"
                value={honeypotValue}
                onChange={(event) => setHoneypotValue(event.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <FormField
                id="name"
                label="Name *"
                type="text"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />

              <FormField
                id="email"
                label="Email *"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              <FormField
                id="message"
                label="Message *"
                type="textarea"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                rows={isMobile ? 3 : 6}
                required
              />

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

              <StatusMessage status={submitStatus} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  href?: string;
  isExternal?: boolean;
}

function ContactInfoCard({
  icon,
  title,
  text,
  href,
  isExternal,
}: ContactInfoCardProps) {
  const content = (
    <div className="bg-gray-900/60 border border-gray-800/80 rounded-xl p-4 hover:border-[#00a2ff]/30 transition-all w-5/6">
      <div className="flex items-center">
        <div className="bg-[#00a2ff]/10 p-2 rounded-full mr-3">{icon}</div>
        <div>
          <h3 className="text-lg font-medium mb-1">{title}</h3>
          <div className="text-gray-400 hover:text-[#00a2ff] flex items-center transition-colors">
            {text}
            {isExternal && <ExternalLink className="ml-2 h-4 w-4" />}
          </div>
        </div>
      </div>
    </div>
  );

  return href ? <a href={href}>{content}</a> : content;
}

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  rows?: number;
  required?: boolean;
}

function FormField({
  id,
  label,
  type,
  value,
  onChange,
  error,
  rows,
  required,
}: FormFieldProps) {
  const baseClasses = `w-full px-4 py-3 bg-gray-800/80 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
    error
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-700/80 focus:ring-[#00a2ff]"
  }`;
  const textareaMinHeightClasses = "min-h-[80px] md:min-h-[150px]";

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${baseClasses} resize-vertical ${textareaMinHeightClasses}`}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={baseClasses}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="text-red-400 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

function StatusMessage({ status }: { status: SubmitStatus }) {
  if (!status.type) return null;

  return (
    <div
      className={`p-4 border rounded-md ${
        status.type === "success"
          ? "bg-green-900/20 border-green-500/20"
          : "bg-red-900/20 border-red-500/20"
      }`}
      role="status"
      aria-live={status.type === "success" ? "polite" : "assertive"}
    >
      <p
        className={`text-sm ${
          status.type === "success" ? "text-green-400" : "text-red-400"
        }`}
      >
        {status.message}
      </p>
    </div>
  );
}
