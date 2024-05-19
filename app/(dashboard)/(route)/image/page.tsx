"use client";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [searchText, setSearchText] = useState("");

  async function query(data) {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/segmind/SSD-1B",
        {
          headers: {
            Authorization: "Bearer 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",
          },
          method: "POST",
          body: JSON.stringify({
            ...data,
            parameters: {
              width: 1920,
              height: 1080,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const result = await response.blob();
      return result;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  const handleGenerate = async () => {
    try {
      const response = await query({ inputs: searchText });
      setGeneratedImage(URL.createObjectURL(response));
    } catch (error) {
      console.error("Error:", error);
      setGeneratedImage(null);
    }
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.setAttribute("download", "generated-image.png");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-xl lg:text-2xl font-semibold text-center flex items-center justify-center gap-3">
          <ImageIcon className="text-pink-600 " size={30} />
          Image Generation
        </h1>
        <p className="text-center text-sm">
          Generate Images with the help of AI
        </p>
      </div>
      <div className="sm:flex lg:block justify-center items-center w-full mb-4 sm:ml-9">
        <input
          type="text"
          placeholder="Last selfie of the earth..."
          value={searchText}
          onChange={handleSearchTextChange}
          className=" border rounded-sm lg:w-[750px] h-8 p-4 outline-none  "
        />
        <Button
          variant="secondary"
          className="hover:bg-slate-900 hover:text-white"
          onClick={handleGenerate}
        >
          Generate Image
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center">
        {generatedImage ? (
          <>
            <Image
              src={generatedImage}
              width={500}
              height={300}
              alt="Generated"
              className="mx-auto mb-2 lg:p-2 md:p-10"
            />
            <Button
              className=" flex justify-center items-center"
              onClick={handleDownload}
            >
              Download Image
            </Button>
          </>
        ) : (
          <div className="w-[300px] h-[300px] bg-gray-200 flex justify-center items-center">
            <p className="text-gray-500">No image generated yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
