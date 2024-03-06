"use client";
import "regenerator-runtime/runtime";
import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { handleDay } from "../lib/utils";

const MainPage = () => {
  const [patient, setPatient] = useState({
    day: "",
    time: "",
  });

  let synthRef = useRef(null);
  synthRef.current = window.speechSynthesis;

  const handlePatient = async (name) => {
    const fetchData = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({ ...patient, name: name }),
    });
  };

  const commands = [
    {
      command: "Can you schedule meeting",
      callback: ({ command1 }) => {
        const utterThis = new SpeechSynthesisUtterance(
          `Sure , i would be happy to do that, please say today or tomorrow,  and time `
        );
        synthRef.current.speak(utterThis);
      },

      //   matchInterim: true,
    },
    {
      command: "book for me * at *",
      callback: (day, time) => {
        const setDate = handleDay(day, time);
        console.log("setDate", day, time, setDate);
        setPatient((prev) => ({ ...prev, ...setDate }));
        const utterThis = new SpeechSynthesisUtterance(
          `Please tell me your name ?`
        );
        synthRef.current.speak(utterThis);
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: "My name is *",
      callback: (command1) => {
        setPatient((prev) => ({ ...prev, name: command1 }));
        const utterThis = new SpeechSynthesisUtterance(
          `hey ${command1} , Thank you for booking a slot , be on time`
        );
        synthRef.current.speak(utterThis);
        handlePatient(command1);
      },
    },
  ];
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });
  //   const [transcripts, setTranscripts] = useState([]);

  useEffect(() => {
    // on every 5 second record the transcript and put it in the bx and reset

    if (!listening && transcript.length > 0) {
      resetTranscript();
    }
  });

  //   console.log("first", transcripts);
  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-red-600">
        Browser doesn't support speech recognition.
      </div>
    );
  }

  return (
    <main className="max-w-screen-sm mx-auto h-svh bg-slate-800 text-cyan-50 flex flex-col justify-center gap-4 place-items-center">
      <div>Microphone: {listening ? "on" : "off"}</div>
      <button
        className={
          "size-max  text-white" + " " + listening !== true
            ? "bg-red-500 p-3 rounded-lg"
            : "bg-green-500 p-3 rounded-lg"
        }
        onMouseDown={() => {
          SpeechRecognition.startListening({ continuous: true });
        }}
        onMouseUp={() => {
          SpeechRecognition.stopListening();
        }}
      >
        Start
      </button>
      {/* <button
        className="size-max p-3 bg-red-700 rounded-lg text-white"
        // onClick={() => {
        //   SpeechRecognition.stopListening;
        //   setSpeech(false);
        // }}
      >
        Stop
      </button> */}

      {/* <button onClick={resetTranscript}>Reset</button> */}
      <div className="text-blue-600 mx-56">{transcript}</div>
      {/* <div className="text-red-400 mx-56">{message}</div> */}
    </main>
  );
};
export default MainPage;
