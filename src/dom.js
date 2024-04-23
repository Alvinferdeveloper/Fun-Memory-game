import { typeRecords, records } from "../services/initials.js";
import { getImagesToRender} from './imagesOrder.js'
import { convertSecondsToReadableTime } from "../services/helper.js";

export function renderImages({ images, reverseImage }) {
  const container = document.querySelector(".main");
  const imagesToRender = getImagesToRender({ amount: 4, images });
  container.innerHTML = "";
  imagesToRender.forEach(
    ({ id, imageUrl }) =>
      (container.innerHTML += `<div class="card" data-id=${id} data-reversable='true'>
                    <div class="card--front face">
                    <img src="${reverseImage}">
                    </div>
                    <div class="card--back face ">
                    <img src="${imageUrl}"
                    </div>
                 </div>`)
  );
}

export function openAndCloseSlider(){
    const iconToOpenRankSlider = document.querySelector(".icon--open");
    const iconToCloseRankSlider =document.querySelector(".icon--close");
    const sliderOfRanks = document.querySelector(".rank");
    const toggleSlider = () => sliderOfRanks.classList.toggle("rank--open");
    iconToOpenRankSlider.addEventListener("click",toggleSlider);
    iconToCloseRankSlider.addEventListener("click",toggleSlider);
}

export function flipCard(card){
    const cardFront = card.firstElementChild;
    const cardBack = cardFront.nextElementSibling;
    cardFront.classList.toggle("card--front--animation");
    cardBack.classList.toggle("card--back--animation");
}

export const changePlayIcon = (playing) =>{
    const button = document.querySelector(".control__start");
    playing ? button.innerHTML = "<i class='bx bx-pause'></i>" : button.innerHTML="<i class='bx bx-play'></i>"
}


export function renderNewRecord({ minutos, segundos, milisegundos},typeRecord,tematic){
    const rankTematicElement = document.querySelector(`.rank__tematic--${tematic}`);
    rankTematicElement.querySelector(`.${typeRecord}`).innerHTML= `${minutos}:${segundos}:${Math.round(milisegundos)}`
  }


export function renderInitialRecords() {
  const savedRecords = JSON.parse(localStorage.getItem("recordTimes"));
  if (!savedRecords)
    localStorage.setItem("recordTimes", JSON.stringify(records));
  else savedRecords.forEach((record) => {
    renderNewRecord(convertSecondsToReadableTime(record.bestTime),typeRecords.BESTTIME,record.tematic)
    renderNewRecord(convertSecondsToReadableTime(record.worstTime),typeRecords.WORSTTIME,record.tematic)
    
  });
}


export function changeChronometerTime({minutos,segundos,milisegundos}){
  const tiempo = `${minutos}:${segundos}:${Math.round(milisegundos)}`;
  document.getElementById("control__chronometer").innerText = tiempo;
}