// URL de la API que contiene los datos de los productos en el carrito
let URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

// Elementos del DOM que se utilizan para mostrar la información del producto
let imagen = document.getElementById("imgProdComprar");
let nombre = document.getElementById("nomProdComprar");
let cantidad = document.getElementById("cantProdComprar");
let costo = document.getElementById("costProdComprar");
let subtotal = document.getElementById("subTotalProdComprar");
let colEliminar = document.getElementById("elimProdComprar");

let contenedorTotal = document.getElementById("MuestreoTotal");
let contenedorDelEnvio = document.getElementById("MuestreoCostoEnvio");
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
                <input id="cantidadDeProductos" type="number" min="1" value="1">
            </td>
            <td id="subTotalProdComprar" class="subTotal">${product.currency} ${product.unitCost}</td>
            <td id="elimProdComprar">
                <button id="btnBorrarElemento"><i class='bx bx-trash'></i></button>
            </td>
        `;
        const cantidadInput = auxRow.querySelector("#cantidadDeProductos");
        const subTotalElem = auxRow.querySelector("#subTotalProdComprar");
        // Agrega un evento para actualizar el subtotal cuando se cambia la cantidad
        cantidadInput.addEventListener("input", function() {
            const cantidad = parseInt(cantidadInput.value);
            const costo = product.unitCost;
            const nuevoSubtotal = cantidad * costo;
            subTotalProdComprar.textContent = `${product.currency} ${nuevoSubtotal}`;
        });
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
                        <td id="costProdComprar${id}">${data.currency} ${data.cost}</td>
                        <td id="cantProdComprar">
                            <input id="cantidadDeProductos${id}" class="inpProduct" type="number" min="1" value="1">
                        </td>
                        <td id="subTotalProdComprar${id}" class="subTotal">${data.currency} ${data.cost}</td>
                        <td id="elimProdComprar">
                            <button id="btnBorrarElemento"><i class='bx bx-trash'></i></button>
                        </td>
                    `;
                }
                // Obtiene elementos relevantes dentro de la fila
                const cantidadInput = auxRow.querySelector(`#cantidadDeProductos${id}`);
                
                const subTotalElem = auxRow.querySelector(`#subTotalProdComprar${id}`);

                const costoProd = auxRow.querySelector(`costProdComprar${id}`)
                
                const btnBorrarElemento = auxRow.querySelector("#elimProdComprar");
                
                cantidadInput.addEventListener("input", function() {
                    
                    const cantidad = parseInt(cantidadInput.value);
                    const costoProd = data.cost;                    
                    const nuevoSubtotal = cantidad * costoProd;
                    console.log(nuevoSubtotal)
                    subTotalElem.textContent = `${data.currency} ${nuevoSubtotal}`;
                });
         
               

                // Agrega la fila de tabla al carrito
                formCarrito.appendChild(auxRow);
                // Agrega un evento al botón de eliminar para quitar el producto
                btnBorrarElemento.addEventListener("click", function() {
                    formCarrito.removeChild(auxRow);
                    console.log("este es el aux",auxRow)

                    // Actualiza el almacenamiento local para reflejar la eliminación
                    let indice = idComprado.indexOf(id);
                    console.log(indice)
                    if (indice !== -1) {
                        idComprado.splice(indice, 1);
                        localStorage.setItem("idComprado", JSON.stringify(idComprado));
                    }
                })
                

                
                
                

                function dolaresAPesos(dolares) {
                    return dolares * 39.9;
                }

                function pesosADolares(pesos) {
                    return pesos / 0.025;
                }

                
                
                    
                    
                
               
                
            })
            .catch(function(error) {
                console.error("Ocurrió el siguiente error: ", error);
            });
    });
    setTimeout(() => {
        const products = document.getElementsByClassName("subTotal")
    let subTotal = 0
    for(let i = 0 ; i<products.length ; i++){
        let producto = products[i].textContent
        let product = producto.split(" ")
        if(product[0]=="UYU"){ 
            let num = parseInt(product[1])      
            subTotal+= (num/39)
         }else{
                let num = parseInt(product[1]);
                subTotal += num
            }
    }
        const contSubTotal= document.getElementById("MuestreoSubTotal")
        contSubTotal.innerHTML = `USD ${subTotal.toFixed()}`
     
     
        let porcentajeEnvio = 0;
        let costoEnvio = 0;
        if (envio1.checked){
            porcentajeEnvio = 0.15; //15%
        } else if (envio2.checked){
            porcentajeEnvio = 0.07; //7%
        } else if (envio3.checked){
            porcentajeEnvio = 0.05; //5%
        }
        console.log(porcentajeEnvio)

        costoEnvio = subTotal * porcentajeEnvio;
        let total = subTotal + costoEnvio;
        contenedorDelEnvio.textContent = `USD ${costoEnvio.toFixed()}`
        
        contenedorTotal.textContent = `USD  ${total.toFixed()}`;
          return total;      

    }, 300);
}

