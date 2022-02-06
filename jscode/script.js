var celdas = document.getElementsByTagName('td');
var cogerExamen=false; //Indica si se ha cogido el examen o no
var cogerSalida=false; //Indica si se ha cogido la salida o no
const nfilas = 10
var tabla=document.getElementsByTagName("table")[0];
var body=document.querySelector("body");
const flechas = document.getElementsByClassName('flechas');
var matriz=[[]];
var posicionBuenox=1;
var posicionBuenoy=1;
var posicionMalox;
var posicionMaloy;
var nceldas;
var examenesx;
var examenesy;
var salida;
var paredx;
var paredy;


window.onload = ()=>{    
    comienzoJuego();
    
    window.onkeyup=movimientoTeclas; //Para moverlo con las teclas tambien flama

    document.querySelectorAll("button")[0].addEventListener('click', function(){
        location.reload();
    });

    document.querySelectorAll("button")[1].addEventListener('click', function(){
        window.location.href = "./menu.html";
    });

    
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
    document.body.insertBefore(tabla,document.querySelector("div"));

    for(let i=0;i<nfilas;i++){
        var fila=document.createElement("tr");
        tabla.appendChild(fila);

        for(let j=0;j<nfilas;j++){
            var celda=document.createElement("td");
            celda.textContent=matriz[i][j];

            if(celda.textContent=="O"){ //Para que se mantengan los ladrillos
                celda.className="ladrillo"
            }
            else if(celda.textContent=="Examenes") celda.className="examenes";
            else if(celda.textContent=="Jaime") celda.className="malo";
            else if(celda.textContent=="Robert") celda.className="personaje";
            else if(celda.textContent=="Salida") celda.className="salida";

            fila.appendChild(celda);
        }
    }
}

function comienzoJuego(){

    crearMatriz();

    matriz[posicionBuenox][posicionBuenoy]="Robert"; //Posicion del bueno

    posicionMalox = Math.floor(Math.random() * (nfilas-4)) + 2; //Posicion del malo
    posicionMaloy = Math.floor(Math.random() * (nfilas-4)) + 2; //Posicion del malo
    matriz[posicionMalox][posicionMaloy]="Jaime";

    do{
        examenesx = Math.floor(Math.random() * (nfilas-3)+1); 
        examenesy = Math.floor(Math.random() * (nfilas-3)+1); 
    }
    while((examenesx==1 && examenesy==1) || (examenesx==8 && examenesy==8));
    matriz[examenesx][examenesy]="Examenes";

    
    crearTabla();
    movimientoResponsive();
    generarBloques();
    apareceFlechas();
    
    

}

function movimientoResponsive(){
    if(posicionBuenoy<nfilas-1) celdas[(posicionBuenox*nfilas)+posicionBuenoy+1].addEventListener('click', moverDerecha);
    if(posicionBuenox<nfilas-1) celdas[(posicionBuenox*nfilas)+posicionBuenoy+nfilas].addEventListener('click', moverAbajo);
    if(posicionBuenoy>0) celdas[(posicionBuenox*nfilas)+posicionBuenoy-1].addEventListener('click', moverIzquierda);
    if(posicionBuenox>0) celdas[(posicionBuenox*nfilas)+posicionBuenoy-nfilas].addEventListener('click', moverArriba);
}


function moverArriba(){
    if(matriz[posicionBuenox-1][posicionBuenoy]!="O"){
        matriz[posicionBuenox][posicionBuenoy]=".";
        posicionBuenox--
        matriz[posicionBuenox][posicionBuenoy]="Robert";

        document.querySelector("table").parentNode.removeChild(document.querySelector("table")); //Borrar tabla
        //body.removeChild(body.lastChild); //Borrar tabla

        apareceSalida()
        moverMalo()
        crearTabla();
        movimientoResponsive();
        win();
    }
}

function moverDerecha(){
    if(matriz[posicionBuenox][posicionBuenoy+1]!="O"){
        matriz[posicionBuenox][posicionBuenoy]=".";
        posicionBuenoy++
        matriz[posicionBuenox][posicionBuenoy]="Robert";

        document.querySelector("table").parentNode.removeChild(document.querySelector("table")); //Borrar tabla

        apareceSalida()
        moverMalo()
        crearTabla();  
        movimientoResponsive();
        win();
        
    }
}

function moverAbajo(){
    if(matriz[posicionBuenox+1][posicionBuenoy]!="O"){
        matriz[posicionBuenox][posicionBuenoy]=".";
        posicionBuenox++
        matriz[posicionBuenox][posicionBuenoy]="Robert";

        document.querySelector("table").parentNode.removeChild(document.querySelector("table")); //Borrar tabla

        apareceSalida()
        moverMalo()
        crearTabla();
        movimientoResponsive();
        win();
    }
    
}

