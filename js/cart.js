let URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let nombre = document.getElementById("nomProdComprar");
let costo = document.getElementById("costProdComprar");
let cantidad = document.getElementById("cantProdComprar");
let subtotal = document.getElementById("subTotalProdComprar");
let envio1 = document.getElementById("Seleccionradio1");
let envio2 = document.getElementById("Seleccionradio2");
let envio3 = document.getElementById("Seleccionradio3");
let imagen = document.getElementById("imgProdComprar");

function fetchProductoBase(){
    return (fetch(URL)
    .then(function(response){
        return response.json();
    }))
    .then(function(data){
        nombre.innerHTML = `${data.articles[0].name}`;
        costo.innerHTML = `${data.articles[0].currency} ${data.articles[0].unitCost}`;
        cantidad.innerHTML = `${data.articles[0].count}`;
        imagen.innerHTML = `<img src="${data.articles[0].image}" alt="${data.articles[0].name}">`;
        subtotal.innerHTML = `${data.articles[0].currency} ${data.articles[0].unitCost}`;
    })
    .catch(function(error){
        console.error("Ocurrio el siguiente error: ", error);
    }); 
};

let arrayComprados = [];

document.addEventListener("DOMContentLoaded", function(){
    fetchProductoBase();
    let idComprado = localStorage.getItem("idComprado");
    arrayComprados.push(idComprado);
    for(let i = 0; i < arrayComprados.length; i++)
    {
        let URLProductos = `https://japceibal.github.io/emercado-api/products/${i}.json`;
        function fetchProductos() {
            return (
                fetch(URLProductos)
                    .then(function(response){
                        return response.json();
                    })
                    .then (function(data) {
                        let formCarrito = document.getElementById("formCarrito");
                        let auxRow = ``;
                        auxRow.innerHTML = `
                        <div class="row">
                            <div class="col" id="imgProdComprar">${data.products.image[0]}</div>
                            <div class="col" id="nomProdComprar">${data.products.name[0]}</div>
                            <div class="col" id="costProdComprar">${data.products.costo[0]}</div>
                            <div class="col" id="cantProdComprar">
                                <input type="number" min="0" value="1">
                            </div>
                            <div class="col" id="subTotalProdComprar"></div>
                        </div>
                        `;
                        formCarrito.appendChild(auxRow);
                    }) 
            )
        }
    }
});



