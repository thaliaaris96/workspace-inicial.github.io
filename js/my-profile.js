/**/
let inputNombre = document.getElementById("inpNombre");
let inputApellido = document.getElementById("inpApellido");
let inputSegundoNombre = document.getElementById("inpSegundoNombre");
let inputSegundoApellido = document.getElementById("inpSegundoApellido");
let inputEmail = document.getElementById("inpEmail");
let inputTelefono = document.getElementById("inpTelefono");
let btnGuardar = document.getElementById("btnGuardar");

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

    let emailCargado = localStorage.getItem("mail");
    inputEmail.value = emailCargado;
    inputNombre.value = localStorage.getItem('Nombre');
    inputApellido.value = localStorage.getItem('Apellido');
    inputSegundoNombre.value = localStorage.getItem('SegundoNombre');
    inputSegundoApellido.value = localStorage.getItem('SegundoApellido');
    inputTelefono.value = localStorage.getItem('Telefono');
});

document.addEventListener("DOMContentLoaded", function () {
    // Obtener el botón de guardar
    var btnGuardar = document.getElementById("btnGuardar");    
    // Agregar un event listener al botón
    btnGuardar.addEventListener("click", function () {
      // Obtener los valores de los campos
      var nombre = document.getElementById("inpNombre").value;
      var apellido = document.getElementById("inpApellido").value;
      var email = document.getElementById("inpEmail").value;
      var telefono = document.getElementById("inpTelefono").value;
      var imagenPerfilInput = document.getElementById("imgPerfil");
      var alertDanger = document.querySelector('.alert.alert-danger');      
      // Validar campos obligatorios
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

    if (email === "") {
        ClaseInvalida(inputEmail);
        if (!document.getElementById("mensajeErrorEmail")) {
            let mensajeError = document.createElement("p");
            mensajeError.id = "mensajeErrorEmail";
            mensajeError.classList.add("invalid-feedback");
            mensajeError.innerHTML = "El email es obligatorio";
            inputEmail.after(mensajeError);
        } else {
            ClaseValida(inputEmail);
            localStorage.setItem("mail", email);
            if (document.getElementById("mensajeErrorEmail")) {
                document.getElementById("mensajeErrorEmail").remove();
            }
        }
    } else if (!validarFormatoEmail(email)) {
        ClaseInvalida(inputEmail);
        if (!document.getElementById("mensajeErrorEmailFormato")) {
            let mensajeError = document.createElement("p");
            mensajeError.id = "mensajeErrorEmailFormato";
            mensajeError.classList.add("invalid-feedback");
            mensajeError.innerHTML = "Formato de correo electrónico inválido";
            inputEmail.after(mensajeError);
        }
    } else {
        ClaseValida(inputEmail);
        localStorage.setItem("mail", email);
        if (document.getElementById("mensajeErrorEmail")) {
            document.getElementById("mensajeErrorEmail").remove();
        }
        if (document.getElementById("mensajeErrorEmailFormato")) {
            document.getElementById("mensajeErrorEmailFormato").remove();
        }        
    }
    
    // Función para validar el formato de correo electrónico (solo "@" requerido)
    function validarFormatoEmail(email) {
        // Verificar si hay al menos un carácter antes y después del "@"
        return /^.*@.*$/.test(email);
    }
      if (nombre === "" || apellido === "" || email === ""||telefono ==="") {
        alertDanger.classList.remove('d-none'); // Quita la clase 'd-none' para mostrar la alerta        
        return;
      }
  
      // Leer la imagen seleccionada
      var imagenPerfil = "";
      if (imagenPerfilInput.files.length > 0) {
        var reader = new FileReader();
        reader.onload = function (e) {
          imagenPerfil = e.target.result;
          // Guardar en el almacenamiento local
          guardarDatosYMostrarImagen(nombre, apellido, email, telefono, imagenPerfil);
        };
        reader.readAsDataURL(imagenPerfilInput.files[0]);
      } else {
        // Si no se seleccionó una nueva imagen, solo guardar datos
        guardarDatosYMostrarImagen(nombre, apellido, email, telefono, imagenPerfil);
      }
    });
  
    // Cargar datos del almacenamiento local al cargar la página
    var storedData = localStorage.getItem("userData");
    if (storedData) {
      var parsedData = JSON.parse(storedData);
      document.getElementById("inpNombre").value = parsedData.nombre;
      document.getElementById("inpApellido").value = parsedData.apellido;
      document.getElementById("inpSegundoNombre").value = parsedData.segundoNombre;
      document.getElementById("inpSegundoApellido").value = parsedData.segundoApellido;
      document.getElementById("inpEmail").value = parsedData.email;
      document.getElementById("inpTelefono").value = parsedData.telefono;
  
      // Mostrar la imagen de perfil
      mostrarImagenPerfil(parsedData.imagenPerfil);
    }
  });
  
  // Función para guardar datos sin afectar la imagen y mostrar la imagen de perfil
