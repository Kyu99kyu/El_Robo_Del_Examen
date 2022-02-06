var celdas = document.getElementsByTagName('td');
var cogerExamen=false; //Indica si se ha cogido el examen o no
var cogerSalida=false; //Indica si se ha cogido la salida o no
const nfilas = 8
var tabla=document.getElementsByTagName("table")[0];
var body=document.querySelector("body");
const flechas = document.getElementsByClassName('flechas');
var matriz=[[]];
var posicionBuenox=0;
var posicionBuenoy=0;
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

    posicionMalox = Math.floor(Math.random() * (nfilas-1)) + 1; //Posicion del malo
    posicionMaloy = Math.floor(Math.random() * (nfilas-1)) + 1; //Posicion del malo
    matriz[posicionMalox][posicionMaloy]="Jaime";

    do{
        examenesx = Math.floor(Math.random() * (nfilas-1)) + 1; 
        examenesy = Math.floor(Math.random() * (nfilas-1)) + 1; 
    }
    while(matriz[examenesx][examenesy]=="Jaime" || (examenesx==7 && examenesy==7));
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
    if(posicionBuenox!=0 && matriz[posicionBuenox-1][posicionBuenoy]!="O"){
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
    if(posicionBuenoy!=7 && matriz[posicionBuenox][posicionBuenoy+1]!="O"){
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
    if(posicionBuenox!=7 && matriz[posicionBuenox+1][posicionBuenoy]!="O"){
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
    if(posicionBuenoy!=0 && matriz[posicionBuenox][posicionBuenoy-1]!="O"){
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
        matriz[7][7]="Salida";
        cogerExamen=true; //El prota ha cogido el examen
        cogerSalida=true;
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
            if(posicionMaloy!=0 && matriz[posicionMalox][posicionMaloy-1]!="O"){
                moverMaloIzquierda();
                
            }
            else if(posicionMalox!=0 && matriz[posicionMalox-1][posicionMaloy]!="O"){
                moverMaloArriba();
                
            }
            else if(posicionMalox!=7 && matriz[posicionMalox+1][posicionMaloy]!="O"){
                moverMaloAbajo();
                
            }
            else if(posicionMaloy!=7 && matriz[posicionMalox][posicionMaloy+1]!="O"){
                moverMaloDerecha();
                
            }
        

        }
        //Derecha
        else if(posicionBuenoy>posicionMaloy){
            if(posicionMaloy!=7 && matriz[posicionMalox][posicionMaloy+1]!="O"){
                moverMaloDerecha();
                
            }
            else if(posicionMalox!=7 && matriz[posicionMalox+1][posicionMaloy]!="O"){
                moverMaloAbajo();
                
            }
            else if(posicionMalox!=0 && matriz[posicionMalox-1][posicionMaloy]!="O"){
                moverMaloArriba();
                
            }
            else if(posicionMaloy!=0 && matriz[posicionMalox][posicionMaloy-1]!="O"){
                moverMaloIzquierda();
                
            }
            
            

        }
    }
    //Se mueve eje y
    else if(Math.abs(posicionBuenox-posicionMalox)>Math.abs(posicionBuenoy-posicionMaloy)){
        //arriba
        if(posicionBuenox<posicionMalox){
            if(posicionMalox!=0 && matriz[posicionMalox-1][posicionMaloy]!="O"){
                moverMaloArriba();
                
            }
            else if(posicionMaloy!=0 && matriz[posicionMalox][posicionMaloy-1]!="O"){
                moverMaloIzquierda();
                
            }
            else if(posicionMaloy!=7 && matriz[posicionMalox][posicionMaloy+1]!="O"){
                moverMaloDerecha();
                
            }
            else if(posicionMalox!=7 && matriz[posicionMalox+1][posicionMaloy]!="O"){
                moverMaloAbajo();
                
            }
            
            

        }
        //abajo
        else if(posicionBuenox>posicionMalox){
            if(posicionMalox!=7 && matriz[posicionMalox+1][posicionMaloy]!="O"){
                moverMaloAbajo();
                
            }
            else if(posicionMaloy!=7 && matriz[posicionMalox][posicionMaloy+1]!="O"){
                moverMaloDerecha();
                
            }
            else if(posicionMaloy!=0 && matriz[posicionMalox][posicionMaloy-1]!="O"){
                moverMaloIzquierda();
                
            }
            else if(posicionMalox!=0 && matriz[posicionMalox-1][posicionMaloy]!="O"){
                moverMaloArriba();
                
            }
            

        }
    }
    //Por si la distancia entre x e y es =, hace un random pal eje x o el eje y
    else{
        var opcion=Math.floor(Math.random() * 1);
        if (opcion == 0){
            //arriba
            if(posicionBuenox<posicionMalox){
                if(posicionMalox!=0 && matriz[posicionMalox-1][posicionMaloy]!="O"){
                    moverMaloArriba();
                    
                }
                else if(posicionMaloy!=0 && matriz[posicionMalox][posicionMaloy-1]!="O"){
                    moverMaloIzquierda();
                    
                }
                else if(posicionMaloy!=7 && matriz[posicionMalox][posicionMaloy+1]!="O"){
                    moverMaloDerecha();
                    
                }
                else if(posicionMalox!=7 && matriz[posicionMalox+1][posicionMaloy]!="O"){
                    moverMaloAbajo();
                    
                }
                
                

            }
            //abajo
            else if(posicionBuenox>posicionMalox){
                if(posicionMalox!=7 && matriz[posicionMalox+1][posicionMaloy]!="O"){
                    moverMaloAbajo();
                    
                }
                else if(posicionMaloy!=7 && matriz[posicionMalox][posicionMaloy+1]!="O"){
                    moverMaloDerecha();
                    
                }
                else if(posicionMaloy!=0 && matriz[posicionMalox][posicionMaloy-1]!="O"){
                    moverMaloIzquierda();
                    
                }
                else if(posicionMalox!=0 && matriz[posicionMalox-1][posicionMaloy]!="O"){
                    moverMaloArriba();
                    
                }
                

            }
        }
        else{
            //izquierda
            if(posicionBuenoy<posicionMaloy){
                if(posicionMaloy!=0 && matriz[posicionMalox][posicionMaloy-1]!="O"){
                    moverMaloIzquierda();
                    
                }
                else if(posicionMalox!=0 && matriz[posicionMalox-1][posicionMaloy]!="O"){
                    moverMaloArriba();
                    
                }
                else if(posicionMalox!=7 && matriz[posicionMalox+1][posicionMaloy]!="O"){
                    moverMaloAbajo();
                    
                }
                else if(posicionMaloy!=7 && matriz[posicionMalox][posicionMaloy+1]!="O"){
                    moverMaloDerecha();
                    
                }
                

            }
            //Derecha
            else if(posicionBuenoy>posicionMaloy){
                if(posicionMaloy!=7 && matriz[posicionMalox][posicionMaloy+1]!="O"){
                    moverMaloDerecha();
                    
                }
                else if(posicionMalox!=7 && matriz[posicionMalox+1][posicionMaloy]!="O"){
                    moverMaloAbajo();
                    
                }
                else if(posicionMalox!=0 && matriz[posicionMalox-1][posicionMaloy]!="O"){
                    moverMaloArriba();
                    
                }
                else if(posicionMaloy!=0 && matriz[posicionMalox][posicionMaloy-1]!="O"){
                    moverMaloIzquierda();
                    
                }
                
                

            }
        }
    }
    
    //Para que el malo no se coma el examen
    if(posicionMalox==examenesx && posicionMaloy==examenesy && !cogerExamen){
        matriz[posicionMalox][posicionMaloy]="Examenes";
    }

    //Para que el malo no se coma la salida
    if(posicionMalox==nfilas-1 && posicionMaloy==nfilas-1 && cogerSalida) matriz[posicionMalox][posicionMaloy]="Salida";

    //Cuando pierdes
    if(posicionMalox==posicionBuenox && posicionMaloy==posicionBuenoy){
        alert("Has perdio makina");
        location.reload();
    }
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

function generarBloques(){

    for(let i=0;i<15;i++){
        paredx = Math.floor(Math.random() * (8-1));
        paredy = Math.floor(Math.random() * (8-1));

        if((posicionMalox!=paredx && posicionMaloy!=paredy) && (examenesx!=paredx || examenesy!=paredy) && (paredx!=7 && paredy!=7) && (paredx!=0 || paredy!=0) && (paredx!=0 && paredy!=1)){
            matriz[paredx][paredy]="O";
            celdas[(paredx*nfilas)+paredy].className="ladrillo"

        }
        else{
            i--
        }
        
    }  
}



