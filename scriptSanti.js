const celdas = document.getElementsByTagName("td");
const flechas = document.getElementsByClassName("flechas");
const filas = document.getElementsByTagName("tr");
const columnas = document.getElementsByTagName("td");

window.onload = () => {
  const jugar = document.getElementById("jugar");
  jugar.onclick = comienzoJuego;

  flechas[1].addEventListener("click", moverDerecha);
  flechas[3].addEventListener("click", moverIzquierda);
};

function comienzoJuego() {
  let nceldas = celdas.length; //Numero de celdas
  let posicionMalo = Math.floor(Math.random() * (nceldas - 1)) + 1; //Posicion del malo

  let examenes;
  posicionBueno = 0; //Posicion del bueno
  celdas[posicionBueno].textContent = "Robert";
  celdas[posicionMalo].textContent = "Jaime";

  //Por si la posicion del malo es la misma que la del bueno
  do {
    examenes = Math.floor(Math.random() * (nceldas - 1)) + 1;
  } while (posicionMalo == examenes && examenes == celdas.length - 1);

  celdas[examenes].textContent = "Examen";
  jugar.disabled = "true";

  for (let i = 0; i < flechas.length; i++) {
    flechas[i].style.visibility = "visible";
  }
}

function moverDerecha() {
  let contador = 1
  for (let i = 0; i < columnas.length; i++) {
    if(i == ( contador * filas.length -1)){
      console.log(i)
      console.log(contador * filas.length -1)
      contador++;
    }
    else if ((columnas[i].textContent == 'Robert') && (i != (columnas.length -1))) {
      columnas[i].textContent = '-'
      columnas[i+1].textContent = 'Robert';
      i = columnas.length;
    }
  }
}


function moverIzquierda() {
  let contador = 1
  for (let i = 0; i < columnas.length; i++) {
    if(i % filas.length == 0){
      console.log(i)
      console.log(contador * filas.length -1)
      contador++;
    }
    else if ((columnas[i].textContent == 'Robert') && (i != (columnas.length -1))) {
      columnas[i].textContent = '-'
      columnas[i-1].textContent = 'Robert';
      i = columnas.length;
    }
  }
}