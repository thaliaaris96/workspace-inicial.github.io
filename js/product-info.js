let URLProducto = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem('prodID')}.json`;

/* console.log(localStorage.getItem('prodID')); */

document.addEventListener("DOMContentLoaded", function(){
    fetch(URLProducto) 
    .then (function(response) {
        return response.json();
    })
    .then(function(data){
        
        let contenedor = document.getElementById("contenedorProductInfo");
        let contenidoProducto = "";
       
        
        contenidoProducto += `
            <section>
                <h1>${data.name}</h1>
            </section>
            <hr>
            <section>
                <p><strong>Precio</strong> ${data.currency} ${data.cost}</p>
                    
            </section>
            
            <section>
            <p><strong>Descripción</strong><br> ${data.description}</p>
            </section>
            
            <section>
            <p><strong>Categoría</strong><br> ${data.category}</p>

            </section>
            
            <section>
            <p><strong>Cantidad de vendidos</strong><br> ${data.soldCount}</p>

            </section>
            
            <section>
            <p><strong>Imágenes ilustrativas</strong></p>
                <div class="">
                <img src="${data.images[0]}" alt=""/> 
                <img src="${data.images[1]}" alt=""/>
                <img src="${data.images[2]}" alt=""/>
                <img src="${data.images[3]}" alt=""/>
                <img src="${data.images[4]}" alt=""/>
                <img src="${data.images[5]}" alt=""/>
                </div>
            </section>
        `;
        
        contenedor.innerHTML = contenidoProducto;
    })
    .catch(function(error){
        console.error("Ocurrio el siguiente error: ", error);
    });
});