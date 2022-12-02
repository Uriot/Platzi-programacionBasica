const seccionAtaques   = document.getElementById('seleccionar-ataque');
const seccionReiniciar = document.getElementById('reiniciar');
const buttonMasconta   = document.getElementById('button-mascota');

const seccionMascota       = document.getElementById('seleccionar-mascota');
const spanMascotaJugador   = document.getElementById('mascota-jugador');
const inputMascotaEnemigo  = document.getElementById('mascota-enemigo');
let   mascotaJugador       = '';

const mensaje        = document.getElementById('resultado');
const ataquesJugador = document.getElementById('ataques-jugador');
const ataquesEnemigo = document.getElementById('ataques-enemigo');

const imagenMokeponJugador = document.getElementById('img-mokepon-jugador');
const imagenMokeponEnemigo = document.getElementById('img-mokepon-enemigo');

const vidaJugador = document.getElementById('vidas-jugador');
const vidaEnemigo = document.getElementById('vidas-enemigo');

const mensajeFinal = document.getElementById('resultado');

const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const contenedorAtaques = document.getElementById('contenedor-ataques');

let mascontaEnemiga = '';
let mokepones = [];
let ataqueJugador = [];
let ataquesMokeponEnemigo;
let ataqueEnemigo = [];
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let opcionDeMokepones;
let botones;
let inputHipodoge
let inputRatigueya
let inputLangostelvis
let inputTucapalma
let inputPydos
let buttonFuego
let buttonAgua
let buttonPlanta
let buttons = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
const buttonReiniciar  = document.getElementById('button-reiniciar');

class Mokepon {
    constructor(nombre, img, vida) {
        this.nombre  = nombre;
        this.img     = img;
        this.vida    = vida;
        this.ataques = [];
    }
}

let hipodoge     = new Mokepon('Hipodoge', './assets/img/hipodoge.png', 3);
let capipepo     = new Mokepon('Capipepo', './assets/img/capipepo.png', 3);
let ratigueya    = new Mokepon('Ratigueya', './assets/img/ratigueya.png', 3);
let langostelvis = new Mokepon('Langostelvis', './assets/img/langostelvis.png', 3);
let tucapalma    = new Mokepon('Tucapalma', './assets/img/tucapalma.png', 3);
let pydos        = new Mokepon('Pydos', './assets/img/pydos.png', 3);

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos);

hipodoge.ataques.push(
    {nombre: 'Gota de agua 💧', id: 'button-agua'},
    {nombre: 'Chorro de agua 💧', id: 'button-agua'},
    {nombre: 'Lluvia 💧', id: 'button-agua'},
    {nombre: 'Absorver 🌿', id: 'button-planta'},
    {nombre: 'Quemadura 🔥', id: 'button-fuego'},
);

capipepo.ataques.push(
    {nombre: 'Absorver 🌿', id: 'button-planta'},
    {nombre: 'Corte hoja 🌿', id: 'button-planta'},
    {nombre: 'Derrumbe de hojas 🌿', id: 'button-planta'},
    {nombre: 'Gota de agua 💧', id: 'button-agua'},
    {nombre: 'Quemadura 🔥', id: 'button-fuego'},
);

ratigueya.ataques.push(
    {nombre: 'Quemadura 🔥', id: 'button-fuego'},
    {nombre: 'Lava 🔥', id: 'button-fuego'},
    {nombre: 'Explosion 🔥', id: 'button-fuego'},
    {nombre: 'Corte hoja 🌿', id: 'button-planta'},
    {nombre: 'Gota de agua 💧', id: 'button-agua'},
);

langostelvis.ataques.push(
    {nombre: 'Quemadura 🔥', id: 'button-fuego'},
    {nombre: 'Lava 🔥', id: 'button-fuego'},
    {nombre: 'Chorro de agua 💧', id: 'button-agua'},
    {nombre: 'Gota de agua 💧', id: 'button-agua'},
    {nombre: 'Corte hoja 🌿', id: 'button-planta'},
);

tucapalma.ataques.push(
    {nombre: 'Absorver 🌿', id: 'button-planta'},
    {nombre: 'Corte hoja 🌿', id: 'button-planta'},
    {nombre: 'Gota de agua 💧', id: 'button-agua'},
    {nombre: 'Chorro de agua 💧', id: 'button-agua'},
    {nombre: 'Quemadura 🔥', id: 'button-fuego'},
);

pydos.ataques.push(
    {nombre: 'Gota de agua💧', id: 'button-agua'},
    {nombre: 'Clima 💧', id: 'button-agua'},
    {nombre: 'Impresion 💧', id: 'button-agua'},
    {nombre: 'Chorro de agua 💧', id: 'button-agua'},
    {nombre: 'Hidrobomba 💧', id: 'button-agua'},
);

// mokepones[0].ataques.push(ataqueFuego);

