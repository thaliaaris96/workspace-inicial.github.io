const productosContainer = document.getElementById("products-container");

fetch(`https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem('catID')}.json`)
.then((response) => response.json())
.then(function (datoProductos) {
        const autosProductos = datoProductos.products; // Array en el JSON se llama productos
        let titulo = datoProductos.catName;
        let tituloProducto = document.getElementById("tituloProducto");
        tituloProducto.textContent = titulo;

        let productosHTML = "";
        autosProductos.forEach((producto) => {
            productosHTML += `
                    <div class="TarjetaProducto">
                        <div class="InfoProducto"> 
                            <img class="ImagenProducto" src="${producto.image}" alt="${producto.name}">
                            <div class="Descripcion">
                                <h3>${producto.name}</h3>
                                <p class="descripcionProducto">${producto.description}</p>
                                <p class="VentasProducto"><span>Cantidad vendidos:</span> ${producto.soldCount}</p>
                            </div>
                        </div>
                        <div class="ComprarProducto">
                            <p class="descripcionPrecio"><span>Precio:</span> ${producto.cost} ${producto.currency}</p>
                            <button class="botonComprar">Comprar</button>
                        </div>
                    </div>
            `;
});

productosContainer.innerHTML = productosHTML;
})
.catch((function (error) {
    console.error("Los productos no se han cargado de manera adecuada:", error);
}));

document.addEventListener("DOMContentLoaded", function(e){
    let mmail = localStorage.getItem('mail');
    let spanM = document.getElementById('mailNB');
    if (mmail != null)
    {
    spanM.innerHTML = `${mmail}`;
    }
})
    