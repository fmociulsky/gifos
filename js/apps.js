const btnDay = document.getElementById('btn-day');
const btnNight = document.getElementById('btn-night');


agregarEventListeners();

function agregarEventListeners(){
    //btnDay.addEventListener('click', aplicarTemaDay);
    //btnNight.addEventListener('click', aplicarTemaNight);
}


function aplicarTemaDay(){
    console.log('day');
}

function aplicarTemaNight(){
    console.log('night');
}

function mostrarOpciones(){
    const body = document.body;
    body.classList.remove('body_light');
    body.classList.add('body_night');
    /*const divOpciones = document.getElementsByClassName('opciones')[0];
    divOpciones.style.display = "block";*/
}