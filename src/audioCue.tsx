import React from "react";
import { AudioCue } from "./app";

type AudioCueProps = {
  audioCue: AudioCue;
  playing: boolean;
  removeRow: (id: string) => void;
  updateRow: (cue: AudioCue) => void;
};

export default ({ audioCue, playing, removeRow, updateRow }: AudioCueProps) => {
  return (
    <div className="flex items-end w-full pb-8">
      <label className="block mr-6 w-20">
        <span className="text-white font-bold text-lg">Frame</span>
        <input
          type="number"
          className="form-input mt-1 block w-full text-black font-bold"
          placeholder="17"
          disabled={playing}
          value={audioCue.frame}
          onChange={(e) =>
            updateRow({ ...audioCue, frame: parseInt(e.target.value) })
          }
        />
      </label>
      <label className="block mr-auto w-1/2">
        <span className="text-white font-bold text-lg">
          Description (Optional)
        </span>
        <input
          type="text"
          className="form-input mt-1 block w-full text-black font-bold"
          placeholder="Action"
          value={audioCue.description}
          disabled={playing}
          onChange={(e) =>
            updateRow({ ...audioCue, description: e.target.value })
          }
        />
      </label>
      <svg
        viewBox="0 0 20 20"
        onClick={() => (playing ? null : removeRow(audioCue.id))}
        className="fill-current trash w-10 h-10 text-white hover:text-red-500 cursor-pointer transition duration-500"
      >
        <path
          fillRule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};
