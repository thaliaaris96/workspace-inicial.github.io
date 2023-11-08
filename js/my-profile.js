let inputNombre = document.getElementById("inpNombre");
let inputoApellido = document.getElementById("inpApellido");
let inputSegundoNombre = document.getElementById("inpSegundoNombre");
let inputSegundoApellido = document.getElementById("inpSegundoApellido");
let inputEmail = document.getElementById("inpEmail");
let inputTelefono = document.getElementById("inpTelefono");
let btnGuardar = document.getElementById("btnGuardar");

document.addEventListener("DOMContentLoaded",function(){
    if(localStorage.getItem('registro') != 'true'){
        alert("Usted no ha iniciado sesión.")
        window.location.href = 'login.html'
    }
    let emailCargado = localStorage.getItem("guardadoMail");
    inputEmail.value = emailCargado;

    inputNombre.value = localStorage.getItem('Nombre');
    inputoApellido.value = localStorage.getItem('Apellido');
    inputSegundoNombre.value = localStorage.getItem('SegundoNombre');
    inputSegundoApellido.value = localStorage.getItem('SegundoApellido');
    inputTelefono.value = localStorage.getItem('Telefono');
});

let nombre = inputNombre.value;
let segundoNombre = inputSegundoNombre.value;
let apellido = inputoApellido.value;
let segundoApellido = inputSegundoApellido.value;
let telefono = inputTelefono.value;
let email = inputEmail.value;

btnGuardar.addEventListener("click", function(){
    localStorage.setItem('guardadoMail', email);
    localStorage.setItem('Nombre', nombre);
    localStorage.setItem('Apellido', apellido);
    localStorage.setItem('SegundoNombre', segundoNombre);
    localStorage.setItem('SegundoApellido', segundoApellido);
    localStorage.setItem('Telefono', telefono);
});

