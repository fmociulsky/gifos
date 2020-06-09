function aplicarTemaDay(){
    localStorage.setItem('theme',"day");
    document.body.classList.remove('body_night');
    document.body.classList.add('body_day');

    document.getElementById("logo").src = "./assets/gifOF_logo.png";
    ocultarOpciones();
}

function aplicarTemaNight(){
    localStorage.setItem('theme',"night");
    document.body.classList.remove('body_day');
    document.body.classList.add('body_night');

    document.getElementById("logo").src = "./assets/gifOF_logo_dark.png";
    ocultarOpciones();
}

function ocultarOpciones(){
    const divOpciones = document.getElementsByClassName('opciones')[0];
    divOpciones.style.display = "none";
}

function mostrarOpciones(){
    const divOpciones = document.getElementsByClassName('opciones')[0];
    divOpciones.style.display = "block";
}