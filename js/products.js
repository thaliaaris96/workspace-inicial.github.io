const productosContainer = document.getElementById("products-container");

// URL que contiene el JSON de productos
const apiUrl = "https://japceibal.github.io/emercado-api/cats_products/101.json";

// Realizar la petición a la URL
fetch(apiUrl)
    .then((response) => response.json())
    .then(
        function (datoProductos) {
            const autosProductos = datoProductos.products; // Array en el JSON se llama productos
            let titulo = datoProductos.catName;
            let tituloProducto = document.getElementById("tituloProducto");
            tituloProducto.textContent = titulo;

            let productosHTML = "";
            autosProductos.forEach((producto) => {
                productosHTML += `
                        <div class="autos-tarjetas col-md-4">
                            <div class="card mb-4 shadow-sm custom-card">
                                <img class="bd-placeholder-img card-img-top" src="${producto.image}" alt="${producto.name}">
                                <h3 class="m-3">${producto.name}</h3>
                                <div class="card-body">
                                    <p class="card-text"><strong>Precio:</strong> ${producto.cost} ${producto.currency}</p>
                                    <p class="card-text">${producto.description}</p>
                                    <p class="card-text"><strong>Cantidad vendidos:</strong> ${producto.soldCount}</p>
                                </div>
                            </div>
                        </div>
                    `;
    });

    productosContainer.innerHTML = productosHTML;
    })
    .catch((function (error) {
        console.error("Los productos no se han cargado de manera adecuada:", error);
    }));