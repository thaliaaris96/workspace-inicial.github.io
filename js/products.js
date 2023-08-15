const productsContainer = document.getElementById("products-container");

// URL que contiene el JSON de productos
const apiUrl = "https://japceibal.github.io/emercado-api/cats_products/101.json"; // Reemplaza con la URL real

// Realizar la petición a la URL
fetch(apiUrl)
    .then(response => response.json())
    .then(productsData => {
        // Filtrar productos de la categoría 101 (Autos)
        const autosProducts = productsData.products;

        // Generar el contenido HTML de los productos
        let productsHTML = '';
        autosProducts.forEach(product => {
            productsHTML += `
                <div class="col-md-4">
                    <div class="card mb-4 shadow-sm custom-card">
                        <img class="bd-placeholder-img card-img-top" src="${product.image}" alt="${product.name}">
                        <h3 class="m-3">${product.name}</h3>
                        <div class="card-body">
                            <p class="card-text"><strong>Precio:</strong> ${product.cost} ${product.currency}</p>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><strong>Cantidad vendidos:</strong> ${product.soldCount}</p>
                        </div>
                    </div>
                </div>
            `;
        });        
        productsContainer.innerHTML = productsHTML;
    })
    .catch(error => {
        console.error("Error al cargar los productos:", error);
    });