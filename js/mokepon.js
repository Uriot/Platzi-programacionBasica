const seccionAtaques   = document.getElementById('seleccionar-ataque');
const seccionReiniciar = document.getElementById('reiniciar');
const buttonMasconta   = document.getElementById('button-mascota');
const buttonFuego      = document.getElementById('button-fuego');
const buttonAgua       = document.getElementById('button-agua');
const buttonPlanta     = document.getElementById('button-planta');
const buttonReiniciar  = document.getElementById('button-reiniciar');

const seccionMascota       = document.getElementById('seleccionar-mascota');
const inputHipodoge        = document.getElementById('hipodoge');
const inputCapipepo        = document.getElementById('capipepo');
const inputRatigueya       = document.getElementById('ratigueya');
const inputLangostelvis    = document.getElementById('langostelvis');
const inputTucapalma       = document.getElementById('tucapalma');
const inputPydos           = document.getElementById('pydos');
const spanMascotaJugador   = document.getElementById('mascota-jugador');
const inputMascotaEnemigo  = document.getElementById('mascota-enemigo');
let mascotaJugador       = '';

const mensaje        = document.getElementById('resultado');
const ataquesJugador = document.getElementById('ataques-jugador');
const ataquesEnemigo = document.getElementById('ataques-enemigo');

const imagenMokeponJugador = document.getElementById('img-mokepon-jugador');
const imagenMokeponEnemigo = document.getElementById('img-mokepon-enemigo');

const vidaJugador = document.getElementById('vidas-jugador');
const vidaEnemigo = document.getElementById('vidas-enemigo');

const mensajeFinal = document.getElementById('resultado');

let mascontaEnemiga = '';

let ataqueJugador = '';
let ataqueEnemigo = '';
let vidasJugador = 3;
let vidasEnemigo = 3;


//* selecciona elementos del DOM despues de cargar la pagina
function iniciarJuego () {
    seccionAtaques.style.display   = 'none';
    seccionReiniciar.style.display = 'none';
    buttonMasconta.addEventListener('click', seleccionarMascotaJugador);
    buttonFuego.addEventListener('click', ataqueFuego);
    buttonAgua.addEventListener('click', ataqueAgua);
    buttonPlanta.addEventListener('click', ataquePlanta);
    buttonReiniciar.addEventListener('click', () => {location.reload()});
}

//* forma mia para marcar el enemigo aleatorio
function ramdonMascota () {
    let mascotas = ['hipodoge', 'capipepo', 'ratigueya', 'langostelvis', 'tucapalma', 'pydos'];
    let mascotaRamdon = mascotas[aleatorio(0, mascotas.length)];
    mascontaEnemiga = mascotaRamdon.toLowerCase();
}

//* selecciona mascota del jugador segun checkbox seleccionado
function seleccionarMascotaJugador () {
    seccionMascota.style.display = 'none';
    seccionAtaques.style.display = 'flex';
    //* forma clase
    if (inputHipodoge.checked) {
        mascotaJugador = 'Hipodoge';
    } else if (inputCapipepo.checked) {
        mascotaJugador = 'Capipepo';
    } else if (inputRatigueya.checked) {
        mascotaJugador = 'Ratigueya';
    } else if (inputLangostelvis.checked) {
        mascotaJugador = 'Langostelvis';
    } else if (inputTucapalma.checked) {
        mascotaJugador = 'Tucapalma';
    } else if (inputPydos.checked) {
        mascotaJugador = 'Pydos';
    } else {
        location.reload();
        alert('no seleccionaste nada');
    }
    spanMascotaJugador.innerHTML = mascotaJugador;
    buttonMasconta.disabled = true;
    ramdonMascota();
    inputMascotaEnemigo.innerHTML = mascontaEnemiga;

    insertarImagenMokepon(mascotaJugador);

    //!forma copilot
    // let selected = document.querySelector('input[name="mascota"]:checked');
    // alert(selected.id);

    //! forma mia
    // let selected = {
    //     'hipodoge'     : document.getElementById('hipodoge').checked,
    //     'capipepo'     : document.getElementById('capipepo').checked,
    //     'ratigueya'    : document.getElementById('ratigueya').checked,
    //     'langostelvis' : document.getElementById('langostelvis').checked,
    //     'tucapalma'    : document.getElementById('tucapalma').checked,
    //     'pydos'        : document.getElementById('pydos').checked,
    //     'hipodoge'     : document.getElementById('hipodoge').checked,
    // }
    // let mascota = Object.keys(selected).find(key => selected[key] === true);
    // alert('Seleccionaste a ' + mascota);
}

