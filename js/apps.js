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
    console.log('Carga de pantalla');
    cargarSugerencias();
    aplicarTemaDay();
}

function cargarSugerencias() {
    fetch('http://api.giphy.com/v1/gifs/trending?api_key=' + apiKey + '&limit=4')
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

function mostrarOpciones(){
    const divOpciones = document.getElementsByClassName('opciones')[0];
    divOpciones.style.display = "block";
}

function buscarSugBusquedas(){
    const valor = document.getElementById('buscar').value;
    fetch('http://api.giphy.com/v1/tags/related/' + valor + '?api_key=' + apiKey + '&limit=3')
    .then(response => {
            return response.json();
    }).then(resultado =>{
        document.getElementById('busquedas_sug').style.display = "block";
        const divBotones = document.getElementById('busquedas_sug_botones');
        divBotones.innerHTML = "";
        resultado.data.forEach(({name}) => {
            const button = document.createElement('button');
            button.classList = "py-md-2 my-2 btn-block text-left flex-column boton_sug";
            button.innerText = name;
            button.setAttribute('onclick', `buscar('${name}')`);
            divBotones.appendChild(button);
        })
    });
}

function cambiarEstiloBotonBuscar(){
    const botonBuscar = document.getElementById('boton_buscar');
    const inputBuscar = document.getElementById('buscar');

    if(inputBuscar.value.trim()){
        botonBuscar.classList.remove('boton-inactivo');
        botonBuscar.classList.add('boton-activo');
        mostrarSugBusquedas(inputBuscar.value.trim());
    }else{
        botonBuscar.classList.remove('boton-activo');
        botonBuscar.classList.add('boton-inactivo');
        ocultarSugBusquedas();
    }
}

function botonBuscar(){
    const valor = document.getElementById('buscar').value;
    buscar(valor);
}

function buscar(valor){
    if(valor != ""){
        document.getElementById("titulo_resultado").innerText = valor;
        const divResultados = document.getElementById('resultados');
        divResultados.innerHTML = "";

        fetch('http://api.giphy.com/v1/gifs/search?q=' + valor + '&api_key=' + apiKey)
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
                                        divResultados.appendChild(res); 
                    const divImagen = document.getElementById(`divImagen_${resImagen.id}`);
                    divImagen.style.backgroundImage = `url(${resImagen.images.downsized_medium.url})`;
                });
            
                const sec_sug = document.getElementById('sec_sugerencias');
                if(sec_sug !=  null){
                    const padre = sec_sug.parentNode;
                    padre.removeChild(sec_sug);
                }
                document.getElementById('div_resultados').style.display = "block";
            }else{
                document.getElementById("titulo_resultado").style.display = "none";
                const divResultados = document.getElementById('resultados');
                divResultados.innerHTML = '<h2>No hay Resultados</h2>';
            }
            ocultarSugBusquedas();
            return resultado;
        })
        .catch(error => {
            console.log(error);
            return error;
        });
    }else{
        console.log("ingrese un valor");
    } 
}

function checkMostrarSugBusquedas(){
    const valor = document.getElementById('buscar').value;
    if(valor){
        mostrarSugBusquedas(valor);
    }
}

function mostrarSugBusquedas(valor){
    if(valor){
        buscarSugBusquedas(valor);
    }
}

function ocultarSugBusquedas(){
    document.getElementById('busquedas_sug').style.display = "none";
}

function resaltar(elemento, tipo){
    elemento.getElementsByClassName("header")[0].style.display = tipo;
    if(tipo == 'none'){
        elemento.getElementsByClassName("imagen")[0].classList.remove("marco");
    }else{
        elemento.getElementsByClassName("imagen")[0].classList.add("marco");
    }
    
}