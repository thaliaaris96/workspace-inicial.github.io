let URLProducto = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem('prodID')}.json`;

/* console.log(localStorage.getItem('prodID')); */

document.addEventListener("DOMContentLoaded", function(){
    fetch(URLProducto) 
    .then (function(response) {
        return response.json();
    })
    .then(function(data){
        let contenedor = getElementById("contenedorProductInfo");
        let contenidoProducto = "";
        
        contenidoProducto.innerHTML += `
            <section>
                hola
            </section>
            <section>

            </section>
            <section>

            </section>
            <section>

            </section>
        `;

        contenedor.innerHTML = contenidoProducto;
    })
    .catch(function(error){
        console.error("Ocurrio el siguiente error: ", error);
    });
});