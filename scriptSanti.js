const celdas = document.getElementsByTagName("td");
const flechas = document.getElementsByClassName("flechas");
const filas = document.getElementsByTagName("tr");
const columnas = document.getElementsByTagName("td");
const tabla = document.getElementsByTagName("table")[0];
let encontrado = false;
// var posicionBueno = [[0]];

window.onload = () => {
  const jugar = document.getElementById("jugar");
  jugar.onclick = comienzoJuego;



//   flechas[0].addEventListener("click", moverArriba);
  flechas[1].addEventListener("click", moverDerecha);
//   flechas[2].addEventListener("click", moverAbajo);
//   flechas[3].addEventListener("click", moverIzquierda);
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

  for (let i = 0; i < flechas.length; i++) {
    flechas[i].addEventListener("click", console.log("hola"));
  }
}

function moverArriba() {}

function moverDerecha() {
    for (let i = 0; i < filas.length; i++) {
        console.log(filas.length)
        for (let j = 0; j < columnas.length; j++) {
            console.log(columnas.length)
          if (j != (filas.length-1) && columnas[j].textContent == "Robert") {
            columnas[j + 1].textContent = "Robert";
            columnas[j].textContent = "-";
            j += filas.length;
          }
          
          if (encontrado) j=columnas.length;
        }
        encontrado = false;
      }
}
// function moverDerecha() {
//   console.log(filas);
//   console.log(columnas);

//   // if(posicionBueno!=filas.length-1){

//   //     posicionBueno = posicionBueno + 1;
//   //     celdas[posicionBueno].textContent = 'Robert';

//   //     var posicionBuenoAnt = posicionBueno - 1;
//   //     celdas[posicionBuenoAnt].textContent = '-';
//   // }

//   // console.log(posicionBueno);
// }

function moverAbajo() {
  // console.log('abajo')
}

// function moverIzquierda() {
//   let posicion;

//   for (let i = 0; i < filas.length; i++) {
//     for (let j = 0; j < columnas.length; j++) {
//       if (j != 0 && columnas[j].textContent == "Robert") {
//         posicion = j - 1;
//         columnas[posicion].textContent = "Robert";
//         columnas[posicion + 1].textContent = "-";
//       }
//     }
//   }
//   console.log(posicion);
// }
