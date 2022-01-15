const celdas = document.getElementsByTagName('td');
const filas = document.getElementsByTagName('tr');
const flechas = document.getElementsByClassName('flechas');
var posicionBueno;


window.onload = ()=>{    
    const jugar = document.getElementById('jugar');
    jugar.onclick = comienzoJuego;
    
    // mover();
    
    flechas[0].addEventListener('click', moverArriba)
    flechas[3].addEventListener('click', moverDerecha)
    flechas[2].addEventListener('click', moverAbajo)
    flechas[1].addEventListener('click', moverIzquierda)

   
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

    if((posicionBueno+1)%filas.length!=0){  //Solo se mueve si Robert no esta en una posicion que sea igual a un multiplo de la longitud de una fila (multiplos de 8)
        
        celdas[posicionBueno].textContent = '-';
        
        posicionBueno = posicionBueno + 1;
        celdas[posicionBueno].textContent = 'Robert';
    }
}

function moverArriba() {

    if(posicionBueno>filas.length){ //Solo se mueve si la posicion de Jaime es mayor a la longgitud de una fila, por lo que no estará en la primera fila
        //Empezara a moverse a partir de la posicion '8', es decir, a partir de la segunda fila

        celdas[posicionBueno].textContent = '-';

        posicionBueno = posicionBueno - filas.length;
        celdas[posicionBueno].textContent = 'Robert';
    }

}
function moverAbajo() {
    
    if(posicionBueno<(celdas.length-filas.length)){ //Para la ultima fila restas el numero de celdas totales con la longitud de una fila
        //De manera que solo se mueve si Jaime no se encuentra en la ultima fila
        
    celdas[posicionBueno].textContent = '-';

    posicionBueno = posicionBueno + filas.length;
    celdas[posicionBueno].textContent = 'Robert';
    }

}

function moverIzquierda() {

    if((posicionBueno)%filas.length!=0){  //Solo se mueve si Robert no esta en una posicion que sea igual a un (multiplo de la longitud de una fila + 1), que es la posicion siguiente a la ultiuma de la fila 
        
        celdas[posicionBueno].textContent = '-';
        
        posicionBueno = posicionBueno - 1;
        celdas[posicionBueno].textContent = 'Robert';
    }
}
