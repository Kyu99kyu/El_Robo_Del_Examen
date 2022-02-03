//const nceldas = document.getElementsByTagName('td');
const nfilas = 8
var tabla=document.getElementsByTagName("table")[0];
var body=document.querySelector("body");
const flechas = document.getElementsByClassName('flechas');
var matriz=[[]];
var posicionBuenox;
var posicionBuenoy;
var posicionMalox;
var posicionMaloy;
var nceldas;
var examenesx;
var examenesy;
var salida;
var filaBueno=0; //Fila en la que se encuentra el bueno
var filaMalo=-1; //Fila en la que se encuentra el malo
var cont=0; //contador para saber en que fila estoy (se utiliza en el metodo comprobarFilaMalo())
var paredx;
var paredy;


window.onload = ()=>{    
    const jugar = document.getElementById('jugar');
    jugar.onclick = comienzoJuego;
    
    
    flechas[0].addEventListener('click', moverArriba);
    flechas[3].addEventListener('click', moverDerecha);
    flechas[2].addEventListener('click', moverAbajo);
    flechas[1].addEventListener('click', moverIzquierda);

    window.onkeyup=movimientoTeclas; //Para moverlo con las teclas tambien flama
    
}

function movimientoTeclas(event){
	if(event.keyCode == '39'){//derecha
		moverDerecha();
	}

	if(event.keyCode == '37'){//Izquierda
		moverIzquierda();
	}
	
	if(event.keyCode == '38'){//arriba
		moverArriba();
	}

	if(event.keyCode == '40'){//abajo
		moverAbajo();
	}

}

function apareceFlechas(){
    for (let i = 0; i < flechas.length; i++) {
        flechas[i].style.visibility = 'visible';
    }
}


function crearMatriz(){
    
    for(let i=0;i<nfilas;i++){
        matriz[i]=[];
        for(let j=0;j<nfilas;j++){
            matriz[i][j]=".";
        }
    }
}

function crearTabla(){
    var tabla= document.createElement("table");
    document.body.appendChild(tabla);

    for(let i=0;i<nfilas;i++){
        var fila=document.createElement("tr");
        tabla.appendChild(fila);

        for(let j=0;j<nfilas;j++){
            var celda=document.createElement("td");
            celda.textContent=matriz[i][j];
            fila.appendChild(celda);
        }
    }
}

function comienzoJuego(){
    jugar.disabled = 'true';

    crearMatriz();
    posicionBuenox=0;
    posicionBuenoy=0;

    matriz[posicionBuenox][posicionBuenoy]="Robert"; //Posicion del bueno

    posicionMalox = Math.floor(Math.random() * (nfilas-1)) + 1; //Posicion del malo
    posicionMaloy = Math.floor(Math.random() * (nfilas-1)) + 1; //Posicion del malo
    matriz[posicionMalox][posicionMaloy]="Jaime";

    do{
        examenesx = Math.floor(Math.random() * (nfilas-1)) + 1; 
        examenesy = Math.floor(Math.random() * (nfilas-1)) + 1; 
    }
    while(matriz[examenesx][examenesy]=="Jaime" || (examenesx==7 && examenesy==7));
    matriz[examenesx][examenesy]="Examenes";

    generarBloques();
    crearTabla();
    apareceFlechas();
    
    

}


function moverArriba(){
    if(posicionBuenox!=0){
        matriz[posicionBuenox][posicionBuenoy]=".";
        posicionBuenox--
        matriz[posicionBuenox][posicionBuenoy]="Robert";

        document.querySelector("body").removeChild(document.querySelector("body").lastChild); //Borrar tabla
        //body.removeChild(body.lastChild); //Borrar tabla

        apareceSalida()
        moverMalo();
        crearTabla();
        win();
    }
}

function moverDerecha(){
    if(posicionBuenoy!=7){
        matriz[posicionBuenox][posicionBuenoy]=".";
        posicionBuenoy++
        matriz[posicionBuenox][posicionBuenoy]="Robert";

        document.querySelector("body").removeChild(document.querySelector("body").lastChild); //Borrar tabla

        apareceSalida()
        moverMalo();
        crearTabla();  
        win();
        
    }
}

function moverAbajo(){
    if(posicionBuenox!=7){
        matriz[posicionBuenox][posicionBuenoy]=".";
        posicionBuenox++
        matriz[posicionBuenox][posicionBuenoy]="Robert";

        document.querySelector("body").removeChild(document.querySelector("body").lastChild); //Borrar tabla

        apareceSalida()
        moverMalo();
        crearTabla();
        win();
    }
    
}

