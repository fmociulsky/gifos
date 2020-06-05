const btnDay = document.getElementById('btn-day');
const btnNight = document.getElementById('btn-night');
const apiKey = 'ueK2jQMCymNZn085I319vMXEtEjvNFGH';

agregarEventListeners();

function agregarEventListeners(){
    document.addEventListener('DOMContentLoaded', onLoad());
    document.addEventListener("click", (evt) => {
        const flyoutElement = document.getElementById("div_buscador");
        let targetElement = evt.target; // clicked element
        
        do {
            if (targetElement == flyoutElement) {
                mostrarSugBusquedas();
                return;
            }
            targetElement = targetElement.parentNode;
        } while (targetElement);
        ocultarSugBusquedas();
        return;
    });
    
}

function onLoad(){
    const theme_type = localStorage.getItem('theme');
    if(theme_type && theme_type == 'night'){
        aplicarTemaNight();  
    }else{
        aplicarTemaDay();
    }
    document.getElementById("div_resultados").style.display = "none";
    cargarSugerencias();
    cargarTendencias();
}

function cargarSugerencias() {
    fetch('http://api.giphy.com/v1/gifs/search?q=futbol&api_key=' + apiKey + '&limit=4')
        .then(response => {
            return response.json();
        })
        .then(resultado => {
            const divSugerencias = document.getElementById('sugerencias');
            resultado.data.forEach(resImagen=>{
                let sugerencia = document.createElement('div');
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
                
                divImagen.style.backgroundImage = `url(${resImagen.images.downsized_medium.url})`
            });
        })
        .catch(error => {
            return error;
        });
    return true;
}

function cargarTendencias(){
    const divTendencias = document.getElementById('tendencias');
    divTendencias.innerHTML = "";

    fetch('http://api.giphy.com/v1/gifs/trending?api_key=' + apiKey)
    .then(response => {
            return response.json();
        })
    .then(resultado => {
        if(resultado.data.length > 0){
            let titulo = document.createElement('div');
            titulo.innerHTML =    
            resultado.data.forEach(resImagen=>{
                let res = document.createElement('div');
                res.innerHTML = `<div class="p-0 mb-md-3 card-result" onmouseover="resaltar(this, 'block')" onmouseout="resaltar(this, 'none')"> 
                                        <div class="d-flex p-0 imagen" id="divImagen_${resImagen.id}">
                                            <div class="p-1 flex-grow-1 p-0 mt-auto header">
                                                <div class="d-flex justify-content-between">
                                                    <a href="#">#${resImagen.title.replace(/ /g, "").replace("GIF", "")}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
                                    divTendencias.appendChild(res); 
                const divImagen = document.getElementById(`divImagen_${resImagen.id}`);
                divImagen.style.backgroundImage = `url(${resImagen.images.downsized_medium.url})`;
            });
        }
        return resultado;
    })
    .catch(error => {
        return error;
    });
}