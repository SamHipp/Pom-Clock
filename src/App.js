import React, { useEffect, useState } from "react";
import Timer from "./Timer.js";

const soundBank = [
    {
        name: "303",
        id: "A",
        url: "./sounds/303.wav"
    },
    {
        name: "Doot",
        id: "B",
        url: "./sounds/doot.mp3"
    },
    {
        name: "Train Bell",
        id: "C",
        url: "./sounds/train-bell.wav"
    },
    {
        name: "Wobbly Willie",
        id: "D",
        url: "./sounds/wobbly-willie.wav"
    },
]

function App() {
    // State_____________________________________________________________

    const [goTime, setGoTime] = useState(25);
    const [restTime, setRestTime] = useState(5);
    const [goSession, setGoSession] = useState("Go");
    const [secsRemaining, setSecsRemaining] = useState(1500);
    const [timerGoing, setTimerGoing] = useState(false);
    const [startTime, setStartTime] = useState(Date.now());
    const [updatedTime, setUpdatedTime] = useState(Date.now());
    const [audioSound, setAudioSound] = useState(soundBank[0]['url']);
    // const [timerCounter, setTimerCounter] = useState(1);

    

// Functions______________________________________________________________

useEffect(() => {
    const timerUpdate = setInterval(() => {
        if (timerGoing && secsRemaining > 0) {
            setSecsRemaining(secsRemaining => secsRemaining - 1);
        }
    }, 1000);
    return () => clearInterval(timerUpdate);
}, [timerGoing]);

useEffect(() => {
    if(secsRemaining === 0) {
        // play audio
        let audio = document.getElementById('beep');
        audio.currentTime = 0;
        audio.play();
        nextSession();
    }
},[secsRemaining])

useEffect(() => {
    if (goSession === 'Go') {
        setSecsRemaining(goTime * 60);
    } else {setSecsRemaining(restTime * 60);}
}, [goTime, restTime])
    

    const timerPause = clearInterval(setInterval);

    const sessionIncrement = () => {
        if (goTime < 60) {
        setGoTime(goTime => goTime + 1);
        }
    }

    const sessionDecrement = () => {
        if (goTime > 1) {
        setGoTime(goTime => goTime - 1);
        }
    }

    const breakIncrement = () => {
        if (restTime < 60) {
        setRestTime(restTime => restTime + 1);
        }
    }

    const breakDecrement = () => {
        if (restTime > 1) {
        setRestTime(restTime => restTime - 1);
        }
    }

    const timerReset = () => {
        setGoTime(25);
        setRestTime(5);
        setGoSession('Go');
        setSecsRemaining(1500);
    }

    const startCountdown = () => {
        if (!timerGoing) {
            setTimerGoing(true);
            document.getElementById('start_stop').classList.add('reset');
        } else {
            setTimerGoing(false);
            document.getElementById('start_stop').classList.remove('reset');
        }
    }

    const nextSession = () => {
        if (goSession === 'Go') {
            setGoSession('Rest');
            setSecsRemaining(restTime * 60);
        } else {
            setGoSession('Go');
            setSecsRemaining(goTime * 60);
        }
    }

    const handleAudioChange = () => {
        let audioSelect = document.getElementById('audio-select');
        setAudioSound(item => audioSelect.value);
    }

return (
<div className="app-container">
    <h1 className="title">Pom Clock</h1>
    <Timer gosession={goSession} secsremaining={secsRemaining} />
    <div className="buttons-container">
            <button className="button start_stop" id="start_stop" onClick={startCountdown}>{timerGoing ? "STOP" : "START"}</button>
            <button className="button reset" id="reset" onClick={timerReset}>RESET</button>
            <button className="button reset next-button" id="next-button" onClick={nextSession}>NEXT</button>

        </div>
    <div className="interval-controls-container">
        <div className="time-container">
            <p className="session-label" id="session-label">Go Time:</p>
            <div className="session-controls">
                <p className="session-value-display" id="session-length">{goTime}</p>
                <div className="increment-decrement-container">
                    <div className="session-increment" id="session-increment" onClick={sessionIncrement}></div>
                    <div className="session-decrement" id="session-decrement" onClick={sessionDecrement}></div>
                    
                </div>
            </div>
        </div>
        <div className="time-container">
            <p className="session-label" id="break-label">Rest Time:</p>
            <div className="session-controls">
                <p className="session-value-display" id="break-length">{restTime}</p>
                <div className="increment-decrement-container">
                <div className="session-increment" id="break-increment" onClick={breakIncrement}></div>
                <div className="session-decrement" id="break-decrement" onClick={breakDecrement}></div>
                </div>
            </div>
        </div>
        <div className="audio-select-container">
            <p className="session-label" id="audio-label">Choose Sound:</p>
            <select id="audio-select" className="audio-select" onChange={handleAudioChange}>
                {soundBank.map((item) => {
                    return <option value={item.url} key={item.id}>{item.name}</option>
                })}
            </select>
            
        </div>
    </div>
    <audio id="beep" src={audioSound}/>
</div>
);
}










// **User Story #18:** When I first click the element with `id="start_stop"`, the timer should begin running from the value currently displayed in `id="session-length"`, even if the value has been incremented or decremented from the original value of 25.



export default App;