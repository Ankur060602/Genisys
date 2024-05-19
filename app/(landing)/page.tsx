import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../../public/logo.png";
import "../globals.css";

const LangingPage = () => {
  return (
    <div className="main h-full">
      <div className="flex justify-between items-center w-full h-[50px] ">
        <div className="flex items-center ml-4">
          <Image src={logo} width={50} alt="logo" />
          <h1 className="font-bold text-2xl head">Genisys</h1>
        </div>
        <div className="mr-4">
          <Link href="/sign-in" className="mr-4">
            <Button
              className="hover:bg-black hover:text-white font-bold"
              variant="ghost"
            >
              Sign-in
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              className="hover:bg-black hover:text-white font-bold"
              variant="ghost"
            >
              Sign-up
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full lg:h-[500px] h-[450px] flex flex-col justify-center items-center">
        <div className="text-6xl lg:text-8xl mb-3 ">
          <h1 className="head ">
            <span className="underline">Gen</span>isys{" "}
            <span className="underline">AI</span>
          </h1>
        </div>
        <div>
          <p className="lg:w-[500px] w-[350px] text-center">
            Empower your creativity effortlessly: our AI-powered platform
            generates{" "}
            <span className="underline">text, code, images, and speech</span> at
            your command
          </p>
        </div>
      </div>
    </div>
  );
};

export default LangingPage;
