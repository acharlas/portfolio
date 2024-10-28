'use client'

import React from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data)
    // Here you would typically send the data to your server or a third-party service
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">Contact Me</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Information */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <Phone className="h-10 w-10 text-blue-500 mb-2" />
                  <span className="text-gray-700 dark:text-gray-300">+1 (123) 456-7890</span>
                </div>
                <div className="flex flex-col items-center">
                  <Mail className="h-10 w-10 text-blue-500 mb-2" />
                  <span className="text-gray-700 dark:text-gray-300">johndoe@example.com</span>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="h-10 w-10 text-blue-500 mb-2" />
                  <span className="text-gray-700 dark:text-gray-300">New York, NY</span>
                </div>
              </div>
              <div className="mt-8 flex justify-center space-x-4">
                <Link href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <Linkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <Github className="h-6 w-6" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://twitter.com/johndoe" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <Twitter className="h-6 w-6" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-semibold mb-8">Send a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className="w-full"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className="w-full"
                    placeholder="Your email"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    {...register("message", { required: "Message is required" })}
                    className="w-full"
                    placeholder="Your message"
                    rows={4}
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                </div>
                <Button type="submit" className="w-full text-lg py-3" size="lg">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}