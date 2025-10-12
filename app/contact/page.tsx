import type { Metadata } from "next";
import ContactPage from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Contact | Axel Charlassier",
  description:
    "Get in touch with Axel Charlassier for collaborations, freelance work, or engineering opportunities.",
  openGraph: {
    title: "Contact | Axel Charlassier",
    description:
      "Reach out to Axel Charlassier to discuss projects, collaborations, or new opportunities.",
    type: "website",
  },
};

export default function Contact() {
  return <ContactPage />;
}
