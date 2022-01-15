const celdas = document.getElementsByTagName('td');
const flechas = document.getElementsByClassName('flechas');
var posicionBueno;


window.onload = ()=>{    
    const jugar = document.getElementById('jugar');
    jugar.onclick = comienzoJuego;
    
    // mover();
    
    flechas[0].addEventListener('click', moverArriba)
    flechas[1].addEventListener('click', moverDerecha)
    flechas[2].addEventListener('click', moverAbajo)
    flechas[3].addEventListener('click', moverIzquierda)

   
}


function comienzoJuego() {    
    let nceldas=celdas.length; //Numero de celdas
    let posicionMalo = Math.floor(Math.random() * (nceldas-1)) + 1; //Posicion del malo
     
    let examenes;
    posicionBueno = 0; //Posicion del bueno
    celdas[posicionBueno].textContent = 'Robert';
    celdas[posicionMalo].textContent ='Jaime';

    //Por si la posicion del malo es la misma que la del bueno
    do {
        examenes = Math.floor(Math.random() * (nceldas-1)) + 1;    
    } while ((posicionMalo == examenes)&& examenes == (celdas.length-1));
    
    celdas[examenes].textContent ='Examen';
    jugar.disabled = 'true';
    
    for (let i = 0; i < flechas.length; i++) {
        flechas[i].style.visibility = 'visible';
    }

    for (let i = 0; i < flechas.length; i++) {
        flechas[i].addEventListener("click", console.log('hola'))
     }
}

function moverDerecha(){
    flechas[1].onclick=function(){

        var posicionActBueno = posicionBueno+1;
        celdas[posicionActBueno].textContent = 'Robert'
    }
    console.log('derecha')
}

function moverArriba() {
    // console.log('arriba')
}
function moverAbajo() {
    // console.log('abajo')
}
function moverIzquierda() {
    // console.log('izquierda')
}
