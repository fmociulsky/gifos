function getStreamAndRecord () { 
    document.getElementById("video_gifos").style.display = "block";
    document.getElementById("alert_gifos").style.display = "none";
    document.getElementById("image_gif").style.display = "none";
    document.getElementById("video_gif").style.display = "block";
    document.getElementById("pre_subida").style.display = "none";
    document.getElementById("subida").style.display = "none";
    document.getElementById("precaptura").style.display = "block";
    document.getElementById("conf").style.display = "none";
    tituloGifos.innerText = "Un Chequeo Antes de Empezar";

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

async function grabar(){
    document.getElementById("precaptura").style.display = "none";
    document.getElementById("fin_grabar").style.display = "block";
    tituloGifos.innerText = "Capturando Tu Guifo";
    
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
    tituloGifos.innerText = "Vista Previa";
    document.getElementsByTagName
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
    tituloGifos.innerText = "Subiendo Guifo";
    document.getElementById("media").style.display = "none";
    document.getElementById("pre_subida").style.display = "none";
    document.getElementById("subida").style.display = "block";
    document.getElementById("subiendo").style.display = "block";
    let miForm = {
        method: 'POST',
        body: form,
        headers: new Headers(),
        mode: 'cors',
        cache: 'default'
    };
    const url = 'https://upload.giphy.com/v1/gifs';
    fetch(url + '?api_key=' + apiKey, miForm)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (respuesta) {
            guardarLocalStorage(respuesta.data.id);
            tituloGifos.innerText = "Guifo Subido Con Éxito";
            document.getElementById("subida").style.display = "none";
            document.getElementById("subiendo").style.display = "none";
            document.getElementById("confirmacion").style.display = "block";
            document.getElementById("conf").style.display = "block";
            document.getElementById("gif_subido").src = document.getElementById("image_gif").src;
            cargarMisGifos();
        });
}

function guardarLocalStorage(id){
    let myGifos = localStorage.getItem('myGifos');
    if(!myGifos){
        myGifos = id;
    }else{
        myGifos = myGifos + ", " + id;
    }
    
    localStorage.setItem('myGifos', myGifos);
}

function copiarGif() {
    const url = document.getElementById("image_gif").src;
    var aux = document.createElement("input");  
    aux.setAttribute("value", url);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy"); 
    document.body.removeChild(aux);    
}

function download() {
    const url = document.getElementById("image_gif").src;
    var a = document.createElement('a');
    a.setAttribute('download',true)
    a.target = '_blank';
    a.href = url;
    a.click();
}