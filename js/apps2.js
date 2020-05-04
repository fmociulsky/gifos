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
    displayBotonesBanner();
    displayCrearGifs();
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
    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(3000);

    await recorder.stopRecording();
    console.log("dejo de grabar");
    let blob = await recorder.getBlob();
    //invokeSaveAsDialog(blob);
}
