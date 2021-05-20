import { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory((prev)=>[...prev.slice(0,-1), newMode]);
    } else {
      setHistory((prev)=>[...prev, newMode]);
    }
    setMode(newMode);
  };
  const back = () => {
    const newHist = history.slice(0, history.length - 1);
    const prevMode = history.slice(history.length - 2)[0]; 
    setHistory(newHist);
    setMode(prevMode);
  };

  return { mode, transition, back,history };
}

