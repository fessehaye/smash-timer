import React from "react";

type PlayButtonProps = {
  playing: boolean;
  togglePlaying: () => void;
};

export default function ({ playing, togglePlaying }: PlayButtonProps) {
  return (
    <button
      onClick={(e) => togglePlaying()}
      className="flex-1 flex items-center justify-center font-bold text-lg bg-blue-700 hover:bg-blue-500 py-2 rounded-md transition duration-500"
    >
      {playing ? (
        <svg viewBox="0 0 20 20" className="currentColor stop w-8 h-8 mr-2">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" className="currentColor play w-8 h-8 mr-2">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
      {playing ? "Stop" : "Play"}
    </button>
  );
}