function moverIzquierda(){
    if(matriz[posicionBuenox][posicionBuenoy-1]!="O"){
        matriz[posicionBuenox][posicionBuenoy]=".";
        posicionBuenoy--
        matriz[posicionBuenox][posicionBuenoy]="Robert";

        document.querySelector("table").parentNode.removeChild(document.querySelector("table")); //Borrar tabla

        apareceSalida()
        moverMalo()
        crearTabla();
        movimientoResponsive();
        win();
    }
    
}

function apareceSalida(){

    if(posicionBuenox==examenesx && posicionBuenoy==examenesy){
        matriz[8][8]="Salida";
        cogerExamen=true; //El prota ha cogido el examen
        cogerSalida=true;
    }

}

function win(){

    if(posicionBuenox==8 && posicionBuenoy==8 && matriz[examenesx][examenesy]!="Examenes"){
        var div=document.createElement("div");
        div.className="win";
        document.body.appendChild(div);

        var h1=document.createElement("h1");
        h1.textContent="LLEGASTE VIVO A CASA"
        div.appendChild(h1);

        var p=document.createElement("p");
        p.textContent="Toca o pulsa cualquier tecla para jugar de nuevo"
        div.appendChild(p);

        div.onclick=function(){
            location.reload();
        }

        document.body.onkeydown=function(){
            location.reload();
        }

    }
}

function loose(){
    //Cuando pierdes
    if(posicionMalox==posicionBuenox && posicionMaloy==posicionBuenoy){
        var div=document.createElement("div");
        div.className="win";
        div.style.backgroundColor="rgba(0, 0, 0, 0.85)"
        document.body.appendChild(div);

        var h1=document.createElement("h1");
        h1.textContent="TE ALCANZÓ Y NO RECUERDAS NADA MÁS"
        h1.style.color="red"
        div.appendChild(h1);

        var p=document.createElement("p");
        p.textContent="Toca o pulsa cualquier tecla para intentarlo de nuevo de nuevo"
        p.style.color="red"
        div.appendChild(p);

        div.onclick=function(){
            location.reload();
        }

        document.body.onkeydown=function(){
            location.reload();
        }
    }
}

function moverMalo(){
    //Se mueve en el eje x
    if(Math.abs(posicionBuenox-posicionMalox)<Math.abs(posicionBuenoy-posicionMaloy)){
        //izquierda
        if(posicionBuenoy<posicionMaloy){
            if(matriz[posicionMalox][posicionMaloy-1]!="O") moverMaloIzquierda();
                
            else if(matriz[posicionMalox-1][posicionMaloy]!="O") moverMaloArriba();
            else if(matriz[posicionMalox+1][posicionMaloy]!="O") moverMaloAbajo();
            else if(matriz[posicionMalox][posicionMaloy+1]!="O") moverMaloDerecha();
        }
        //Derecha
        else if(posicionBuenoy>posicionMaloy){
            if(matriz[posicionMalox][posicionMaloy+1]!="O") moverMaloDerecha();
            else if(matriz[posicionMalox+1][posicionMaloy]!="O") moverMaloAbajo();
            else if(matriz[posicionMalox-1][posicionMaloy]!="O") moverMaloArriba();
            else if(matriz[posicionMalox][posicionMaloy-1]!="O") moverMaloIzquierda();
        }
    }
    //Se mueve eje y
    else if(Math.abs(posicionBuenox-posicionMalox)>Math.abs(posicionBuenoy-posicionMaloy)){
        //arriba
        if(posicionBuenox<posicionMalox){
            if(matriz[posicionMalox-1][posicionMaloy]!="O") moverMaloArriba();
            else if( matriz[posicionMalox][posicionMaloy-1]!="O") moverMaloIzquierda();
            else if(matriz[posicionMalox][posicionMaloy+1]!="O") moverMaloDerecha();
            else if(matriz[posicionMalox+1][posicionMaloy]!="O") moverMaloAbajo();
        }
        //abajo
        else if(posicionBuenox>posicionMalox){
            if(matriz[posicionMalox+1][posicionMaloy]!="O") moverMaloAbajo();
            else if(matriz[posicionMalox][posicionMaloy+1]!="O") moverMaloDerecha();
            else if(matriz[posicionMalox][posicionMaloy-1]!="O") moverMaloIzquierda();
            else if(matriz[posicionMalox-1][posicionMaloy]!="O") moverMaloArriba();
        }
    }
    //Por si la distancia entre x e y es =, hace un random pal eje x o el eje y
    else{
        var opcion=Math.floor(Math.random() * 1);
        if (opcion == 0){
            //arriba
            if(posicionBuenox<posicionMalox){
                if(matriz[posicionMalox-1][posicionMaloy]!="O") moverMaloArriba();
                else if(matriz[posicionMalox][posicionMaloy-1]!="O") moverMaloIzquierda();
                else if(matriz[posicionMalox][posicionMaloy+1]!="O") moverMaloDerecha();
                else if(matriz[posicionMalox+1][posicionMaloy]!="O") moverMaloAbajo();
            }
            //abajo
            else if(posicionBuenox>posicionMalox){
                if(matriz[posicionMalox+1][posicionMaloy]!="O") moverMaloAbajo();
                else if(matriz[posicionMalox][posicionMaloy+1]!="O") moverMaloDerecha();
                else if(matriz[posicionMalox][posicionMaloy-1]!="O") moverMaloIzquierda();
                else if(matriz[posicionMalox-1][posicionMaloy]!="O") moverMaloArriba();
            }
        }
        else{
            //izquierda
            if(posicionBuenoy<posicionMaloy){
                if(matriz[posicionMalox][posicionMaloy-1]!="O") moverMaloIzquierda();
                else if(matriz[posicionMalox-1][posicionMaloy]!="O") moverMaloArriba();
                else if(matriz[posicionMalox+1][posicionMaloy]!="O") moverMaloAbajo(); 
                else if(matriz[posicionMalox][posicionMaloy+1]!="O") moverMaloDerecha();
            }
            //Derecha
            else if(posicionBuenoy>posicionMaloy){
                if(matriz[posicionMalox][posicionMaloy+1]!="O") moverMaloDerecha();
                else if(matriz[posicionMalox+1][posicionMaloy]!="O") moverMaloAbajo();
                else if(matriz[posicionMalox-1][posicionMaloy]!="O") moverMaloArriba();
                else if(matriz[posicionMalox][posicionMaloy-1]!="O") moverMaloIzquierda();
            }
        }
    }
    
    //Para que el malo no se coma el examen
    if(posicionMalox==examenesx && posicionMaloy==examenesy && !cogerExamen){
        matriz[posicionMalox][posicionMaloy]="Examenes";
    }

    //Para que el malo no se coma la salida
    if(posicionMalox==nfilas-1 && posicionMaloy==nfilas-1 && cogerSalida) matriz[posicionMalox][posicionMaloy]="Salida";

    loose();
}

