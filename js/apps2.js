agregarEventListeners();

let recorder = null;
let form = new FormData();
let apiKey = 'ueK2jQMCymNZn085I319vMXEtEjvNFGH';

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
    displayBotonesBanner();
    displayCrearGifs();
    cargarMisGifos();
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

function getStreamAndRecord () { 
    document.getElementById("video_gifos").style.display = "block";
    document.getElementById("alert_gifos").style.display = "none";
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    })
    .then(function(stream) {
        var video = document.getElementById("video_gif");
        video.srcObject = stream;
        video.play();
    });
}

function grabar(){
    document.getElementById("precaptura").style.display = "none";
    document.getElementById("fin_grabar").style.display = "block";
    let horaCero = new Date();
    horaCero.setHours(0);
    horaCero.setMinutes(0);
    horaCero.setSeconds(0);
    console.log(horaCero.getHours() + ":" + horaCero.getMinutes() + ":"+ horaCero.getSeconds());
    //mueveReloj(horaCero);
    grabarGif();
}

async function grabarGif(){
    let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});

    recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function() {
            console.log('started')
        },
    });
    recorder.startRecording();
    console.log("inicio a grabar");
}

async function finalizarGif(){
    await recorder.stopRecording();
    console.log("dejo de grabar");
    let blob = await recorder.getBlob();
    form.append('file', blob, 'myGif.gif');
    
    console.log(blob);
    

    let image = document.getElementById("image_gif");
    image.src = URL.createObjectURL(blob);
    document.getElementById("fin_grabar").style.display = "none";
    document.getElementById("pre_subida").style.display = "block";
    document.getElementById("video_gif").style.display = "none";
    document.getElementById("image_gif").style.display = "block";
    
}

function subir() {
    console.log("subir");
    let miForm = {
        method: 'POST',
        body: form,
        headers: new Headers(),
        mode: 'cors',
        cache: 'default'
    };
    const url = 'http://upload.giphy.com/v1/gifs';
    fetch(url + '?api_key=' + apiKey, miForm)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (respuesta) {
            guardarLocalStorage(respuesta.data.id);
        });
}

function guardarLocalStorage(id){
    console.log(id);
    let myGifos = localStorage.getItem('myGifos');
    if(!myGifos){
        myGifos = id;
    }else{
        myGifos = myGifos + ", " + id;
    }
    
    localStorage.setItem('myGifos', myGifos);
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
            const divSugerencias = document.getElementById('mis_gifos');
            resultado.data.forEach(resImagen=>{
                let sugerencia = document.createElement('div');
                sugerencia.innerHTML = `<div class=" p-1 card-small"> 
                                        <div class="d-flex pb-sm-2 pl-sm-1">
                                            <img src="${resImagen.images.downsized_medium.url}" class="imagen">
                                        </div>
                                    </div>`;
                
                divSugerencias.appendChild(sugerencia);
            });
        })
        .catch(error => {
            return error;
        });
    }
    
    return true;
}
