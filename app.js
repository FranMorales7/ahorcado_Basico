/**REFERENCIAS AL HTML */
let intentosRestantes = document.getElementById("intentos");

let intentos = 10;
function dibujarAhorcado(intento){
    const canvas = document.querySelector("#ahorcadoCanvas");
    const ctx = canvas.getContext('2d');//establece el contexto, en este caso 2d
    ctx.fillStyle = 'blue';//estble color de relleno de las formas/lineas
    
    //limpiar el canvas
    ctx.clearRect(0,0 ,canvas.width, canvas.height);
    //posicion de partida ejeX 0, ejeY 0 limpia todo el ancho y alto del canvas

    if(intento <= intentos -1){
        ctx.fillRect(10,190 ,180,10);

    }

    if(intento <= intentos -2){
        ctx.fillStyle = 'green';
        ctx.fillRect(30,30 ,10,160);
    }

    if(intento <= intentos -3){
        ctx.fillStyle = 'brown';
        ctx.fillRect(30,30 ,120,10);
    }

    if(intento <= intentos -4){
        ctx.fillStyle = 'black';//color de la cuerda
        ctx.fillRect(147,40 ,3,30); //posicion cuerda
    }

    if(intento <= intentos -5){
        ctx.beginPath();//metodo para iniciar el circulo
        ctx.arc(147,86, 17, 0,2*Math.PI); //cabeza ahorcado
        //coordenada x del arco 147
        //coordenada y del arco 86
        //radio en px es 17
        //inicio del circulo en el grado 0
        //Fin del circulo 2*Math.pi
        ctx.stroke(); //dibuja el circulo
    }

    if(intento <= intentos -6){
        ctx.fillRect(145,103 ,3,50); //posicion cuerpo
    }

    if(intento <= intentos -7){
        ctx.beginPath();//metodo para iniciar linea inclinada
        ctx.moveTo(147,107); //inicio posicion brazoIzq
        ctx.lineTo(105,140); //fin posicion brazoIzq
        ctx.stroke(); //dibuja linea inclinada
    }

    if(intento <= intentos -8){
        ctx.beginPath();//metodo para iniciar linea inclinada
        ctx.moveTo(148,110); //inicio posicion brazoDer
        ctx.lineTo(190,140); //fin posicion brazoDer
        ctx.stroke(); //dibuja linea inclinada
    }

    if(intento <= intentos -9){
        ctx.beginPath();//metodo para iniciar linea inclinada
        ctx.moveTo(148,150); //inicio posicion piernaIzq
        ctx.lineTo(115,180); //fin posicion piernaIzq
        ctx.stroke(); //dibuja linea inclinada
    }

    if(intento <= intentos -9){
        ctx.beginPath();//metodo para iniciar linea inclinada
        ctx.moveTo(148,152); //inicio posicion piernaDer
        ctx.lineTo(180,180); //fin posicion piernaDer
        ctx.stroke(); //dibuja linea inclinada
    }
}

/**CLASES */
class Ahorcado{
    //propiedades
    palabra="";
    intentos="";
    constructor(palabra, intentos){
        this.palabra = palabra;
        this.intentos = intentos;
        this.letrasAdivinadas=[];//array con las letras que el usuario va adivinando
        this.letrasIncorrectas=[];//array con las letras incorrectas que el usuario va empleando
        this.estado="jugando";//se inicializa el esatdo a 'jugando'
    }

    /**METODOS DE LA CLASE */
       //Metodo que retorna la plabra actual con guiones y letras adivinadas
    obtenerPalabraMostrada(){
        let palabraMostrada = '';
        for(let letra of this.palabra){
            if(this.letrasAdivinadas.includes(letra)){
                palabraMostrada += letra + ' '; //muestra las palabras correctas
            }else{
                palabraMostrada += ' _ ';//Muestra guiones para letras no adivinadas
            }
        }
        return palabraMostrada.trim();//Muestra las palabras elimando los espacios
    };

    //Metodo para actualizar las palabras que se muestren
    actualizarPalbraMostrada(){
        document.getElementById('palabra').textContent = this.obtenerPalabraMostrada();
    }

    comprobarPalabrarIntroducida(){
        const letra = document.getElementById('letra').value.toLowerCase();//Obtener la palabra introducida en minuscula
        console.log('letra :>> ', letra);
        
        //Si la letra se incluye dentro de la palabra a adivinar, se mostrara por pantalla
        if(this.palabra.includes(letra)){
            this.letrasAdivinadas.push(letra);
            
            //Si la letra no esta incluida, se resta un intento y se muestra por pantalla
        } else {
            this.letrasIncorrectas.push(letra);
            this.intentos --;
            intentosRestantes.textContent = this.intentos;
            dibujarAhorcado(this.intentos);
        }
        document.getElementById('letrasPulsadas').textContent+= letra +" ";
        this.actualizarPalbraMostrada();
    }

    //Comprobar si se ha adivinado o no la palabra
    comprobarPuntuacion(){
        for(let word of this.letrasAdivinadas){
            if(this.palabra.includes(word)){
                let res = true;
                return res
            }else {
                res = false;
                return res;
            };
        }

        if(this.intentos > 0 && res){
            document.getElementById('enviarLetra').style='disabled';
            document.getElementById('mensaje').innerText = "¡Enhorabuena!, has acertado la palabra, crack";
        } else if (this.intentos === 0 && !res) {
            document.getElementById('enviarLetra').style='disabled';
            document.getElementById('mensaje').innerText = "Vaya pena!, has fallado la palabra";
        }
    }

}



/******************************************************************************************************* */
/**EVENTOS */
document.getElementById('enviarLetra').addEventListener('click', () =>{
    
    juego.comprobarPalabrarIntroducida();

    juego.comprobarPuntuacion();
    
});

//crear partida o instanciar clase
const juego = new Ahorcado('spidermans', intentos);
intentosRestantes.textContent = juego.intentos;
juego.actualizarPalbraMostrada();
