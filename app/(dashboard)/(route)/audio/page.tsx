// pages/tts.js
"use client";
import { Button } from "@/components/ui/button";
import { FileAudioIcon } from "lucide-react";
import { useState } from "react";
import ReactPlayer from "react-player";

const API_URL =
  "https://api-inference.huggingface.co/models/espnet/kan-bayashi_ljspeech_vits";
const headers = {
  Authorization: "Bearer YOUR API KEY",
};

export default function TTSPage() {
  const [audioUrl, setAudioUrl] = useState(null);
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleTTSRequest = async () => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({ inputs: inputText }),
    });

    if (response.ok) {
      const audioBlob = await response.blob();
      const audioObjectUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioObjectUrl);
    } else {
      console.error("Failed to fetch audio");
      setAudioUrl(null); // Reset audioUrl if fetching fails
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4 h-full">
      <div className="mb-4">
        <h1 className="text-xl lg:text-2xl font-semibold text-center flex items-center justify-center gap-3">
          <FileAudioIcon className="text-pink-600 " size={30} />
          Speech Generation
        </h1>
        <p className="text-center text-sm">
          Ask AI to generate audio of your input
        </p>
      </div>
      <div className="flex lg:block justify-center items-center w-full mb-4">
        <input
          id="input-text"
          type="text"
          cols={30}
          rows={10}
          value={inputText}
          onChange={handleInputChange}
          className="border rounded-sm lg:w-[750px] h-8 p-4 mx-5 outline-none"
          placeholder="Enter your text to generate speech..."
        />
        <Button
          variant="secondary"
          className="hover:bg-slate-900 hover:text-white"
          onClick={handleTTSRequest}
        >
          Generate
        </Button>
      </div>
      <div className="flex justify-center items-center h-4">
        {audioUrl ? (
          <ReactPlayer url={audioUrl} controls />
        ) : (
          <p className="text-gray-500">No audio generated yet</p>
        )}
      </div>
    </div>
  );
}
