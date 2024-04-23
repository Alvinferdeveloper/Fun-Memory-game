
import { changeChronometerTime } from "./dom.js";
import { startGame } from "./game.js"
import { convertSecondsToReadableTime } from "../services/helper.js";

export let startTime;
let isRunning = false;

export function startChronometer() {
  if (!isRunning) {
    startTime = performance.now();
    isRunning = true;
    startGame();
    updateTime();
  }
}

export function stopChronometer() {
  isRunning = false;
}

export function setChronometerToInitialValue(){
  stopChronometer();
  changeChronometerTime(convertSecondsToReadableTime(0));
}


function updateTime() {
  const currentTime = performance.now();
  const elapsedTime = currentTime - startTime;
  const time = convertSecondsToReadableTime(elapsedTime);

  if (isRunning) {
    requestAnimationFrame(updateTime);
    changeChronometerTime(time);
  }
}

