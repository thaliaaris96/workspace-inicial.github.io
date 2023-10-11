let URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let imagen = document.getElementById("imgProdComprar");
let nombre = document.getElementById("nomProdComprar");
let cantidad = document.getElementById("cantProdComprar");
let costo = document.getElementById("costProdComprar");
let subtotal = document.getElementById("subTotalProdComprar");
let colEliminar = document.getElementById("elimProdComprar");
/* */
let arrayComprados = [];
/* */
let envio1 = document.getElementById("Seleccionradio1");
let envio2 = document.getElementById("Seleccionradio2");
let envio3 = document.getElementById("Seleccionradio3");

async function fetchProductoBase() {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        const product = data.articles[0];
        console.log(product);
        let auxRow = document.createElement("tr");
        auxRow.innerHTML = `
            <th scope="row" id="imgProdComprar"><img src="${product.image}" alt="${product.name}"></th>
            <td id="nomProdComprar">${product.name}</td>
            <td id="costProdComprar">${product.currency} ${product.unitCost}</td>
            <td id="cantProdComprar">
                <input id="cantidadDeProductos" type="number" min="1" max="1" value="${product.count}">
            </td>
            <td id="subTotalProdComprar">${product.currency} ${product.unitCost}</td>
            <td id="elimProdComprar">
                <button id="btnBorrarElemento"><i class='bx bx-trash'></i></button>
            </td>
        `;
        formCarrito.appendChild(auxRow);
        let btnBorrarElemento = document.getElementById("btnBorrarElemento");
        btnBorrarElemento.addEventListener("click", function() {
            formCarrito.removeChild(auxRow);
        })
    } catch (error) {
        console.error("Ocurrió el siguiente error: ", error);
    }
}

async function fetchOtrosProductos() {
    let idComprado = JSON.parse(localStorage.getItem("idComprado")) || [];
    idComprado.forEach(function(id) {
        let URLProducto = `https://japceibal.github.io/emercado-api/products/${id}.json`;

        fetch(URLProducto)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                let auxRow = document.createElement("tr");

                if (idComprado) {
                    auxRow.innerHTML = `
                        <th scope="row" id="imgProdComprar"><img src="${data.images && data.images[0]}" alt="${data.name}"></th>
                        <td id="nomProdComprar">${data.name}</td>
                        <td id="costProdComprar">${data.currency} ${data.cost}</td>
                        <td id="cantProdComprar">
                            <input id="cantidadDeProductos" type="number" min="0" value="1">
                        </td>
                        <td id="subTotalProdComprar">${data.currency} ${data.cost}</td>
                        <td id="elimProdComprar">
                            <button id="btnBorrarElemento"><i class='bx bx-trash'></i></button>
                        </td>
                    `;
                }
                const cantidadInput = auxRow.querySelector("#cantidadDeProductos");
                const subTotalElem = auxRow.querySelector("#subTotalProdComprar");
                const btnBorrarElemento = auxRow.querySelector("#elimProdComprar");

                cantidadInput.addEventListener("input", function() {
                    const cantidad = parseInt(cantidadInput.value);
                    const costo = data.cost;
                    const nuevoSubtotal = cantidad * costo;
                    subTotalElem.textContent = `${data.currency} ${nuevoSubtotal}`;
                });
                formCarrito.appendChild(auxRow);
                btnBorrarElemento.addEventListener("click", function() {
                    formCarrito.removeChild(auxRow);
                    let indice = idComprado.indexOf(id);
                    if (indice !== -1) {
                        idComprado.splice(indice, 1);
                        localStorage.setItem("idComprado", JSON.stringify(idComprado));
                    }
                })
                
            })
            .catch(function(error) {
                console.error("Ocurrió el siguiente error: ", error);
            });
    });
    
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("Carga de fetchProductoBase()");
    fetchProductoBase()
        .then(function () {
            console.log("Carga de fetchOtrosProductos()");
            return fetchOtrosProductos();
        })
        .catch(function (error) {
            console.error("Ha ocurrido algo con la carga de fetchOtrosProductos();: ", error);
        });
});

