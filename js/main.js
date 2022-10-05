const canvas = document.getElementById("canvas");
canvas.width = 300;
canvas.height = 600;
const ctx = canvas.getContext("2d");
const body = document.querySelector("body");
const words = ["CPP", "JAVASCRIPT", "JAVA", "PYTHON", "SQL", "FRONTEND", "BACKEND", "CODIGO", 
                "LINUX", "DEBIAN", "C", "RUST", "MYSQL", "NODEJS", "REACT", "SPRING", "DJANGO", "PANDAS",
                "POSTGRES", "DATABASE", "IDE", "HTML", "CSS"];

// Aqui agregamos la nueva palabra en casa que el usuario ingrese una nueva palabra.
function agregarPalabra(palabras) {

    if (sessionStorage.getItem("nuevaPalabra")) {

        palabras.push(sessionStorage.getItem("nuevaPalabra"));

    }
    

}

agregarPalabra(words);

const palabras = document.getElementsByTagName("small");
const palabrasErroneas = document.getElementById("palabras-erronea");

function drawLine(startX, startY, endX, endY, color="#0A3871", lineWidth=10) {

    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = color;  
    ctx.lineWidth = lineWidth;  
    ctx.stroke();

}
// Aqui dibujamos la base al principio del juego
drawLine(0, 600, 300, 600);

function drawCircle(xAxis, yAxis, r) {

    ctx.beginPath();
    ctx.arc(xAxis, yAxis, r, 0, 2 * Math.PI);
    ctx.stroke();

}

function randomWords(words) {

    const randomWord = words[Math.floor(Math.random() * words.length)];
    console.log(randomWord);
    return randomWord;

}

const randomWord = randomWords(words);
const lengOfWord = randomWord.length;

function renderBorders() {

    

    for (let i = 0; i < palabras.length; i++) {

         if (i < lengOfWord) {

            palabras[i].style.display = "inline-block";

         } else {

            palabras[i].style.display = "none";

         }

    } 

}

// Aqui agregamos los border bottom dependiendo de la palabra.
renderBorders();

function hasAlreadyInput(array, input) {

    return array.includes(input);

}

const estadoJuego = document.getElementById("estado-juego");

function haGanado(estado) {

    if (estado) {

        estadoJuego.textContent = "Ganaste, Felicidades!";
        estadoJuego.classList.add("juego-ganado");

    } else {

        estadoJuego.textContent = "Fin del juego!";
        estadoJuego.classList.add("juego-perdido");
        body.removeEventListener("click", hayarPalabra);
    }

}

// Aqui agregamos las teclas que el usuario ha ingresado
const listOfKeyInput = [];
// Esta funcion renderiza las letras, tambien mandas un confirmacion true o false en caso 
// Que la letra no sea parte de la palabra.
let numberOfTries = 0; // Usamos esta variable para los casos si la letra es erronea.
let numberOfFound = 0;
function mostrarLetras(listaLetrasIngresadas, keycode) {

    let foundLetter = false;

    if (!hasAlreadyInput(listaLetrasIngresadas, keycode)) {
        // Aqui detenemos el juego si el usuario ha sobre pasado el numero de errores.
        if (numberOfTries >= 9 || numberOfFound == randomWord.length) {

            return;

        }

        const inputLetter = String.fromCharCode(keycode).toUpperCase();

        for (let index = 0; index < randomWord.length; index++) {

            let letter = randomWord[index];                

            if (inputLetter == letter) {

                for (let i = 0; i < palabras.length; i++) {

                    if (i == index) {

                        palabras[i].textContent = inputLetter;
                        numberOfFound++;
                        if (numberOfFound == randomWord.length) {

                            haGanado(true);

                        }

                    } 
                } 

                foundLetter = true;

            } 

        }

    } 

    return foundLetter;

}


function mostrarLetrasErroneas(perteneceLaPlabras, hasidoIngresada, keycode) {

     // Aqui detenemos el juego si el usuario ha sobre pasado el numero de errores.
     if (numberOfTries >= 9 || numberOfFound == randomWord.length) {

        return;

    }

    if (!perteneceLaPlabras && !hasidoIngresada) {        

        if (keycode - 32 > 64 && keycode - 32 < 91) {

            palabrasErroneas.textContent += String.fromCharCode(keycode - 32);          

            numberOfTries++;
            switch(numberOfTries) {

                case 1:
                    drawLine(50, 0, 50, 600);                   
                    break;
                case 2:                    
                    drawLine(50, 0, 200, 0);
                    break;
                case 3:
                    drawLine(200, 0, 200, 100);
                    break;
                case 4:
                    drawCircle(200, 138, 40);
                    break;
                case 5:
                    drawLine(200, 178, 200, 325);
                    break;
                case 6:
                    drawLine(200, 325, 150, 395);
                    break;
                case 7:
                    drawLine(200, 325, 250, 395);
                    break;
                case 8:
                    drawLine(200, 248, 150, 318);
                    break;
                case 9:
                    drawLine(200, 248, 250, 318);
                    haGanado(false);
                    break;                  

            }            

        }       

        
    } 

}



function hayarPalabra(event) {

    const keycode = event.key.charCodeAt();
    let foundLetter = mostrarLetras(listOfKeyInput, keycode);
   
    
    mostrarLetrasErroneas(foundLetter, hasAlreadyInput(listOfKeyInput, keycode), keycode);
    

    listOfKeyInput.push(keycode);

}


body.addEventListener("keydown", hayarPalabra);


