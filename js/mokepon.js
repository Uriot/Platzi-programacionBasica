
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
    let mascotaJugador = '';

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
    randomMascota = ramdonMascota();
    inputMascotaEnemigo.innerHTML = randomMascota;

    insertarImagenMokepon(mascotaJugador, ramdonMascota);

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
    let mensaje        =  document.getElementById('resultado');
    let ataquesJugador = document.getElementById('ataques-jugador');
    let ataquesEnemigo = document.getElementById('ataques-enemigo');

    let nuevoAtaqueJugador = document.createElement('p');
    let nuevoAtaqueEnemigo = document.createElement('p');

    mensaje.innerHTML            = resultado;
    nuevoAtaqueJugador.innerHTML = ataqueJugador;
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo;

    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo);
    ataquesJugador.appendChild(nuevoAtaqueJugador);
}

//* inserta imagen de mokepn
function insertarImagenMokepon(mokeponJugador, mokeponEnemigo) {
    let imagenMokeponJugador = document.getElementById('img-mokepon-jugador');
    let test = document.getElementById('img-mokepon-enemigo');
    console.log(test);
    imagenMokeponJugador.src = `./assets/img/${mokeponJugador.toLowerCase()}.png`;
}


//* calcula las vidas del jugador y del enemigo y resultado del juego
function calculoVidas (resultado) {
    if (resultado === ' ganaste este duelo 🎉') {
        vidasEnemigo--;
        document.getElementById('vidas-enemigo').innerHTML = vidasEnemigo;
    } else if (resultado === ' perdiste este duelo ☠') {
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

    document.getElementById('resultado').innerHTML = resultado;

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