//* selecciona elementos del DOM despues de cargar la pagina
function iniciarJuego () {
    seccionAtaques.style.display   = 'none';
    seccionReiniciar.style.display = 'none';

    mokepones.forEach((mokeponen) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokeponen.nombre}" />
        <label class="tarjeta-de-mokepon" for="${mokeponen.nombre}">
            <p>${mokeponen.nombre}</p>
            <img src="${mokeponen.img}" alt="${mokeponen.nombre}.png">
        </label>
        `;
        contenedorTarjetas.innerHTML += opcionDeMokepones;
        inputHipodoge        = document.getElementById('Hipodoge');
        inputCapipepo        = document.getElementById('Capipepo');
        inputRatigueya       = document.getElementById('Ratigueya');
        inputLangostelvis    = document.getElementById('Langostelvis');
        inputTucapalma       = document.getElementById('Tucapalma');
        inputPydos           = document.getElementById('Pydos');
    });

    buttonMasconta.addEventListener('click', seleccionarMascotaJugador);
    buttonReiniciar.addEventListener('click', () => {location.reload()});
}



//* selecciona mascota del jugador segun checkbox seleccionado
function seleccionarMascotaJugador () {
    seccionMascota.style.display = 'none';
    seccionAtaques.style.display = 'flex';

    let selected = document.querySelector('input[name="mascota"]:checked');
    if (selected === null) {
        location.reload();
        alert('no seleccionaste nada');
    }
    mascotaJugador = selected.id;

    extrarAtaques(mascotaJugador);

    spanMascotaJugador.innerHTML = mascotaJugador;
    buttonMasconta.disabled = true;
    ramdonMascota();
    inputMascotaEnemigo.innerHTML = mascontaEnemiga;

    insertarImagenMokepon( mascotaJugador);
}

function extrarAtaques (mascotaJugador) {
    let ataques = mokepones.find((mokepon) => mokepon.nombre === mascotaJugador).ataques;
    mostratAtaques(ataques);
}

function mostratAtaques (ataques) {
    ataques.forEach((ataque) => {
        opcionAtaque= `
        <button class="button-attaque BAtaque" id="${ataque.id}" >${ataque.nombre}</button>
        `;
        contenedorAtaques.innerHTML += opcionAtaque;
    });

    buttons = document.querySelectorAll('.BAtaque');
}

function secuenciaAtaque() {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if (e.target.textContent.includes('🔥')) {
                ataqueJugador.push('fuego');
                console.log(ataqueJugador);
                button.style.backgroundColor = '#112f58';
            } else if (e.target.textContent.includes('💧')) {
                ataqueJugador.push('agua');
                console.log(ataqueJugador);
                button.style.backgroundColor = '#112f58';
            } else {
                ataqueJugador.push('planta');
                console.log(ataqueJugador);
                button.style.backgroundColor = '#112f58';
            }
            ramdonAtack();
        })
    });
}

//* genera numero aleatorio
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//* forma mia para marcar el enemigo aleatorio
function ramdonMascota () {
    let mascotaRamdon = mokepones[aleatorio(0, mokepones.length -1)];
    mascontaEnemiga = mascotaRamdon.nombre;
    ataquesMokeponEnemigo = mascotaRamdon.ataques;
    secuenciaAtaque();
}

//* genera ataque aleatorio de pc
function ramdonAtack() {
    let ataqueRamdon = ataquesMokeponEnemigo[aleatorio(0, ataquesMokeponEnemigo.length -1)].nombre;
    if (ataqueRamdon.includes('🔥')) {
        ataqueEnemigo.push('fuego')
    } else if (ataqueRamdon.includes('💧')) {
        ataqueEnemigo.push('agua');
    } else {
        ataqueEnemigo.push('planta');
    }
    console.log(ataqueEnemigo);
    iniciarPelea();
    // return ataqueRamdon[ataqueRamdon.length -1];
}

function iniciarPelea () {
    if (ataqueJugador.length === 5) {
        resultAtack();
    }
}

function indexOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

//* resulatdo del ataque del jugador vrs el ataque del enemigo
function resultAtack() {

    for (let i = 0; i < ataqueJugador.length; i++) {
        debugger;
        if (ataqueJugador[i] === ataqueEnemigo[i]) {
            indexOponentes(i, i);
            mensajeResultado(' empataste este duelo 🤝');
        } else if (ataqueJugador[i] === 'fuego' && ataqueEnemigo[i] === 'planta') {
            indexOponentes(i, i);
            victoriasJugador++;
            vidaJugador.innerHTML = victoriasJugador;
            mensajeResultado(' ganaste este duelo 🏆');
        } else if (ataqueJugador[i] === 'agua' && ataqueEnemigo[i] === 'fuego') {
            indexOponentes(i, i);
            victoriasJugador++;
            vidaJugador.innerHTML = victoriasJugador;
            mensajeResultado(' ganaste este duelo 🏆');
        } else if (ataqueJugador[i] === 'planta' && ataqueEnemigo[i] === 'agua') {
            indexOponentes(i, i);
            victoriasJugador++;
            vidaJugador.innerHTML = victoriasJugador;
            mensajeResultado(' ganaste este duelo 🏆');
        } else {
            indexOponentes(i, i);
            victoriasEnemigo++;
            vidaEnemigo.innerHTML = victoriasEnemigo;
            mensajeResultado(' perdiste este duelo 🏆');
        }
    }
    revisarVictorias();
}

function revisarVictorias() {

}

//* mensaje de resultado del ataque
function mensajeResultado(resultado) {
    let nuevoAtaqueJugador = document.createElement('p');
    let nuevoAtaqueEnemigo = document.createElement('p');

    mensaje.innerHTML            = resultado;
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo;

    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo);
    ataquesJugador.appendChild(nuevoAtaqueJugador);
}

//* inserta imagen de mokepn
function insertarImagenMokepon(mokeponJugador) {
    imagenMokeponJugador.src = `./assets/img/${mokeponJugador.toLowerCase()}.png`;
    imagenMokeponEnemigo.src = `./assets/img/${mascontaEnemiga}.png`;
}

function revisarVictorias() {
    if (victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal('Esto fue un Empate');
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('Ganaste la batalla');
    } else {
        crearMensajeFinal('Perdiste la batalla');
    }
}


function crearMensajeFinal (resultado) {
    mensajeFinal.innerHTML = resultado;
    buttonAgua.disabled   = true;
    buttonFuego.disabled  = true;
    buttonPlanta.disabled = true;
    seccionReiniciar.style.display = 'block';
}

//* funcion que escucha elementos despues de cargar el html
window.addEventListener('load', iniciarJuego);
