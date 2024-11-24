import React from "react";
import { Link } from "react-router-dom"; 
import { GiNotebook } from "react-icons/gi";

const Main = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/Background.jpeg')`,
      }}
    >
      <div className="text-center max-w-4xl px-10 py-14 bg-white drop-shadow-md rounded-lg ">
        <h1 className="text-6xl font-bold text-gray-900 mb-2 flex justify-center">
          Welcome to <span className="text-blue-500 ml-3">Note</span>Snap
          <GiNotebook />
        </h1>
        <h1 className="text-2xl font-bold text-gray-700 mb-4 ">
          Your Ultimate Note-Taking Companion
        </h1>
        <p className="text-blue-500 text-2xl mb-6 font-bold ">
          Flexible. Simple. Powerful. Customize your note-taking experience.
        </p>
        <p className="text-gray-600 text-base mb-6">
          NoteSnap adapts to your needs. Add, edit, and delete notes as you see
          fit. Tag your notes to keep them neatly organized, and use the search
          tool to find them instantly. Pin your essential notes to keep them at
          the top of your list for quick access. Whether you’re managing
          projects or planning personal tasks, NoteSnap makes it easy.
        </p>

        <Link to="/login">
          <button className="px-12 py-3 bg-blue-500 text-white text-lg font-semibold rounded-[5px] hover:bg-blue-600 transition duration-300">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
