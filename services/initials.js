const tematics = ["futbol","pokemon","dragonBall","superHeroes"];

export const records = tematics.map((tematic) => {
  return {
    tematic,
    bestTime: 0,
    worstTime: 0,
  };
});

export const typeRecords = {
    BESTTIME:"besttime",
    WORSTTIME:"worsttime"
}