//* genera numero aleatorio
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//* genera ataque aleatorio de pc
function ramdonAtack() {
    let ataque = ['fuego', 'agua', 'planta'];
    let ataqueRamdon = ataque[aleatorio(0, ataque.length)];
    return ataqueRamdon;
}

//* resulatdo del ataque del jugador vrs el ataque del enemigo
function resultAtack() {
    if (ataqueJugador === 'fuego' && ataqueEnemigo === 'planta') {
        resultado = ' ganaste este duelo 🎉';
    } else if (ataqueJugador === 'agua' && ataqueEnemigo === 'fuego') {
        resultado = ' ganaste este duelo 🎉';
    } else if (ataqueJugador === 'planta' && ataqueEnemigo === 'agua') {
        resultado = ' ganaste este duelo 🎉';
    } else if (ataqueJugador === ataqueEnemigo) {
        resultado = ' empataste este duelo 🤝';
    } else {
        resultado = ' perdiste este duelo ☠';
    }
    mensajeResultado(resultado);
    calculoVidas(resultado);
}

//* mensaje de resultado del ataque
function mensajeResultado(resultado) {
    let nuevoAtaqueJugador = document.createElement('p');
    let nuevoAtaqueEnemigo = document.createElement('p');

    mensaje.innerHTML            = resultado;
    nuevoAtaqueJugador.innerHTML = ataqueJugador;
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo;

    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo);
    ataquesJugador.appendChild(nuevoAtaqueJugador);
}

//* inserta imagen de mokepn
function insertarImagenMokepon(mokeponJugador) {
    imagenMokeponJugador.src = `./assets/img/${mokeponJugador.toLowerCase()}.png`;
    imagenMokeponEnemigo.src = `./assets/img/${mascontaEnemiga}.png`;
}

//* calcula las vidas del jugador y del enemigo y resultado del juego
function calculoVidas (resultado) {
    if (resultado === ' ganaste este duelo 🎉') {
        vidasEnemigo--;
        vidaJugador.innerHTML = vidasEnemigo;
    } else if (resultado === ' perdiste este duelo ☠') {
        vidasJugador--;
        vidaEnemigo.innerHTML = vidasJugador;
    }

    //* si las vidas llegan a 0 se termina el juego
    if (vidasEnemigo === 0) {
        crearMensajeFinal('Felicitaciones ganaste el juego 🎉');
    } else if (vidasJugador === 0) {
        crearMensajeFinal('Lo sentimos perdiste el juego 😭');
    }
}

function crearMensajeFinal (resultado) {
    mensajeFinal.innerHTML = resultado;
    buttonAgua.disabled   = true;
    buttonFuego.disabled  = true;
    buttonPlanta.disabled = true;
    seccionReiniciar.style.display = 'block';
}

function ataqueFuego () {
    ataqueJugador = 'fuego';
    ataqueEnemigo = ramdonAtack();
    resultAtack();
}

function ataqueAgua () {
    ataqueJugador = 'agua';
    ataqueEnemigo = ramdonAtack();
    resultAtack();
}

function ataquePlanta () {
    ataqueJugador = 'planta';
    ataqueEnemigo = ramdonAtack();
    resultAtack();
}

//* funcion que escucha elementos despues de cargar el html
window.addEventListener('load', iniciarJuego);
