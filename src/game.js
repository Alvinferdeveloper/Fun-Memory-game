import { flipCard, changePlayIcon, renderNewRecord } from './dom.js'
import { stopChronometer, startTime } from './cronometro.js'
import { currentTematic } from '../index.js'
import { typeRecords } from '../services/initials.js'
import { convertSecondsToReadableTime } from '../services/helper.js'


let lastCardShowed;
let counterOfFlippedImages = 0;

export function startGame(){
   lastCardShowed=null;
   counterOfFlippedImages=0;
    const cards = [...document.querySelectorAll(".card")];
    cards.forEach((card) => {
      card.addEventListener("click", ()=> gameLogic(card));
    });
}

function gameLogic(card){
  const isCurrentCardReversable = card.getAttribute("data-reversable") == "false" ? false : true;
  const lastCardId = lastCardShowed?.getAttribute("data-id");
  const currentCardId = card.getAttribute("data-id");

  if (isCurrentCardReversable) {
    flipCard(card);
    counterOfFlippedImages++;
  } else return;
  
  if (
    lastCardId == currentCardId &&
    counterOfFlippedImages == 2 &&
    card != lastCardShowed
  ) {
    lastCardShowed.setAttribute("data-reversable", "false");
    card.setAttribute("data-reversable", "false");
    counterOfFlippedImages = 0;
    if(isGameOver()){
      stopChronometer();
      changePlayIcon(false);
      setRecords();

    }
   
  } else if(counterOfFlippedImages ==2 ) {
    const lastCardCopy = lastCardShowed;
    setTimeout(() => {
     flipCard(card);
     flipCard(lastCardCopy)
    }, 1000);

    counterOfFlippedImages = 0;
  }
  lastCardShowed=card
}


export const isGameOver=()=>{
  const cards = [...document.querySelectorAll('.card')];
 return cards.every(card=>card.dataset.reversable == "false" ? true:false);
}

const setRecords = ()=>{
  let currentTime = performance.now()-startTime;
  const recordTimes = JSON.parse(localStorage.getItem('recordTimes'));
  
    const newRecordsTimes = recordTimes.map(record => {
      let newRecord = {...record};
      if(record.tematic == currentTematic){
        if(currentTime < record.bestTime || record.bestTime == 0){
          newRecord = {
            ...newRecord,
            bestTime:currentTime,
          }
          renderNewRecord(convertSecondsToReadableTime(currentTime),typeRecords.BESTTIME,record.tematic) 
        }
        if(currentTime > record.worstTime){
          newRecord = {
            ...newRecord,
            worstTime:currentTime
          }
          renderNewRecord(convertSecondsToReadableTime(currentTime),typeRecords.WORSTTIME,record.tematic) 
        }
      }
      return newRecord
    })
    localStorage.setItem("recordTimes", JSON.stringify(newRecordsTimes))
  }



 