function moverIzquierda(){
    if(posicionBuenoy!=0){
        matriz[posicionBuenox][posicionBuenoy]=".";
        posicionBuenoy--
        matriz[posicionBuenox][posicionBuenoy]="Robert";

        document.querySelector("body").removeChild(document.querySelector("body").lastChild); //Borrar tabla

        apareceSalida()
        moverMalo();
        crearTabla();
        win();
    }
    
}

function apareceSalida(){

    if(posicionBuenox==examenesx && posicionBuenoy==examenesy){
        matriz[7][7]="Salida";
    }

}

function win(){

    if(posicionBuenox==7 && posicionBuenoy==7 && matriz[examenesx][examenesy]!="Examenes"){
        alert("Has ganao fiera");
        location.reload(); //Empieza el juego de nuevo

    }
}

function moverMalo(){
    //Se mueve en el eje x
    if(Math.abs(posicionBuenox-posicionMalox)<Math.abs(posicionBuenoy-posicionMaloy)){
        //izquierda
        if(posicionBuenoy<posicionMaloy){
            if(posicionMaloy!=0){
                matriz[posicionMalox][posicionMaloy]=".";
                posicionMaloy--
                matriz[posicionMalox][posicionMaloy]="Jaime";
            }
        }
        //Derecha
        else if(posicionBuenoy>posicionMaloy){
            if(posicionMaloy!=7){
                matriz[posicionMalox][posicionMaloy]=".";
                posicionMaloy++
                matriz[posicionMalox][posicionMaloy]="Jaime";
            }
        }
    }
    //Se mueve eje y
    else if(Math.abs(posicionBuenox-posicionMalox)>Math.abs(posicionBuenoy-posicionMaloy)){
        //arriba
        if(posicionBuenox<posicionMalox){
            if(posicionMalox!=0){
                matriz[posicionMalox][posicionMaloy]=".";
                posicionMalox--
                matriz[posicionMalox][posicionMaloy]="Jaime";
            }
        }
        //abajo
        else if(posicionBuenox>posicionMalox){
            if(posicionMalox!=7){
                matriz[posicionMalox][posicionMaloy]=".";
                posicionMalox++
                matriz[posicionMalox][posicionMaloy]="Jaime";
            }
        }
    }
    //Por si la distancia entre x e y es =, hace un random pal eje x o el eje y
    else{
        var opcion=Math.floor(Math.random() * 1);
        if (opcion == 0){
            //arriba
            if(posicionBuenox<posicionMalox){
                if(posicionMalox!=0){
                    matriz[posicionMalox][posicionMaloy]=".";
                    posicionMalox--
                    matriz[posicionMalox][posicionMaloy]="Jaime";
                }
            }
            //abajo
            else if(posicionBuenox>posicionMalox){
                if(posicionMalox!=7){
                    matriz[posicionMalox][posicionMaloy]=".";
                    posicionMalox++
                    matriz[posicionMalox][posicionMaloy]="Jaime";
                }
            }
        }
        else{
            //izquierda
            if(posicionBuenoy<posicionMaloy){
                if(posicionMaloy!=0){
                    matriz[posicionMalox][posicionMaloy]=".";
                    posicionMaloy--
                    matriz[posicionMalox][posicionMaloy]="Jaime";
                }
            }
            //Derecha
            else if(posicionBuenoy>posicionMaloy){
                if(posicionMaloy!=7){
                    matriz[posicionMalox][posicionMaloy]=".";
                    posicionMaloy++
                    matriz[posicionMalox][posicionMaloy]="Jaime";
                }
            }
        }
    }

    if(posicionMalox==posicionBuenox && posicionMaloy==posicionBuenoy){
        alert("Has perdio makina");
        location.reload();
    }
}

function generarBloques(){

    for(let i=0;i<15;i++){
        paredx = Math.floor(Math.random() * (8-1)) + 1;
        paredy = Math.floor(Math.random() * (8-1)) + 1;

        if((posicionMalox!=paredx && posicionMaloy!=paredy) && (examenesx!=paredx || examenesy!=paredy) && (paredx!=7 && paredy!=7)){
            matriz[paredx][paredy]="O";

        }
        else{
            i--
        }
        
    }  
}


