agregarEventListeners();

function agregarEventListeners(){
    document.addEventListener('DOMContentLoaded', onLoad());
}

function onLoad(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const theme_type = urlParams.get('theme')
    if(theme_type && theme_type == 'night'){
        aplicarTemaNight();  
    }else{
        aplicarTemaDay();
    }
}

function aplicarTemaDay(){
    document.body.classList.remove('body_night');
    document.body.classList.add('body_day');

    document.getElementById("logo").src = "assets/gifOF_logo.png";
    ocultarOpciones();
}

function aplicarTemaNight(){
    document.body.classList.remove('body_day');
    document.body.classList.add('body_night');

    document.getElementById("logo").src = "assets/gifOF_logo_dark.png";
    ocultarOpciones();
}

function ocultarOpciones(){
    const divOpciones = document.getElementsByClassName('opciones')[0];
    divOpciones.style.display = "none";
}