function guardarDatosYMostrarImagen(nombre, apellido, email, telefono, imagenPerfil) {
    // Crear un objeto con los datos
    var userData = {
      nombre: nombre,
      apellido: apellido,
      segundoNombre: document.getElementById("inpSegundoNombre").value,
      segundoApellido: document.getElementById("inpSegundoApellido").value,
      email: email,
      telefono: telefono,
    };
  
    // Guardar en el almacenamiento local
    localStorage.setItem("userData", JSON.stringify(userData));
  
    // Informar al usuario que los cambios se han guardado correctamente.    
    var alertSuccess = document.querySelector('.alert.alert-success');
    alertSuccess.classList.remove('d-none'); // Quita la clase 'd-none' para mostrar la alerta
  
    // Mostrar la imagen de perfil si se proporciona una URL válida
    if (imagenPerfil && imagenPerfil.trim() !== "") {
      mostrarImagenPerfil(imagenPerfil);
    }
  }
  
  // Función para mostrar la imagen de perfil
  function mostrarImagenPerfil(url) {
    var imgElement = document.getElementById("imagenDePerfil");
    if (imgElement) {
      // Verificar si la URL de la imagen está presente
      if (url && url.trim() !== "") {
        imgElement.src = url;
      } else {
        // Si no hay URL, mostrar la imagen predeterminada
        imgElement.src = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp";
      }
    }
  }
  // Función para guardar datos y mostrar la imagen de perfil
  function guardarDatosYMostrarImagen(nombre, apellido, email, telefono, imagenPerfil) {
    // Crear un objeto con los datos
    var userData = {
      nombre: nombre,
      apellido: apellido,
      segundoNombre: document.getElementById("inpSegundoNombre").value,
      segundoApellido: document.getElementById("inpSegundoApellido").value,
      email: email,
      telefono: telefono,
      imagenPerfil: imagenPerfil,
    };
  
    // Guardar en el almacenamiento local
    localStorage.setItem("userData", JSON.stringify(userData));
  
    // Informar al usuario que los cambios se han guardado correctamente.    
    var alertSuccess = document.querySelector('.alert.alert-success');
    alertSuccess.classList.remove('d-none'); // Quita la clase 'd-none' para mostrar la alerta
  
    // Mostrar la imagen de perfil
    mostrarImagenPerfil(imagenPerfil);
  }
  
  // Función para mostrar la imagen de perfil
    function mostrarImagenPerfil(url) {
    var imgElement = document.getElementById("imagenDePerfil");
    if (imgElement) {
      // Verificar si la URL de la imagen está presente
      if (url && url.trim() !== "") {
        imgElement.src = url;
      } else {
        // Si no hay URL, mostrar la imagen predeterminada
        imgElement.src = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp";
      }
    }
  }
  document.addEventListener("DOMContentLoaded", function() {
    // Verificar si existe el dato "mail" en el Local Storage
    var userEmail = localStorage.getItem("mail");

    // Si no existe, redirigir a otra página o mostrar un mensaje de error
    if (!userEmail) {
        window.location.href = "login.html"; // Puedes cambiar esto por la página que desees
    }
});