/*
function comienzoJuego() {    
    nceldas=celdas.length; //Numero de celdas
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

    generarBloques(); 
    comprobarFilaMalo(); 

    //console.log("filabueno: " +filaBueno)
    //console.log("filamalo: " +filaMalo)

    console.log("Posicion malo: "+posicionMalo)
    console.log("Posicion examen: "+examenes)
    
    

}
*/

/*
function moverDerecha(){

    if((posicionBueno+1)%filas.length!=0){  //Solo se mueve si Robert no esta en una posicion que sea igual a un multiplo de la longitud de una fila (multiplos de 8)
        
        celdas[posicionBueno].textContent = '-';
        
        posicionBueno = posicionBueno + 1;
        celdas[posicionBueno].textContent = 'Robert';

        apareceSalida();
        win();
        setTimeout(() => moverMalo(), 300);
    }



    console.log("filabueno: " +filaBueno)
    
    

}

function moverArriba() {

    if(posicionBueno>=filas.length){ //Solo se mueve si la posicion de Jaime es mayor a la longgitud de una fila, por lo que no estará en la primera fila
        //Empezara a moverse a partir de la posicion '8', es decir, a partir de la segunda fila

        celdas[posicionBueno].textContent = '-';

        posicionBueno = posicionBueno - filas.length;
        celdas[posicionBueno].textContent = 'Robert';

        filaBueno--;

        apareceSalida();
        win();
        setTimeout(() => moverMalo(), 300);
    }
    

    console.log("filabueno: " +filaBueno)
    

}

function moverAbajo() {
    
    if(posicionBueno<(celdas.length-filas.length)){ //Para la ultima fila restas el numero de celdas totales con la longitud de una fila
        //De manera que solo se mueve si Jaime no se encuentra en la ultima fila
        
        celdas[posicionBueno].textContent = '-';

        posicionBueno = posicionBueno + filas.length;
        celdas[posicionBueno].textContent = 'Robert';

        filaBueno++;

        apareceSalida();
        win();
        setTimeout(() => moverMalo(), 300);
    }


    console.log("filabueno: " +filaBueno)
    
}

function moverIzquierda() {

    if((posicionBueno)%filas.length!=0){  //Solo se mueve si Robert no esta en una posicion que sea igual a un (multiplo de la longitud de una fila + 1), que es la posicion siguiente a la ultiuma de la fila 
        
        celdas[posicionBueno].textContent = '-';
        
        posicionBueno = posicionBueno - 1;
        celdas[posicionBueno].textContent = 'Robert';

        apareceSalida();
        win();
        setTimeout(() => moverMalo(), 300);
        
    }
    

    console.log("filabueno: " +filaBueno)
    
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
        if(filaBueno>filaMalo){
            celdas[posicionMalo].textContent = '-';

            posicionMalo = posicionMalo + filas.length;
            celdas[posicionMalo].textContent = 'Jaime';

            if(filaMalo!=7){
                filaMalo++;
            }
            
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
        if(filaBueno<filaMalo){
            celdas[posicionMalo].textContent = '-';

            posicionMalo = posicionMalo - filas.length;
            celdas[posicionMalo].textContent = 'Jaime';

            if(filaMalo!=0){
                filaMalo--;
            }
            
        }
        //izquierda
        else{
            celdas[posicionMalo].textContent = '-';
        
            posicionMalo = posicionMalo - 1;
            celdas[posicionMalo].textContent = 'Jaime';
        }
    }
    

    if(posicionMalo==posicionBueno){
        alert("Has perdio makina");
        location.reload();
    }

    //console.log("bueno "+posicionBueno);
    //console.log("malo "+posicionMalo);

    console.log("filamalo: "+filaMalo)
    
}

function comprobarFilaMalo(){
    
    while(posicionMalo>=cont){
        cont=cont+filas.length;
        filaMalo++;
    }
    
}

function movimientoTeclas(event){
	if(event.keyCode == '39'){//derecha
		moverDerecha();
	}

	if(event.keyCode == '37'){//Izquierda
		moverIzquierda();
	}
	
	if(event.keyCode == '38'){//arriba
		moverArriba();
	}

	if(event.keyCode == '40'){//abajo
		moverAbajo();
	}

}

function generarBloques(){

    for(let i=0;i<16;i++){
        pared = Math.floor(Math.random() * (nceldas-2)) + 1;

        if(posicionMalo!=pared && examenes!=pared){
            celdas[pared].style.backgroundColor="black";
            celdas[pared].id="pared";

        }
        else{
            i--
        }
        
    }  
}

*/


