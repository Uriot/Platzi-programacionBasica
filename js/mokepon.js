
let ataqueJugador = '';
let ataqueEnemigo = '';
let vidasJugador = 3;
let vidasEnemigo = 3;


//* selecciona elementos del DOM despues de cargar la pagina
function iniciarJuego () {
    let seccionAtaques = document.getElementById('seleccionar-ataque');
    seccionAtaques.style.display = 'none';
    let seccionReiniciar = document.getElementById('reiniciar');
    seccionReiniciar.style.display = 'none';

    let buttonMasconta = document.getElementById('button-mascota');
    buttonMasconta.addEventListener('click', seleccionarMascotaJugador);

    let buttonFuego  = document.getElementById('button-fuego');
    buttonFuego.addEventListener('click', ataqueFuego);
    let buttonAgua   = document.getElementById('button-agua');
    buttonAgua.addEventListener('click', ataqueAgua);
    let buttonPlanta = document.getElementById('button-planta');
    buttonPlanta.addEventListener('click', ataquePlanta);
    let buttonReiniciar = document.getElementById('button-reiniciar');
    buttonReiniciar.addEventListener('click', () => {location.reload()});
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

//* forma mia para marcar el enemigo aleatorio
function ramdonMascota () {
    let mascotas = ['Hipodoge', 'Capipepo', 'Ratigueya', 'Langostelvis', 'Tucapalma', 'Pydos'];
    let mascotaRamdon = mascotas[aleatorio(0, mascotas.length)];
    return mascotaRamdon;
}

//* selecciona mascota del jugador segun checkbox seleccionado
function seleccionarMascotaJugador () {
    let seccionMascota = document.getElementById('seleccionar-mascota');
    seccionMascota.style.display = 'none';

    let seccionAtaques = document.getElementById('seleccionar-ataque');
    seccionAtaques.style.display = 'flex';

    let inputHipodoge     = document.getElementById('hipodoge');
    let inputCapipepo     = document.getElementById('capipepo');
    let inputRatigueya    = document.getElementById('ratigueya');
    let inputLangostelvis = document.getElementById('langostelvis');
    let inputTucapalma    = document.getElementById('tucapalma');
    let inputPydos        = document.getElementById('pydos');
    let buttonMasconta    = document.getElementById('button-mascota');

    let spanMascotaJugador   = document.getElementById('mascota-jugador');
    let inputMascotaEnemigo  = document.getElementById('mascota-enemigo');

    //* forma clase
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = 'Hipodoge';
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = 'Capipepo';
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = 'Ratigueya';
    } else if (inputLangostelvis.checked) {
        spanMascotaJugador.innerHTML = 'Langostelvis';
    } else if (inputTucapalma.checked) {
        spanMascotaJugador.innerHTML = 'Tucapalma';
    } else if (inputPydos.checked) {
        spanMascotaJugador.innerHTML = 'Pydos';
    } else {
        alert('no seleccionaste nada');
    }
    buttonMasconta.disabled = true;
    inputMascotaEnemigo.innerHTML = ramdonMascota();

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

//* resulatdo del ataque del jugador vrs el ataque del enemigo
function resultAtack() {
    if (ataqueJugador === 'fuego' && ataqueEnemigo === 'planta') {
        resultado = ' ganaste 🎉';
    } else if (ataqueJugador === 'agua' && ataqueEnemigo === 'fuego') {
        resultado = ' ganaste 🎉';
    } else if (ataqueJugador === 'planta' && ataqueEnemigo === 'agua') {
        resultado = ' ganaste 🎉';
    } else if (ataqueJugador === ataqueEnemigo) {
        resultado = ' es un empate 🤝';
    } else {
        resultado = ' perdiste 😭';
    }
    mensajeResultado(resultado);
    calculoVidas(resultado);
}

//* mensaje de resultado del ataque
function mensajeResultado(resultado) {
    let text = document.createElement('p');
    text.innerHTML = `Tu mokepon uso el ataque '${ataqueJugador}'  y el mokepon enemigo uso el ataque '${ataqueEnemigo}' por lo tanto ${resultado}`;
    document.getElementById('mensajes').appendChild(text);
}

//* calcula las vidas del jugador y del enemigo y resultado del juego
function calculoVidas (resultado) {
    if (resultado === ' ganaste 🎉') {
        vidasEnemigo--;
        document.getElementById('vidas-enemigo').innerHTML = vidasEnemigo;
    } else if (resultado === ' perdiste 😭') {
        vidasJugador--;
        document.getElementById('vidas-jugador').innerHTML = vidasJugador;
    }

    //* si las vidas llegan a 0 se termina el juego
    if (vidasEnemigo === 0) {
        crearMensajeFinal('Felicitaciones ganaste el juego 🎉');
    } else if (vidasJugador === 0) {
        crearMensajeFinal('Lo sentimos perdiste el juego 😭');
    }
}

function crearMensajeFinal (resultado) {
    let buttonAgua   = document.getElementById('button-agua');
    let buttonFuego  = document.getElementById('button-fuego');
    let buttonPlanta = document.getElementById('button-planta');
    let seccionReiniciar = document.getElementById('reiniciar');

    let text = document.createElement('p');
    text.innerHTML = resultado;
    document.getElementById('mensajes').appendChild(text);

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
