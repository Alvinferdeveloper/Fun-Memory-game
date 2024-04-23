import { changePlayIcon, openAndCloseSlider} from "./src/dom.js";
import {  startChronometer, setChronometerToInitialValue } from "./src/cronometro.js";
import { isGameOver } from "./src/game.js";
import { tematicsInfo } from "./resources/images.js";
import { renderInitialRecords } from "./src/dom.js";
import { renderImages } from "./src/dom.js";

export let  currentTematic = "futbol";

const handleButtonsTematic = ({ target }) => {
 currentTematic = target.name;
 renderImages(tematicsInfo[currentTematic]);
 setChronometerToInitialValue();
 changePlayIcon(false);
}

const handleButtonStartChronometer = () => {
  isGameOver() && (renderImages(tematicsInfo[currentTematic]));
  startChronometer();
  changePlayIcon(true);
}


const buttons = [...document.querySelectorAll(".tematic__button")];
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonsTematic);
});

const buttonToStart = document.querySelector(".control__start");
buttonToStart.addEventListener("click",handleButtonStartChronometer);

addEventListener("DOMContentLoaded", () => {
  renderImages(tematicsInfo["futbol"]);
  openAndCloseSlider();
  renderInitialRecords();
});


