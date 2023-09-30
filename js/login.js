// Obtener referencias a elementos del formulario y otros elementos de la página
let mailInput = document.getElementById('Mail');
let contraseñaInput = document.getElementById('Contraseña');
let chkRecordar = document.getElementById('Recordar');
let formulario = document.querySelector('.formIngreso');

// Verificar si se deben recordar los datos del usuario
if (localStorage.getItem('recordarDatos') === 'true') {
  mailInput.value = localStorage.getItem('guardadoMail');
  contraseñaInput.value = localStorage.getItem('guardadoContraseña');
  chkRecordar.checked = true;
};

// Agregar un evento de envío al formulario
formulario.addEventListener('submit', function(event) {
  event.preventDefault(); 

  // Obtener el correo y la contraseña ingresados por el usuario
  let mail = mailInput.value;
  let contraseña = contraseñaInput.value;
  localStorage.setItem('mail', mailInput.value);

    // Verificar si se debe recordar la sesión
  if (chkRecordar.checked) {
    
    localStorage.setItem('registro', 'true');
    localStorage.setItem('recordarDatos', 'true');
    localStorage.setItem('guardadoMail', mail);
    localStorage.setItem('guardadoContraseña', contraseña);
  } else {
    
    localStorage.removeItem('recordarDatos');
    localStorage.removeItem('guardadoMail');
    localStorage.removeItem('guardadoContraseña');
    localStorage.setItem('registro', 'true');
  }
    window.location.href = 'index.html';
});


// Función para verificar la sesión del usuario
function checkSession() {
    const loggedIn = localStorage.getItem('loggedIn');
    const isLoginPage = window.location.href.includes('login.html');

    if (!loggedIn && !isLoginPage) {
        
      // Si no está autenticado y no está en la página de inicio de sesión, redirigir a la página de inicio de sesión      
        window.location.href = 'login.html';
    } else if (loggedIn && isLoginPage) {

      // Si está autenticado y está en la página de inicio de sesión, redirigir a la página de inicio
        window.location.href = 'index.html';
    }
};

// Verificar la sesión del usuario cuando la página se carga completamente
window.addEventListener('load', checkSession);


// Referencias a elementos para el modo oscuro
const modoOscuroToggle = document.getElementById('modoOscuroToggle');
const imgModoClaro = document.getElementById('img-claro'); // Imagen de modo claro
const imgModoOscuro = document.getElementById('img-oscuro'); // Imagen de modo oscuro
const body = document.body;

// Agregar un evento de clic al interruptor del modo oscuro
const cambiarModo = () => {
  body.classList.toggle('modo-oscuro');

  // Cambiar las imágenes de modo claro y modo oscuro
  if (body.classList.contains('modo-oscuro')) {
    imgModoClaro.classList.add('d-none');
    imgModoOscuro.classList.remove('d-none');
    localStorage.setItem('modo-oscuro', 'true');//Guardado en LocalStorage
  } else {
    imgModoClaro.classList.remove('d-none');
    imgModoOscuro.classList.add('d-none');
    localStorage.setItem('modo-oscuro', 'false');//Guardado en LocalStorage
  }
};

// Escuchar el evento de clic en el toggle
modoOscuroToggle.addEventListener('click', cambiarModo);

// Verificar el modo oscuro al cargar la página
const modoOscuroGuardado = localStorage.getItem('modo-oscuro');
if (modoOscuroGuardado === 'true') {
  body.classList.add('modo-oscuro');
  imgModoClaro.classList.add('d-none');
  imgModoOscuro.classList.remove('d-none');
} else {
  body.classList.remove('modo-oscuro');
  imgModoClaro.classList.remove('d-none');
  imgModoOscuro.classList.add('d-none');
}