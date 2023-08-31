let mailInput = document.getElementById('Mail');
let contraseñaInput = document.getElementById('Contraseña');
let chkRecordar = document.getElementById('Recordar');
let formulario = document.querySelector('.formIngreso');


if (localStorage.getItem('recordarDatos') === 'true') {
  mailInput.value = localStorage.getItem('guardadoMail');
  contraseñaInput.value = localStorage.getItem('guardadoContraseña');
  chkRecordar.checked = true;
};


formulario.addEventListener('submit', function(event) {
  event.preventDefault(); 

  let mail = mailInput.value;
  let contraseña = contraseñaInput.value;
  localStorage.setItem('mail', mailInput.value);
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



function checkSession() {
    const loggedIn = localStorage.getItem('loggedIn');
    const isLoginPage = window.location.href.includes('login.html');

    if (!loggedIn && !isLoginPage) {
        
        window.location.href = 'login.html';
    } else if (loggedIn && isLoginPage) {
        window.location.href = 'index.html';
    }
};


window.addEventListener('load', checkSession);


//DALE NACHITOOO, METELEEEE
const modoOscuroToggle = document.getElementById('modoOscuroToggle');
const imgModoClaro = document.getElementById('img-claro'); // Imagen de modo claro
const imgModoOscuro = document.getElementById('img-oscuro'); // Imagen de modo oscuro
const body = document.body;

modoOscuroToggle.addEventListener('click', () => {
  // Cambia la clase del body para activar/desactivar el modo oscuro
  body.classList.toggle('modo-oscuro');

  // Cambia la clase d-none en las imágenes basado en el modo oscuro
  if (body.classList.contains('modo-oscuro')) {
    imgModoClaro.classList.add('d-none'); // Oculta la imagen de modo claro
    imgModoOscuro.classList.remove('d-none'); // Muestra la imagen de modo oscuro
  } else {
    imgModoClaro.classList.remove('d-none'); // Muestra la imagen de modo claro
    imgModoOscuro.classList.add('d-none'); // Oculta la imagen de modo oscuro
  }
});

// Mostrar u ocultar imagen inicialmente según el modo activo
if (body.classList.contains('modo-oscuro')) {
  imgModoClaro.classList.add('d-none'); // Oculta la imagen de modo claro
} else {
  imgModoOscuro.classList.add('d-none'); // Oculta la imagen de modo oscuro
}