function addZero(valor) {
    return valor < 10 ? `0${valor}` : valor;
  }
  
  
  export function convertSecondsToReadableTime(time){
    const milisegundosTotales = Math.floor(time);
    const segundosTotales = Math.floor(time / 1000);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = segundosTotales % 60;
    const milisegundos = (milisegundosTotales % 900)/100;
  
    return {
      minutos:addZero(minutos),
      segundos:addZero(segundos),
      milisegundos:addZero(milisegundos),
    }
  }