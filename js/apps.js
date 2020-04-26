const btnDay = document.getElementById('btn-day');
const btnNight = document.getElementById('btn-night');
const apiKey = 'ueK2jQMCymNZn085I319vMXEtEjvNFGH';


agregarEventListeners();

function agregarEventListeners(){
    document.addEventListener('DOMContentLoaded', onLoad());
}

function onLoad(){
    console.log('Carga de pantalla');
    cargarSugerencias();
    aplicarTemaDay();
}

function cargarSugerencias() {
    const search = 'dog';
    fetch('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + apiKey)
        .then(response => {
            return response.json();
        })
        .then(resultado => {
            console.log(resultado);
            const divSugerencias = document.getElementById('sugerencias');
            for (let index = 0; index < 4; index++) {
                const sugerencia = document.createElement('div');
                const resImagen = resultado.data[index];
                sugerencia.innerHTML = `<div class=" p-1 card-small"> 
                                        <div class="header p-1">
                                            <div class="d-flex justify-content-between">
                                                <a href="#">#${resImagen.title.replace(/ /g, "").replace("GIF", "")}</a>
                                                <img class="close align-self-center" src="/assets/button3.svg">
                                            </div>
                                        </div>
                                        <div class="d-flex pb-sm-2 pl-sm-1 imagen" id="divImagen_${resImagen.id}">
                                            <button class="align-self-end p-2">Ver mas...</button>
                                        </div>
                                    </div>`;
                
                divSugerencias.appendChild(sugerencia); 
                const divImagen = document.getElementById(`divImagen_${resImagen.id}`);
                divImagen.style.backgroundImage = `url(${resultado.data[index].images.downsized_large.url})`
            }
            return resultado;
        })
        .catch(error => {
            return error;
        });
    return true;
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
}

function ocultarOpciones(){
    const divOpciones = document.getElementsByClassName('opciones')[0];
    divOpciones.style.display = "none";
}

function mostrarOpciones(){
    const divOpciones = document.getElementsByClassName('opciones')[0];
    divOpciones.style.display = "block";
}

function cambiarEstiloBotonBuscar(){
    const botonBuscar = document.getElementById('boton_buscar');
    const inputBuscar = document.getElementById('buscar');

    if(inputBuscar.value !== ''){
        botonBuscar.classList.remove('boton-inactivo');
        botonBuscar.classList.add('boton-activo');
    }else{
        botonBuscar.classList.remove('boton-activo');
        botonBuscar.classList.add('boton-inactivo');
    }
}