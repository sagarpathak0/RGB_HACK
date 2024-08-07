import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Link from "next/link";
import Draggable from "react-draggable";
import { TextGenerateEffect } from "@/components/ui/text-generate-effext";

const inter = Inter({ subsets: ['latin'] });
const words = `Make Your Notes`;

export default function Home() {
  return (
    <> 
      <div className="h-screen bg-hero bg-fixed bg-cover bg-center text-white">
        <Navbar />
        <div className="h-full flex flex-col justify-center items-center text-center px-4">
          <TextGenerateEffect words={words}/>
          {/* <h1 className="text-5xl font-bold mb-4">Make Your Notes</h1> */}
          <p className="text-xl mb-8">Your Own Way</p>
          
          <div><Link href='signin'><button
              className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
            Get Started
          </button></Link></div>
        </div>
      </div>
      <div id="features" className="h-screen bg-black text-white flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold mb-6">Features</h2>
        <p className="text-lg mb-8">Discover how our app can help you manage your notes effortlessly.</p>
        
        <div className="flex space-x-4">
        <Draggable>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="flex justify-center text-3xl font-semibold mb-2">MOVE</h3>
            <p className="text-base">------------------------</p>
          </div>
          </Draggable>
          <Draggable>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="flex justify-center text-3xl font-semibold mb-2">ME</h3>
            <p className="text-base">------------------------</p>
          </div>
          </Draggable>
        </div>
        
      </div>
      <footer className="bg-gray-900 text-white text-center py-4">
        <p>&copy; 2024 Your Notes App. All rights reserved.</p>
      </footer>
    </>
  );
}