function moverMaloDerecha(){
    if(matriz[posicionMalox][posicionMaloy]!="Examenes" && matriz[posicionMalox][posicionMaloy]!="Salida") matriz[posicionMalox][posicionMaloy]=".";
        posicionMaloy++
        matriz[posicionMalox][posicionMaloy]="Jaime";
        
}

function moverMaloIzquierda(){
    if(matriz[posicionMalox][posicionMaloy]!="Examenes" && matriz[posicionMalox][posicionMaloy]!="Salida") matriz[posicionMalox][posicionMaloy]=".";
        posicionMaloy--;
        matriz[posicionMalox][posicionMaloy]="Jaime";
        
}

function moverMaloArriba(){
    if(matriz[posicionMalox][posicionMaloy]!="Examenes" && matriz[posicionMalox][posicionMaloy]!="Salida") matriz[posicionMalox][posicionMaloy]=".";
        posicionMalox--
        matriz[posicionMalox][posicionMaloy]="Jaime";
        
    
}

function moverMaloAbajo(){
    if(matriz[posicionMalox][posicionMaloy]!="Examenes" && matriz[posicionMalox][posicionMaloy]!="Salida") matriz[posicionMalox][posicionMaloy]=".";
        posicionMalox++
        matriz[posicionMalox][posicionMaloy]="Jaime";
        
}

function defaultLadrillos(){
    for(let i=0;i<nfilas;i++){
        for(let j=0;j<nfilas;j++){
            if(i==0){
                matriz[i][j]="O";
                celdas[(i*nfilas)+j].className="ladrillo"
            }
            if(i==nfilas-1){
                matriz[i][j]="O";
                celdas[(i*nfilas)+j].className="ladrillo"
            }
            if(j==0){
                matriz[i][j]="O";
                celdas[(i*nfilas)+j].className="ladrillo"
            }
            if(j==nfilas-1){
                matriz[i][j]="O";
                celdas[(i*nfilas)+j].className="ladrillo"
            }
            
            
        }
    }
}

function generarBloques(){

    for(let i=0;i<15;i++){

        defaultLadrillos();

        paredx = Math.floor(Math.random() * (nfilas-3)+1);
        paredy = Math.floor(Math.random() * (nfilas-3)+1);

        if((posicionMalox!=paredx && posicionMaloy!=paredy) && (examenesx!=paredx || examenesy!=paredy) && (paredx!=8 && paredy!=8) && (paredx!=1 || paredy!=1) && (paredx!=1 && paredy!=2)){
            matriz[paredx][paredy]="O";
            celdas[(paredx*nfilas)+paredy].className="ladrillo"

        }
        else{
            i--
        }
        
    }  
}



