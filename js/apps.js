const btnDay = document.getElementById('btn-day');
const btnNight = document.getElementById('btn-night');
const apiKey = 'ueK2jQMCymNZn085I319vMXEtEjvNFGH';


agregarEventListeners();

function agregarEventListeners(){
    document.addEventListener('DOMContentLoaded', onLoad());
    //btnDay.addEventListener('click', aplicarTemaDay);
    //btnNight.addEventListener('click', aplicarTemaNight);
}

function onLoad(){
    console.log('Carga de pantalla');
    cargarSugerencias();
}

function cargarSugerencias() {
    const search = 'dog';
    fetch('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + apiKey)
        .then(response => {
            return response.json();
        })
        .then(resultado => {
            const divSugerencias = document.getElementById('sugerencias');
            for (let index = 0; index < 4; index++) {
                const sugerencia = document.createElement('div');
                const resImagen = resultado.data[index];
                sugerencia.innerHTML = `<div class=" p-1 card-small"> 
                                        <div class="header p-1">
                                            <div class="d-flex justify-content-between">
                                                <a href="#">#${resImagen.title}</a>
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
    console.log('day');
}

function aplicarTemaNight(){
    console.log('night');
}

function mostrarOpciones(){
    const body = document.body;
    body.classList.remove('body_day');
    body.classList.add('body_night');
    /*const divOpciones = document.getElementsByClassName('opciones')[0];
    divOpciones.style.display = "block";*/
}