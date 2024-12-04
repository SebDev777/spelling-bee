import React, {useState, useEffect} from "react";
import UseMainContext from "../../contexts/MainContext";

function Btn({cl, text, onClick, style}) {
    return (
      <button type="button" class={"btn " + cl} onClick={onClick} style={style}> {text} </button>
    )
  }
  
export default function TimerSection() {
  const [maxTime, setMaxTime] = useState(30)
  const [selected, setSelected] = useState(1)
  const [timeLeft, setTimeLeft] = useState(30); // Countdown time in seconds (e.g., 60 seconds)
  const [isRunning, setIsRunning] = useState(false); // Timer running state
  const [intervalId, setIntervalId] = useState(null); // Interval ID to clear interval later

  // Start the timer
  const startTimer = () => {
    if (isRunning) return; // Prevent starting if already running

    setIsRunning(true);
    const id = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(id); // Clear the interval when timer reaches 0
          setIsRunning(false);
          return 0;
        }
        return prevTime - 0.1;
      });
    }, 100); // Update every second
    setIntervalId(id);
  };

  // Pause the timer
  const pauseTimer = () => {
    clearInterval(intervalId); // Clear the interval to stop the countdown
    setIsRunning(false);
  };

  // Reset the timer to the initial value
  const resetTimer = () => {
    clearInterval(intervalId); // Clear the interval
    setIsRunning(false); // Stop the timer
    setTimeLeft(maxTime); // Reset the time to 60 seconds or any other initial value
  };

  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    if (isRunning) return
    setTimeLeft(maxTime)
  }, [maxTime])

  const midTime = (timeLeft < maxTime/2)
  const col = midTime ? "rgb(255, 30, 30)" : "black"
  const size = (midTime && timeLeft >= 1) ? "3rem" : "2rem"
  const timeDisplay = timeLeft <= 1 ? "TIME OUT!" : timeLeft.toFixed(2)

  return (
    <div class="card text-center">
        <div class="card-body">
            <button type="button" class="btn btn-outline-warning btn-custom" style={{padding: "5% 40%", color: col , fontSize: size, fontFamily: "sans-serif"}}>{timeDisplay}</button>
            <div className="container mt-3">
                <Btn cl="btn-warning mx-2" text={"30s"} onClick={() => {setMaxTime(30); setSelected(1)}} style={{transform: selected===1 ? "scale(1.25)" : "scale(1)", color: "white"}} />
                <Btn cl="btn-warning mx-2" text={"15s"} onClick={() => {setMaxTime(15); setSelected(2)}} style={{transform: selected===2 ? "scale(1.25)" : "scale(1)", color: "white"}} />
                <Btn cl="btn-warning mx-2" text={"10s"} onClick={() => {setMaxTime(10); setSelected(3)}} style={{transform: selected===3 ? "scale(1.25)" : "scale(1)", color: "white"}} />

                <Btn cl="btn-primary btn-sm mx-2" text={"Start"} onClick={startTimer} disabled={isRunning} style={{color: "white"}} />
                <Btn cl="btn-primary btn-sm mx-2" text={"Pause"} onClick={pauseTimer} disabled={!isRunning} style={{color: "white"}} />
                <Btn cl="btn-primary btn-sm mx-2" text={"Restart"} onClick={resetTimer} style={{color: "white"}} />
            </div>
        </div>
    </div>
    )
}