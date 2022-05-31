import React, { useEffect, useState } from "react";

function Timer(props) {
    let secsRemaining = props.secsremaining;
    let goSession = props.gosession;

    
    

    return (
    <div className="timer-app-container">
        <div className="countdown-container">
            <p className="timer-label timer-countdown-label">REMAINING TIME:</p>
            <p className="countdown-timer" id="time-left">{`${Math.floor(secsRemaining / 60).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false})}:${(secsRemaining % 60).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false})}`}</p>
            <p className="timer-label timer-interval-label" id="timer-label">{`${goSession}!!`}</p>
        </div>
    </div>
    );

}

export default Timer;

// Time values: goTime, restTime


// **User Story #11:** When I click the element with the id of `reset`, any running timer should be stopped, the value within `id="break-length"` should return to `5`, the value within `id="session-length"` should return to 25, and the element with `id="time-left"` should reset to its default state. (Use useEffect)

// **User Story #19:** If the timer is running, the element with the id of `time-left` should display the remaining time in `mm:ss` format (decrementing by a value of 1 and updating the display every 1000ms).

// **User Story #20:** If the timer is running and I click the element with `id="start_stop"`, the countdown should pause.

// **User Story #21:** If the timer is paused and I click the element with `id="start_stop"`, the countdown should resume running from the point at which it was paused.

// **User Story #22:** When a session countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of `timer-label` should display a string indicating a break has begun.

// **User Story #23:** When a session countdown reaches zero (NOTE: timer MUST reach 00:00), a new break countdown should begin, counting down from the value currently displayed in the `id="break-length"` element.

// **User Story #24:** When a break countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of `timer-label` should display a string indicating a session has begun.

// **User Story #25:** When a break countdown reaches zero (NOTE: timer MUST reach 00:00), a new session countdown should begin, counting down from the value currently displayed in the `id="session-length"` element.

// **User Story #26:** When a countdown reaches zero (NOTE: timer MUST reach 00:00), a sound indicating that time is up should play. This should utilize an HTML5 `audio` tag and have a corresponding `id="beep"`.

// **User Story #27:** The audio element with `id="beep"` must be 1 second or longer.

// **User Story #28:** The audio element with id of `beep` must stop playing and be rewound to the beginning when the element with the id of `reset` is clicked.