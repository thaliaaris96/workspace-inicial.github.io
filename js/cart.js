// URL de la API que contiene los datos de los productos en el carrito
let URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

// Elementos del DOM que se utilizan para mostrar la información del producto
let imagen = document.getElementById("imgProdComprar");
let nombre = document.getElementById("nomProdComprar");
let cantidad = document.getElementById("cantProdComprar");
let costo = document.getElementById("costProdComprar");
let subtotal = document.getElementById("subTotalProdComprar");
let colEliminar = document.getElementById("elimProdComprar");
// Array para almacenar los IDs de los productos comprados
let arrayComprados = [];
// Elementos de radio para los tipos de envío
let envio1 = document.getElementById("Seleccionradio1");
let envio2 = document.getElementById("Seleccionradio2");
let envio3 = document.getElementById("Seleccionradio3");
// Función asincrónica para obtener el producto base del carrito
async function fetchProductoBase() {
    try {
        // Realiza una solicitud a la URL de la API
        const response = await fetch(URL);
        const data = await response.json();
         // Obtiene el primer producto de la respuesta
        const product = data.articles[0];
        // Crea una fila de tabla con la información del producto
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
        // Agrega la fila de tabla al carrito
        formCarrito.appendChild(auxRow);
        // Agrega un evento al botón de eliminar para quitar el producto
        let btnBorrarElemento = document.getElementById("btnBorrarElemento");
        btnBorrarElemento.addEventListener("click", function() {
            formCarrito.removeChild(auxRow);
        })
    } catch (error) {
        console.error("Ocurrió el siguiente error: ", error);
    }
}

// Función para obtener y mostrar otros productos en el carrito
async function fetchOtrosProductos() {
     // Obtiene los IDs de productos comprados almacenados en el almacenamiento local
    let idComprado = JSON.parse(localStorage.getItem("idComprado")) || [];
    // Itera a través de los IDs y obtiene información de los productos
    idComprado.forEach(function(id) {
        let URLProducto = `https://japceibal.github.io/emercado-api/products/${id}.json`;

        fetch(URLProducto)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                // Crea una fila de tabla con información del producto
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
                // Obtiene elementos relevantes dentro de la fila
                const cantidadInput = auxRow.querySelector("#cantidadDeProductos");
                const subTotalElem = auxRow.querySelector("#subTotalProdComprar");
                const btnBorrarElemento = auxRow.querySelector("#elimProdComprar");

                // Agrega un evento para actualizar el subtotal cuando se cambia la cantidad
                cantidadInput.addEventListener("input", function() {
                    const cantidad = parseInt(cantidadInput.value);
                    const costo = data.cost;
                    const nuevoSubtotal = cantidad * costo;
                    subTotalElem.textContent = `${data.currency} ${nuevoSubtotal}`;
                });
                // Agrega la fila de tabla al carrito
                formCarrito.appendChild(auxRow);
                 // Agrega un evento al botón de eliminar para quitar el producto
                btnBorrarElemento.addEventListener("click", function() {
                    formCarrito.removeChild(auxRow);
                    // Actualiza el almacenamiento local para reflejar la eliminación
                    let indice = idComprado.indexOf(id);
                    if (indice !== -1) {
                        idComprado.splice(indice, 1);
                        localStorage.setItem("idComprado", JSON.stringify(idComprado));
                    }
                })
                function Sumatotal() {
                    let subtotal = 0;
                    let porcentajeEnvio = 0;
                    let costoEnvio = 0;
                    /* */
                    if (envio1.checked){
                        porcentajeEnvio = 0.15; //15%
                    } else if (envio2.checked){
                        porcentajeEnvio = 0.07; //7%
                    } else if (envio3.checked){
                        porcentajeEnvio = 0.05; //5%
                    }

                    for (let c = 0; c < idComprado.length; c++){
                        subtotal += idComprado[c].precio * idComprado[c].cantidad;
                    }
                    
                    costoEnvio = subtotal * porcentajeEnvio;
                    total = subtotal + costoEnvio;
                    return total;
                }
            })
            .catch(function(error) {
                console.error("Ocurrió el siguiente error: ", error);
            });
    });
    
}
    //habilitar deshabilitar campos del modal
    let radioTarjeta = document.getElementById("SeleccionPago1");
    let radioTransferencia = document.getElementById("SeleccionPago2");
    let nombreTarjeta = document.getElementById("Nombre");
    let codSeg = document.getElementById("CodSeg");
    let fecha = document.getElementById("fecha");
    let numeroCuenta = document.getElementById("NumeroCuenta");
    let formaDePago = document.getElementById("FormaDePago");

    // agregar event listener para los botones de radio
    radioTarjeta.addEventListener("change", enableTarjetaFields);
    radioTransferencia.addEventListener("change", enableTransferenciaFields);

    // funcion para habilitar los campos de tarjeta de credito y deshabilitar los de transferencia bancaria
    function enableTarjetaFields() {
        if (radioTarjeta.checked) {
            nombreTarjeta.removeAttribute("disabled");
            codSeg.removeAttribute("disabled");
            fecha.removeAttribute("disabled");
            numeroCuenta.setAttribute("disabled", "disabled");
        }
    }

    // funcion para habilitar los campos de transferencia bancaria y deshabilitar los de tarjeta de credito
    function enableTransferenciaFields() {
        if (radioTransferencia.checked) {
            numeroCuenta.removeAttribute("disabled");
            nombreTarjeta.setAttribute("disabled", "disabled");
            codSeg.setAttribute("disabled", "disabled");
            fecha.setAttribute("disabled", "disabled");
        }
    }
    //mostrar la seleccion en forma de pago
    radioTarjeta.addEventListener("change", updateFormaDePagoText);
    radioTransferencia.addEventListener("change", updateFormaDePagoText);

    function updateFormaDePagoText() {
        if (radioTarjeta.checked) {
            formaDePago.textContent = "Tarjeta de crédito";
        } else if (radioTransferencia.checked) {
            formaDePago.textContent = "Transferencia bancaria";
        } else {
            formaDePago.textContent = "No ha seleccionado";
        }
    }

// Evento que se dispara cuando la página se carga completamente
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

