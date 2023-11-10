/**/
let inputNombre = document.getElementById("inpNombre");
let inputApellido = document.getElementById("inpApellido");
let inputSegundoNombre = document.getElementById("inpSegundoNombre");
let inputSegundoApellido = document.getElementById("inpSegundoApellido");
let inputEmail = document.getElementById("inpEmail");
let inputTelefono = document.getElementById("inpTelefono");
let btnGuardar = document.getElementById("btnGuardar");
/**/
/**/
function ClaseValida(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
}

function ClaseInvalida(input) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
}
/* */

document.addEventListener("DOMContentLoaded",function(){
    if(localStorage.getItem('registro') != 'true'){
        alert("Usted no ha iniciado sesión.")
        window.location.href = 'login.html'
    }

    let emailCargado = localStorage.getItem("guardadoMail");
    inputEmail.value = emailCargado;

    inputNombre.value = localStorage.getItem('Nombre');
    inputApellido.value = localStorage.getItem('Apellido');
    inputSegundoNombre.value = localStorage.getItem('SegundoNombre');
    inputSegundoApellido.value = localStorage.getItem('SegundoApellido');
    inputTelefono.value = localStorage.getItem('Telefono');
});

btnGuardar.addEventListener("click", function () {
    let nombre = inputNombre.value;
    let segundoNombre = inputSegundoNombre.value;
    let apellido = inputApellido.value;
    let segundoApellido = inputSegundoApellido.value;
    let telefono = inputTelefono.value;
    let email = inputEmail.value;

    if (nombre == "") {
        ClaseInvalida(inputNombre);
        if (!document.getElementById("mensajeErrorNombre")) {
            let mensajeError = document.createElement("p");
            mensajeError.id = "mensajeErrorNombre";
            mensajeError.classList.add("invalid-feedback");
            mensajeError.innerHTML = "El nombre es obligatorio";
            mensajeError.style.marginTop = "-20px";
            inputNombre.after(mensajeError);
        }
    } else {
        ClaseValida(inputNombre);
        localStorage.setItem("Nombre", nombre);
        if (document.getElementById("mensajeErrorNombre")) {
            document.getElementById("mensajeErrorNombre").remove();
        }
    }

    if (apellido == "") {
        ClaseInvalida(inputApellido);
        if (!document.getElementById("mensajeErrorApellido")) {
            let mensajeError = document.createElement("p");
            mensajeError.id = "mensajeErrorApellido";
            mensajeError.classList.add("invalid-feedback");
            mensajeError.innerHTML = "El apellido es obligatorio";
            mensajeError.style.marginTop = "-20px";
            inputApellido.after(mensajeError);
        }
    } else {
        ClaseValida(inputApellido);
        localStorage.setItem("Apellido", apellido);
        if (document.getElementById("mensajeErrorApellido")) {
            document.getElementById("mensajeErrorApellido").remove();
        }
    }

    if (telefono == "") {
        if (document.getElementById("mensajeErrorTelefono2")) {
            document.getElementById("mensajeErrorTelefono2").remove();
        }
        ClaseInvalida(inputTelefono);
        if (!document.getElementById("mensajeErrorTelefono")) {
            let mensajeError = document.createElement("p");
            mensajeError.id = "mensajeErrorTelefono";
            mensajeError.classList.add("invalid-feedback");
            mensajeError.innerHTML = "El telefono es obligatorio";
            inputTelefono.after(mensajeError);
        }
    } else {
        if (isNaN(telefono)) {
            if (document.getElementById("mensajeErrorTelefono")) {
                document.getElementById("mensajeErrorTelefono").remove();
            }
            ClaseInvalida(inputTelefono);
            if (!document.getElementById("mensajeErrorTelefono2")) {
                let mensajeError = document.createElement("p");
                mensajeError.id = "mensajeErrorTelefono2";
                mensajeError.classList.add("invalid-feedback");
                mensajeError.innerHTML = "Solo se permiten números";
                inputTelefono.after(mensajeError);
            }
        } else {
            ClaseValida(inputTelefono);
            localStorage.setItem("Telefono", telefono);
            if (document.getElementById("mensajeErrorTelefono")) {
                document.getElementById("mensajeErrorTelefono").remove();
            }
            if (document.getElementById("mensajeErrorTelefono2")) {
                document.getElementById("mensajeErrorTelefono2").remove();
            }
        }
    }

    if (email == "") {
        ClaseInvalida(inputEmail);
        if (!document.getElementById("mensajeErrorEmail")) {
            let mensajeError = document.createElement("p");
            mensajeError.id = "mensajeErrorEmail";
            mensajeError.classList.add("invalid-feedback");
            mensajeError.innerHTML = "El email es obligatorio";
            inputEmail.after(mensajeError);
        } else {
            ClaseValida(inputEmail);
            localStorage.setItem("guardadoMail", email);
            if (document.getElementById("mensajeErrorEmail")) {
                document.getElementById("mensajeErrorEmail").remove();
            }
        }
    }

    localStorage.setItem("SegundoNombre", segundoNombre);
    localStorage.setItem("SegundoApellido", segundoApellido);
});


