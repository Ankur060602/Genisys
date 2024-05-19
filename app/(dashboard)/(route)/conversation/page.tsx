"use client";
import { useChat } from "ai/react";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
const emptyImage = require("@/public/empty.png");
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="max-w-screen-lg mx-auto p-4 h-full">
      <div className="mb-4">
        <h1 className="text-xl lg:text-2xl font-semibold text-center flex items-center justify-center gap-3">
          <MessageSquare className="text-violet-600 " size={30} />
          Conversation ChatBot
        </h1>
        <p className="text-center text-sm">
          Generate Information with the help of AI
        </p>
      </div>
      <div className=" rounded-lg overflow-hidden">
        <div className="p-4">
          {messages.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <Image
                alt="image"
                src={emptyImage}
                width={350}
                height={300}
                className="max-w-full h-auto bg-white"
              />
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`mb-2 ${
                  m.role === "user"
                    ? "text-right text-blue-500"
                    : "text-left text-gray-700"
                }`}
              >
                <div className="text-xs">
                  {m.role === "user" ? "You" : "Genisys"}
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md inline-block text-justify max-w-full ">
                  <ReactMarkdown>{m.content || ""}</ReactMarkdown>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="relative bottom-0">
          <input
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            className="w-full rounded-sm pl-4 pr-16 py-3 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500/5 shadow-md"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-4 py-2 rounded-sm hover:text-white hover:bg-slate-600 focus:outline-none focus:bg-blue-600"
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
}
