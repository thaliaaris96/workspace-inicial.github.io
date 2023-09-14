// Obtener URLs de los productos y comentarios basados en el ID de producto almacenado en el local storage
let URLProducto = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem('prodID')}.json`;
let URLComentario = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem('prodID')}.json`;
// Referencias a elementos del DOM
let contenedor = document.getElementById("contenedorProductInfo");
let contenidoProducto = "";
let InputComentario = document.getElementById("comentarioUsu");
let btnSendComentario = document.getElementById("btnComentario");

// Función para obtener y mostrar información del producto desde la URL
function FetchURLProducto(){
    return ( fetch(URLProducto) 
        .then ( function(response) {
            return response.json();
        })
        .then(function(data){
            let InnerImg = ``;
            for (let j = 0; j < data.images.length; j++){
                InnerImg += `
                    <div class="imagenesProducto">
                        <img src="${data.images[j]}" alt=""/> 
                    </div>
                `;
            }
            contenidoProducto += `
                <section class="nombreDelProducto">
                    <h1>${data.name}</h1>
                </section>
                <hr>
                <section class="infoDelProducto">
                    <p><strong>El precio es el siguiente: </strong><br>${data.currency} ${data.cost}</p>
                    <p><strong>Descripción:</strong><br>${data.description}</p>
                    <p><strong>Categoría:</strong><br>${data.category}</p>
                    <p><strong>Cantidad de vendidos:</strong><br>${data.soldCount}</p>
                </section>
                <hr>
                <section class="continuacionImagenes">
                    <p><strong>Las siguientes imágenes son meramente ilustrativas</strong></p>
                </section>
                <section class="imagenesDelProducto">
                ` + InnerImg + `
                </section>
            `;
            contenedor.innerHTML = contenidoProducto;
        })
        .catch(function(error){
            console.error("Ocurrio el siguiente error: ", error);
        })); 
}

// Función para obtener y mostrar comentarios desde la URL
function FetchURLComentario(){
    return (
        fetch(URLComentario)
    .then (function(response2) {
        return response2.json();
    })
    .then(function(data2){
        let comentarios = ``;
        for (let i = 0; i < data2.length; i++){
            comentarios += `
                <div class="Comentario">
                    <p>
                        <strong class="nombreComentario">${data2[i].user}</strong>
                        <br>
                        <span>Fecha del comentario: ${data2[i].dateTime}
                    </p>
                    <p>
                        <strong>Comentario:</strong>
                        <br>
                        <span>${data2[i].description}</span>
                    </p>
                    
                    <p>
                        <strong>
                        La puntuación de ${data2[i].user} es la siguiente: ${convertirPuntuacionEnEstrellas(data2[i].score)}
                        </strong>
                    </p>
                </div>
            `;
        }
        contenidoProducto += `
            <section class="contenedorComentario">
            ` + comentarios + `
            </section>
        `;
        contenedor.innerHTML = contenidoProducto;
    })
    .catch(function(error2){
        console.error("Ocurrio el siguiente error: ", error2);
    }));
}

// Evento que se ejecuta cuando el documento HTML se ha cargado completamente
document.addEventListener("DOMContentLoaded", function(){
    console.log("Carga de FetchURLProducto()");
    FetchURLProducto()
        .then(function () {
            console.log("Carga de FetchURLComentario()");
            return FetchURLComentario();
        })
        .catch(function (error) {
            console.error("Ha ocurrido algo con la carga de FetchURLComentario(): ", error);
        });
});

// Función para convertir la puntuación en estrellas
function convertirPuntuacionEnEstrellas(puntuacion) {
    let estrellasHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= puntuacion) {
            estrellasHTML += '<span class="fa fa-star checked"></span>';
        } else {
            estrellasHTML += '<span class="fa fa-star nochecked"></span>';
        }
    }
    return estrellasHTML;
}

// Evento de click en el botón para enviar un comentario
btnSendComentario.addEventListener("click", function(e){
    e.preventDefault();
    /* */
    let fechaActual = new Date();
    let fecha = fechaActual.toLocaleDateString();
    let hora = fechaActual.toLocaleTimeString();
    /* */
    let valorComentario = InputComentario.value;
    let divAux = document.createElement("div");
    let puntuacion = document.getElementById("puntuacion").value; 
    let mailUsuario = localStorage.getItem('mail'); 
    let contenedorDeComentario = document.getElementsByClassName("contenedorComentario");

    let comentario = `
        <p>
            <strong class="nombreComentario">${mailUsuario}</strong>
            <br>
            <span>Fecha del comentario: ${fecha} ${hora} 
        </p>
        <p>
            <strong>Comentario:</strong>
            <br>
            <span>${valorComentario}</span>
        </p>
        <p>
            <strong>
            La puntuacion de ${mailUsuario} es la siguiente: ${convertirPuntuacionEnEstrellas(puntuacion)}
            </strong>
        </p>
    `;

    divAux.classList.add("Comentario");
    divAux.innerHTML = comentario;
    if (valorComentario.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Algo no está bien',
            text: 
            'El comentario no puede estar vacio, porfavor para evotar esto le pedimos que rellene el campo del comentario para que el mismo pueda ser publicado correctamente.',
        });
        console.error("El comentario no puede estar vacio");
    } else {
        localStorage.setItem('comentario', comentario);
        contenedorDeComentario[0].appendChild(divAux);
        console.log("Comentario enviado");
        InputComentario.value = "";
    }
});