const tagProductos = document.getElementsByTagName("tbody")
                console.log(tagProductos)
document.addEventListener("click",function subTotal() {
                    
    const products = document.getElementsByClassName("subTotal")
    let subTotal = 0
    for(let i = 0 ; i<products.length ; i++){
        let producto = products[i].textContent
        let product = producto.split(" ")
        if(product[0]=="UYU"){ 
            let num = parseInt(product[1])
            console.log("Numero",num)
            
            subTotal+= (num/39)
            console.log("SubTotal ",subTotal)
         }else{
                let num = parseInt(product[1]);
                subTotal += num
            }
    }
    const contSubTotal= document.getElementById("MuestreoSubTotal")
    contSubTotal.innerHTML = `USD ${subTotal.toFixed()}`

    let porcentajeEnvio = 0;
    let costoEnvio = 0;
    if (envio1.checked){
        porcentajeEnvio = 0.15; //15%
    } else if (envio2.checked){
        porcentajeEnvio = 0.07; //7%
    } else if (envio3.checked){
        porcentajeEnvio = 0.05; //5%
    }
    console.log(porcentajeEnvio)

    costoEnvio = subTotal * porcentajeEnvio;
    let total = subTotal + costoEnvio;
    contenedorDelEnvio.textContent = `USD ${costoEnvio.toFixed()}`
    
    contenedorTotal.textContent = `USD  ${total.toFixed()}`;
      
    
});

    //habilitar deshabilitar campos del modal
    let radioTarjeta = document.getElementById("SeleccionPago1");
    let radioTransferencia = document.getElementById("SeleccionPago2");
    let nombreTarjeta = document.getElementById("Nombre");
    let codSeg = document.getElementById("CodSeg");
    let fecha = document.getElementById("fecha");
    let numeroCuenta = document.getElementById("NumeroCuenta");
    let formaDePago = document.getElementById("FormaDePago");

    // Agregar event listener para los botones de radio
    radioTarjeta.addEventListener("change", enableTarjetaFields);
    radioTransferencia.addEventListener("change", enableTransferenciaFields);

    // Funcion para habilitar los campos de tarjeta de credito y deshabilitar los de transferencia bancaria
    function enableTarjetaFields() {
        if (radioTarjeta.checked) {
            nombreTarjeta.removeAttribute("disabled");
            codSeg.removeAttribute("disabled");
            fecha.removeAttribute("disabled");
            numeroCuenta.setAttribute("disabled", "disabled");
        }
    }

    // Función para habilitar los campos de transferencia bancaria y deshabilitar los de tarjeta de crédito
    function enableTransferenciaFields() {
        if (radioTransferencia.checked) {
            numeroCuenta.removeAttribute("disabled");
            nombreTarjeta.setAttribute("disabled", "disabled");
            codSeg.setAttribute("disabled", "disabled");
            fecha.setAttribute("disabled", "disabled");
        }
    }
    // Mostrar la selección en forma de pago
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
    

    // Validaciones que realiza el botón finalizar compra
    // document.getElementById('btnFinalizarCompra').addEventListener('click', function() {
    //     // Obtener valores de los campos
    //     const calle = document.getElementById('calle').value;
    //     const numero = document.getElementById('numero').value;
    //     const esquina = document.getElementById('esquina').value;
    //     const formaEnvio = document.getElementById('formaEnvio').value;
    //     const cantidadArticulo = document.getElementById('cantidadArticulo').value;
    //     const formaPago = document.getElementById('formaPago').value;
    //     const detallesPago = document.getElementById('detallesPago').value;
    
    //     // Realizar validaciones
    //     if (calle.trim() === '' || numero.trim() === '' || esquina.trim() === '') {
    //         alert('Los campos calle, número y esquina no pueden estar vacíos.');
    //         return;
    //     }
    
    //     if (formaEnvio === '') {
    //         alert('Debes seleccionar una forma de envío.');
    //         return;
    //     }
    
    //     if (parseInt(cantidadArticulo) <= 0 || isNaN(cantidadArticulo)) {
    //         alert('La cantidad para cada artículo debe ser mayor a 0.');
    //         return;
    //     }
    
    //     if (formaPago === '') {
    //         alert('Debes seleccionar una forma de pago.');
    //         return;
    //     }
    
    //     // Realizar validaciones específicas para la forma de pago seleccionada
    //     if (formaPago === 'tarjeta' && detallesPago.trim() === '') {
    //         alert('Debes proporcionar los detalles de la tarjeta de crédito.');
    //         return;
    //     }
    
    //     // Si todas las validaciones pasan, puedes ejecutar la lógica para enviar el formulario
    //     alert('Formulario enviado exitosamente!');
    // });

    //Validacion
    (function () {
        'use strict';
      
        // Selecciona el elemento por la clase
        var forms = document.getElementsByClassName('validacion');
      
        // Agrega un event listener para el botón
        var finalizarCompraButton = document.getElementById('btnFinalizarCompra');
        finalizarCompraButton.addEventListener('click', function (event) {
          var isFormValid = true; // Variable para rastrear si el formulario es válido
      
          // Verifica si todos los campos del formulario son válidos
          for (var i = 0; i < forms.length; i++) {
            var form = forms[i];
            // Verifica si es válido
            if (!form.checkValidity()) {
              isFormValid = false; // Marca el formulario como inválido si al menos uno de ellos no lo es
              event.preventDefault(); // No permite que se envíe el formulario si es inválido
              event.stopPropagation();
            }
      
            form.classList.add('was-validated');
          }
          var selectedRadioButton = document.querySelector('input[name="opciones"]:checked');
          var tipoEnvioError = document.getElementById("tipoEnvioError");
      
          if (!selectedRadioButton) {
            isFormValid = false; // Marca el formulario como no valido si falta elegir un radio
            event.preventDefault(); // No permite que se envíe el formulario si es inválido
            tipoEnvioError.style.display = "block"; // Muestra el mensaje de error
          } else {
            tipoEnvioError.style.display = "none"; // Oculta el mensaje de error
          }
          // Verificar si el formulario de pago también es válido
          let selectedPayment = document.querySelector('input[name="opcionesP"]:checked');
          let formaPagoError = document.getElementById("formaPagoError");
      
          if (!selectedPayment) {
            isFormValid = false; // Marca el formulario como inválido si no se selecciona una forma de pago
            event.preventDefault(); // No permite que se envíe el formulario si es inválido
            formaPagoError.style.display = "block"; // Muestra el mensaje de error
          } else {
            formaPagoError.style.display = "none"; // Oculta el mensaje de error si se seleccionó una forma de pago válida
          }
      
          // Si todos los formularios son válidos, muestra la alerta
          if (isFormValid) {
            var alertSuccess = document.querySelector('.alert.alert-success');
            alertSuccess.classList.remove('d-none'); // Quita la clase 'd-none' para mostrar la alerta            
          }
        });
      })();
    

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



let seleccion1 = document.getElementById("Seleccionradio1")
let seleccion2 = document.getElementById("Seleccionradio2")
let seleccion3 = document.getElementById("Seleccionradio3")


seleccion1.addEventListener("change",function(){

    let porcentajeEnvio = 0;
    let costoEnvio = 0;
    if (envio1.checked){
        porcentajeEnvio = 0.15; //15%
    } else if (envio2.checked){
        porcentajeEnvio = 0.07; //7%
    } else if (envio3.checked){
        porcentajeEnvio = 0.05; //5%
    }
    console.log(porcentajeEnvio)

    costoEnvio = subTotal * porcentajeEnvio;
    let total = subTotal + costoEnvio;
    contenedorDelEnvio.textContent = `USD ${costoEnvio.toFixed()}`
    
    contenedorTotal.textContent = `USD  ${total.toFixed()}`;
})