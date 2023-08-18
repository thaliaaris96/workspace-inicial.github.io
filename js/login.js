let mailInput = document.getElementById('Mail');
let contraseñaInput = document.getElementById('Contraseña');
let chkRecordar = document.getElementById('Recordar');
let formulario = document.querySelector('.formIngreso');

// Cargar datos del localStorage al cargar la página
if (localStorage.getItem('recordarDatos') === 'true') {
  mailInput.value = localStorage.getItem('guardadoMail');
  contraseñaInput.value = localStorage.getItem('guardadoContraseña');
  chkRecordar.checked = true;
}

// Agregar event listener al formulario para guardar datos según el estado del checkbox
formulario.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío del formulario

  let mail = mailInput.value;
  let contraseña = contraseñaInput.value;

  if (chkRecordar.checked) {
    // Guardar datos en el localStorage
    localStorage.setItem('recordarDatos', 'true');
    localStorage.setItem('guardadoMail', mail);
    localStorage.setItem('guardadoContraseña', contraseña);
  } else {
    // Limpiar datos del localStorage
    localStorage.removeItem('recordarDatos');
    localStorage.removeItem('guardadoMail');
    localStorage.removeItem('guardadoContraseña');
  }
  
    // Redirigir al usuario a otra página
    window.location.href = 'index.html';
    
  // Continuar con el proceso de inicio de sesión o cualquier otro flujo necesario
});

/*
window.addEventListener('load', () => {
    checkAuthentication();
});

function checkAuthentication() {
    // Simulación: En un escenario real, debes verificar la autenticación aquí
    const isAuthenticated = false; // Cambia a true si el usuario está logueado

    if (!isAuthenticated) {
        window.location.href = 'login.html';
    }
} 
*/

function checkSession() {
    const loggedIn = localStorage.getItem('loggedIn');
    const isLoginPage = window.location.href.includes('login.html');

    if (!loggedIn && !isLoginPage) {
        // El usuario no tiene sesión iniciada y no estamos en la página de inicio de sesión, redirigir al formulario de inicio de sesión
        window.location.href = 'login.html';
    } else if (loggedIn && isLoginPage) {
        // El usuario tiene sesión iniciada y estamos en la página de inicio de sesión, redirigir a la página principal
        window.location.href = 'index.html';
    }
}

// Llamamos a la función al cargar la página
window.addEventListener('load', checkSession);