// Obtener URLs de los productos y comentarios basados en el ID de producto almacenado en el local storage
let URLProducto = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem('prodID')}.json`;
let URLComentario = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem('prodID')}.json`;
// Referencias a elementos del DOM
let contenedor = document.getElementById("contenedorProductInfo");
let contenedorProdRel = document.getElementById("productosRelacionados");
let InputComentario = document.getElementById("comentarioUsu");
let btnSendComentario = document.getElementById("btnComentario");
const btnComprar = document.getElementById("btnComprar");
// variables vacías que usarán en funciones para cargar los Productos y Productos Relacionados
let contenidoProducto = "";
let contenidoProdRel = "";

// Función para obtener y mostrar información del producto desde la URL
function FetchURLProducto() {
    return (fetch(URLProducto)
        .then(function (response) {
            return response.json();
        })
        //Acá se procesan los datos de imágenes y se genera HTML dinámico por medio de un for, esto para el carrusel de imágenes
        .then(function (data) {
            let btnProdComprar = document.getElementById("btnComprarProducto");
            let InnerImg = ``;
            let ProdRel = ``;
            for (let j = 0; j < data.images.length; j++) {
                const activeClass = j === 0 ? 'active' : '';
                InnerImg += `
                <div class="carousel-item ${activeClass}" data-bs-interval="10000"> 
                    <img src="${data.images[j]}" class="d-block w-75 mx-auto" alt="Image ${j + 1}">
                    <div class="carousel-caption d-none d-md-block">                     
                    </div>
                </div>
                `;
            }
            // Este fragmento de código genera dinámicamente el contenido HTML para mostrar la información del producto y productos relacionados en una página web

            // Se crea una variable para almacenar el contenido del producto
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
                
                <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        ${generateIndicators(data.images.length)}
                    </div>
                    <div class="carousel-inner">
                    ` + InnerImg + `
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <div class="contbtnComprarProducto">
                    <button onclick="toCart()" id="btnComprarProducto">Comprar producto<br>
                    <i id="btnComprar" class='bx bx-cart-add'></i>
                    </button>
                </div>
            `;

            // Se crea una variable para almacenar el contenido de productos relacionados
            ProdRel += `
                <a href="product-info.html" id="ProductoRelacionado0">
                    <img class="imgProdRelacionado" src="${data.relatedProducts[0].image}" alt=""/>
                    <p class="parrafoProdRelacionado">${data.relatedProducts[0].name}</p>
                </a>
                <a href="product-info.html" id="ProductoRelacionado1">
                    <img class="imgProdRelacionado" src="${data.relatedProducts[1].image}" alt=""/>
                    <p class="parrafoProdRelacionado">${data.relatedProducts[1].name}</p>
                </a>
            `;
            contenedor.innerHTML = contenidoProducto; // Muestra la información del producto
            contenidoProdRel += ProdRel; // Agrega los productos relacionados al contenido
            contenedorProdRel.innerHTML = contenidoProdRel; // Muestra los productos relacionados

            // Se obtienen los elementos HTML para los enlaces de productos relacionados
            let linkProdRel0 = document.getElementById("ProductoRelacionado0");
            let linkProdRel1 = document.getElementById("ProductoRelacionado1");

            // Se agrega un evento de click a los enlaces de productos relacionados para navegar entre ellos
            linkProdRel0.addEventListener("click", function(){
                localStorage.setItem("prodID", data.relatedProducts[0].id);
            });
            linkProdRel1.addEventListener("click", function(){
                localStorage.setItem("prodID", data.relatedProducts[1].id);
            });
        })
        .catch(function(error){
            console.error("Ocurrio el siguiente error: ", error);
        })); 

        // Esta función crea indicadores para el carrusel de imágenes en base al número de imágenes proporcionadas
        function generateIndicators(num) {
            let indicators = '';
            for (let i = 0; i < num; i++) {
                // Se establece la clase 'active' para el primer indicador
                const activeClass = i === 0 ? 'active' : '';
                indicators += `<div class="bbfoto">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${i}" class="${activeClass} " aria-label="Slide ${i + 1}"></button>
                </div>`;
            }
            return indicators;
        }
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
    // Se crea un elemento divAux con la clase "Comentario" y se le asigna el contenido del comentario
    divAux.classList.add("Comentario");
    divAux.innerHTML = comentario;

    // Se verifica si el comentario tiene una longitud igual a cero (está vacío), y según la condición aparecerá error o se agrega el comentario
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

/*function toCart(){
    window.location = "cart.html";
    let idComprado = localStorage.getItem("prodID");
    localStorage.setItem("idComprado", idComprado);
};
*/


function toCart(){
    window.location = "cart.html";
    let idComprado = localStorage.getItem("prodID");
    console.log(idComprado)
    if (!localStorage.getItem('idComprado')) {

        const arrayCompras = [];
        localStorage.setItem('idComprado', JSON.stringify(arrayCompras));
      }
    const storedArray = JSON.parse(localStorage.getItem('idComprado'));
    storedArray.push(idComprado);
    localStorage.setItem('idComprado', JSON.stringify(storedArray))
};


