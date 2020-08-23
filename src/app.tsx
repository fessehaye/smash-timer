import React, { useState, useEffect, useRef } from "react";
import AddCue from "./addCue";
import PlayButton from "./playButton";
import AudioCue from "./audioCue";
import { Transport, Oscillator, now, Loop } from "tone";

export type AudioCue = {
  frame: number;
  id: number;
  description: string;
};

export default function App() {
  const [audioCues, setAudioCues] = useState<AudioCue[]>([
    { frame: 0, description: "first beat", id: Date.now() },
  ]);
  const [frames, setFrames] = useState<number>(60);
  const [playing, setPlaying] = useState<boolean>(false);

  const osc = useRef(null);
  const loop = useRef(null);

  useEffect(() => {
    Transport.bpm.value = 3600;

    osc.current = new Oscillator(440, "sine").toDestination();
    osc.current.volume.value = -20;

    const searchParams = new URLSearchParams(window.location.search);
    setFrames(
      searchParams.get("frames") ? parseInt(searchParams.get("frames")) : 60
    );

    if (searchParams.get("audioCues").split(",").length > 0) {
      setAudioCues(
        searchParams
          .get("audioCues")
          .split(",")
          .map((cue) => {
            return { frame: parseInt(cue), description: "", id: Date.now() };
          })
      );
    }
  }, []);

  useEffect(() => {
    updateURL();
  }, [frames, audioCues]);

  (window as any).state = { audioCues, frames, playing }; // for testing

  const toggleLoop = () => {
    setPlaying(!playing);

    if (playing) {
      loop.current.dispose();
      Transport.stop();
    } else {
      let count = 0;
      loop.current = new Loop((time) => {
        // triggered every eighth note.
        count = (count + 1) % frames;
        if (audioCues.map((c) => c.frame).includes(count)) {
          osc.current.start(time).stop(time + 0.002);
        }
      }, "4n").start(0);

      Transport.start();
    }
  };

  const updateURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(
      "audioCues",
      audioCues.map((cue) => cue.frame.toString()).join(",")
    );
    searchParams.set("frames", frames.toString());
    history.pushState(null, null, `?${searchParams.toString()}`);
  };

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
            <PlayButton playing={playing} togglePlaying={() => toggleLoop()} />
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
