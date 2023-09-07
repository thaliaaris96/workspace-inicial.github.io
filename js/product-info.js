let URLProducto = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem('prodID')}.json`;
let URLComentario = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem('prodID')}.json`;
let contenedor = document.getElementById("contenedorProductInfo");
let contenidoProducto = "";
let InputComentario = document.getElementById("comentarioUsu");
let btnSendComentario = document.getElementById("btnComentario");
/* console.log(localStorage.getItem('prodID')); */

document.addEventListener("DOMContentLoaded", function(){

    fetch(URLProducto) 
        .then (function(response) {
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
                    <p><strong>Las siguientes imagenes son meramente ilustrativas</strong></p>
                </section>
                <section class="imagenesDelProducto">
                ` + InnerImg + `
                </section>
            `;
            contenedor.innerHTML = contenidoProducto;
        })
        .catch(function(error){
            console.error("Ocurrio el siguiente error: ", error);
        }); 

    fetch(URLComentario)
        .then (function(response2) {
            return response2.json();
        })
        .then(function(data2){
            let comentarios = ``;
            for (let i = 0; i < data2.length; i++){
                comentarios += `
                    <div class="Comentario">
                        <p><strong>Usuario:</strong> ${data2[i].user}</p>
                        <p><strong>Puntuacion:</strong> ${data2[i].score}</p>
                        <p><strong>Comentario:</strong> ${data2[i].description}</p>
                        <p><strong>Fecha:</strong> ${data2[i].dateTime}</p>
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
        });
    contenedor.appendChild(divAux);  
});

btnSendComentario.addEventListener("click", function(e){
    e.preventDefault();
    /* let ArrAux = new Array(); */
    let divAux = document.createElement("div");
    let valorComentario = InputComentario.value;
    divAux.classList.add("Comentario");
    localStorage.setItem('comentario', valorComentario);
    divAux.innerHTML = `${localStorage.getItem('comentario')}`;
    contenedor.appendChild(divAux);
    InputComentario.value = "";
});



/*

}
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>

*/