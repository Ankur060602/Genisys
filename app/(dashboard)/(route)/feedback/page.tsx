"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";

const EmailForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const service_id = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
    const template_id = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID ?? "";

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Genisys AI",
      message: message,
    };

    // Send the email using EmailJS
    emailjs
      .send(service_id, template_id, templateParams, publicKey)
      .then((response) => {
        alert("Email sent successfully");
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-center text-2xl mb-3 font-bold">Feedback Form</h1>
      <form onSubmit={handleSubmit} className="emailForm">
        <div className="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="mb-4">
          <label
            for="email"
            className="block text-sm font-medium text-gray-700"
          >
            Your Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            for="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            cols="30"
            rows="3"
            placeholder="Your Message"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="text-center">
          <Button
            type="submit"
            className="px-4 py-2  text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Send Email
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmailForm;
