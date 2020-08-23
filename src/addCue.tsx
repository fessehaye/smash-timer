import React from "react";

type AddCueProps = {
  playing: boolean;
  addRow: () => void;
};

export default function ({ playing, addRow }: AddCueProps) {
  return (
    <button
      disabled={playing}
      onClick={() => addRow()}
      className="flex-1 flex items-center justify-center font-bold text-lg text-blue-700 hover:text-blue-900 py-2 rounded-md bg-gray-300 mr-4 transition duration-500"
    >
      <svg
        viewBox="0 0 20 20"
        className="plus-circle currentColor w-8 h-8 mr-2"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
          clipRule="evenodd"
        ></path>
      </svg>
      Add Cue
    </button>
  );
}
