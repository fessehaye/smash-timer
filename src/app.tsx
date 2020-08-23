import React, { useState } from "react";
import AddCue from "./addCue";
import PlayButton from "./playButton";
import AudioCue from "./audioCue";

export type AudioCue = {
  frame: number;
  id: number;
  description: string;
};

export default function App() {
  const [audioCues, setAudioCues] = useState<AudioCue[]>([]);
  const [frames, setFrames] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);

  (window as any).state = { audioCues, frames, playing }; // for testing

  const addRow = () => {
    setAudioCues([...audioCues, { frame: 0, id: Date.now(), description: "" }]);
  };

  const removeRow = (id: number) => {
    setAudioCues(audioCues.filter((a) => a.id !== id));
  };

  const updateRow = (cue: AudioCue) => {
    const newCues = [...audioCues];
    const index = newCues.findIndex((c) => c.id == cue.id);
    newCues[index] = cue;
    setAudioCues(newCues);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-white bg-black">
      <main className="w-full max-w-2xl mx-auto my-32 ">
        <div className="px-8 py-4 bg-gray-900 rounded-lg">
          <div className="flex items-center pt-4 pb-8 ">
            <label className="flex items-center w-full">
              <span className="text-white font-bold text-lg mr-auto">
                Number of Frames
              </span>
              <input
                className="form-input mt-1 block w-20 text-black font-bold"
                placeholder="60"
                type="number"
                value={frames}
                onChange={(e) => {
                  setFrames(parseInt(e.target.value));
                }}
              />
            </label>
          </div>

          <div className="w-full flex items-center border-b-2 pb-4 mb-4">
            <AddCue playing={playing} addRow={addRow} />
            <PlayButton
              playing={playing}
              togglePlaying={() => setPlaying(!playing)}
            />
          </div>

          {audioCues.map((audioCue: AudioCue) => {
            return (
              <AudioCue
                key={audioCue.id}
                playing={playing}
                audioCue={audioCue}
                removeRow={removeRow}
                updateRow={updateRow}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
