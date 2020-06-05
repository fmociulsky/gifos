agregarEventListeners();
const tituloGifos = document.getElementById("titulo_gifos");

let recorder = null;
let form = new FormData();
let apiKey = 'ueK2jQMCymNZn085I319vMXEtEjvNFGH';

function agregarEventListeners(){
    document.addEventListener('DOMContentLoaded', onLoad());
}

function onLoad(){
    const theme_type = localStorage.getItem('theme');
    if(theme_type && theme_type == 'night'){
        aplicarTemaNight();  
    }else{
        aplicarTemaDay();
    }
    displayBotonesBanner();
    displayCrearGifs();
    cargarMisGifos();
}

function displayBotonesBanner(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const action = urlParams.get('action');
    if(action == "create"){
        document.getElementById("botones-banner").style.display = "none";
    }
}

function displayCrearGifs(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const action = urlParams.get('action');
    if(action == "create"){
        document.getElementById("crear_gifos").style.display = "block";
        document.getElementById("video_gifos").style.display = "none";
    }else{
        document.getElementById("crear_gifos").style.display = "none";
    }
}

function cargarMisGifos() {
    let apiKey = 'ueK2jQMCymNZn085I319vMXEtEjvNFGH';
    let ids = localStorage.getItem('myGifos');
    if(ids){
        fetch('http://api.giphy.com/v1/gifs?api_key=' + apiKey + '&ids=' + ids)
        .then(response => {
            return response.json();
        })
        .then(resultado => {
            const mis_gifos = document.getElementById('mis_gifos');
            resultado.data.forEach(resImagen=>{
                let div = document.createElement('div');
                div.innerHTML = `<div class=" p-1"> 
                                        <div class="d-flex pb-sm-2 pl-sm-1">
                                            <img src="${resImagen.images.downsized_medium.url}" class="imagen">
                                        </div>
                                    </div>`;
                
                mis_gifos.appendChild(div);
            });
        })
        .catch(error => {
            return error;
        });
    }
    
    return true;
}
