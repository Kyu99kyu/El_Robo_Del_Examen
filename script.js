const celdas = document.getElementsByTagName('td');
const filas = document.getElementsByTagName('tr');
const flechas = document.getElementsByClassName('flechas');
var posicionBueno;
var posicionMalo;
var examenes;
var salida;


window.onload = ()=>{    
    const jugar = document.getElementById('jugar');
    jugar.onclick = comienzoJuego;
    
    
    flechas[0].addEventListener('click', moverArriba);
    flechas[3].addEventListener('click', moverDerecha);
    flechas[2].addEventListener('click', moverAbajo);
    flechas[1].addEventListener('click', moverIzquierda);
    
}


function comienzoJuego() {    
    let nceldas=celdas.length; //Numero de celdas
    posicionMalo = Math.floor(Math.random() * (nceldas-1)) + 1; //Posicion del malo
     
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
    

}

function moverDerecha(){

    if((posicionBueno+1)%filas.length!=0){  //Solo se mueve si Robert no esta en una posicion que sea igual a un multiplo de la longitud de una fila (multiplos de 8)
        
        celdas[posicionBueno].textContent = '-';
        
        posicionBueno = posicionBueno + 1;
        celdas[posicionBueno].textContent = 'Robert';
    }

    apareceSalida();
    win();
    moverMalo();

}

function moverArriba() {

    if(posicionBueno>=filas.length){ //Solo se mueve si la posicion de Jaime es mayor a la longgitud de una fila, por lo que no estará en la primera fila
        //Empezara a moverse a partir de la posicion '8', es decir, a partir de la segunda fila

        celdas[posicionBueno].textContent = '-';

        posicionBueno = posicionBueno - filas.length;
        celdas[posicionBueno].textContent = 'Robert';
    }
    apareceSalida();
    win();
    moverMalo();
}

function moverAbajo() {
    
    if(posicionBueno<(celdas.length-filas.length)){ //Para la ultima fila restas el numero de celdas totales con la longitud de una fila
        //De manera que solo se mueve si Jaime no se encuentra en la ultima fila
        
    celdas[posicionBueno].textContent = '-';

    posicionBueno = posicionBueno + filas.length;
    celdas[posicionBueno].textContent = 'Robert';
    }
    apareceSalida();
    win();
    moverMalo();
}

function moverIzquierda() {

    if((posicionBueno)%filas.length!=0){  //Solo se mueve si Robert no esta en una posicion que sea igual a un (multiplo de la longitud de una fila + 1), que es la posicion siguiente a la ultiuma de la fila 
        
        celdas[posicionBueno].textContent = '-';
        
        posicionBueno = posicionBueno - 1;
        celdas[posicionBueno].textContent = 'Robert';
    }
    apareceSalida();
    win();
    moverMalo();
}


function apareceSalida(){

    if(posicionBueno==examenes){
        salida=celdas.length-1 
        celdas[salida].textContent="Y";
    }

}

function win(){

    if(posicionBueno==salida){
        alert("Has ganao fiera");
        location.reload(); //Empieza el juego de nuevo

    }
}

//Prueba del movimiento del malo
function moverMalo(){
    if(posicionBueno>posicionMalo){
        //abajo
        if(posicionBueno-posicionMalo<filas.length){
            celdas[posicionMalo].textContent = '-';

            posicionMalo = posicionMalo + filas.length;
            celdas[posicionMalo].textContent = 'Jaime';
        }
        //derecha
        else{
            celdas[posicionMalo].textContent = '-';
        
            posicionMalo = posicionMalo + 1;
            celdas[posicionMalo].textContent = 'Jaime';
        }
        
    }
    else if(posicionMalo>posicionBueno){
        //arriba
        if(posicionMalo-posicionBueno>filas.length){
            celdas[posicionMalo].textContent = '-';

            posicionMalo = posicionMalo - filas.length;
            celdas[posicionMalo].textContent = 'Jaime';
        }
        //izquierda
        else{
            celdas[posicionMalo].textContent = '-';
        
            posicionMalo = posicionMalo - 1;
            celdas[posicionMalo].textContent = 'Jaime';
        }
    }
    else if(posicionBueno == posicionMalo){
        alert("Has perdido");
        location.reload();
    }
    
    console.log("bueno "+posicionBueno);
    console.log("malo "+posicionMalo);
    
}
