// Obtener referencias a elementos del documento HTML
const productosContainer = document.getElementById("products-container");
let btnSortA = document.getElementById("sortAsc");
let btnSortD = document.getElementById("sortDesc");
let btnSortV = document.getElementById("sortByCount");
const ORDER_ASC_BY_PRICE = "PriceAsc";
const ORDER_DESC_BY_PRICE = "PriceDesc";
const ORDER_DESC_BY_REL = "RelDesc";
// URL de los productos basada en la categoría almacenada en el almacenamiento local
const URL_PRODUCTOS = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem('catID')}.json`
// Variables para almacenar productos y criterios de ordenamiento
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

// Función que se ejecuta cuando el documento HTML se ha cargado completamente
document.addEventListener("DOMContentLoaded", function (e) {
    // Obtener el correo electrónico del almacenamiento local y mostrarlo
    let mmail = localStorage.getItem('mail');
    let spanM = document.getElementById('mailNB');
    if (mmail != null) {
        spanM.innerHTML = `${mmail}`;
    }
    // Obtener los datos de los productos mediante una llamada a una función externa
    getJSONData(URL_PRODUCTOS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data.products
            showProductsList(currentProductsArray)
        }
    });

     // Agregar event listeners para los botones de ordenamiento
    btnSortA.addEventListener("click", function () {
        sortProductos(ORDER_ASC_BY_PRICE, currentProductsArray);
    });

    btnSortD.addEventListener("click", function () {
        sortProductos(ORDER_DESC_BY_PRICE, currentProductsArray);
    });

    btnSortV.addEventListener("click", function () {
        sortProductos(ORDER_DESC_BY_REL, currentProductsArray);
    });

    // Event listener para el botón "Limpiar filtro de rango de precio"
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList(currentProductsArray);
    });

    // Event listener para el botón "Filtrar por rango de precio"
    document.getElementById("rangeFilterPrice").addEventListener("click", function () {
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;
    
        if ((minPrice !== undefined) && (minPrice !== "") && (parseInt(minPrice) >= 0)) {
            minPrice = parseInt(minPrice);
        } else {
            minPrice = 0; 
        }
    
        if ((maxPrice !== undefined) && (maxPrice !== "") && (parseInt(maxPrice) >= 0)) {
            maxPrice = parseInt(maxPrice);
        } else {
            maxPrice = Number.MAX_SAFE_INTEGER; 
        }
        
        showProductsList(currentProductsArray);
    });

});

// Función para ordenar los productos según un criterio dado
function sortProductos(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (parseFloat(a.cost) < parseFloat(b.cost)) {
                return -1;
            }
            if (parseFloat(a.cost) > parseFloat(b.cost)) {
                return 1;
            }
            return 0;
        });
    }
    if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (parseFloat(a.cost) > parseFloat(b.cost)) {
                return -1;
            }
            if (parseFloat(a.cost) < parseFloat(b.cost)) {
                return 1;
            }
            return 0;
        });
    }
    if (criteria === ORDER_DESC_BY_REL) {
        result = array.sort(function (a, b) {
            if (parseFloat(a.soldCount) > parseFloat(b.soldCount)) {
                return -1;
            }
            if (parseFloat(a.soldCount) < parseFloat(b.soldCount)) {
                return 1;
            }
            return 0;
        });
    }
    showProductsList(result);
};

// Función para establecer el ID del producto seleccionado y redirigir a otra página
function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
};

// Función para mostrar la lista de productos en la página
function showProductsList(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let producto = array[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseFloat(producto.cost) >= minPrice) &&
           ((maxPrice == undefined) || maxPrice != undefined && parseFloat(producto.cost) <= maxPrice))) {
            htmlContentToAppend += `
                <div onclick="setProdID(${producto.id})" class="list-group-item list-group-item-action cursor-active">
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
                </div>
            `;
        }
    }
    document.getElementById('products-container').innerHTML = htmlContentToAppend;
};

// Referencia al campo de búsqueda
let inpBuscar = document.getElementById('buscador');
// Crear una copia del arreglo original de productos para realizar búsquedas
const originalProductsArray = [...currentProductsArray]; 

// Event listener para el campo de búsqueda
inpBuscar.addEventListener('keyup', function() {
    const searchText = inpBuscar.value.toLowerCase();

    if (searchText === "") {
        showProductsList(originalProductsArray);
    }
    // Filtrar los productos según el texto de búsqueda
    const filteredProducts = currentProductsArray.filter(product => 
        (product.name.toLowerCase().includes(searchText)) || product.description.toLowerCase().includes(searchText));

    
    showProductsList(filteredProducts);
});

