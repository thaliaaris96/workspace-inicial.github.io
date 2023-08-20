let mailInput = document.getElementById('Mail');
let contraseñaInput = document.getElementById('Contraseña');
let chkRecordar = document.getElementById('Recordar');
let formulario = document.querySelector('.formIngreso');


if (localStorage.getItem('recordarDatos') === 'true') {
  mailInput.value = localStorage.getItem('guardadoMail');
  contraseñaInput.value = localStorage.getItem('guardadoContraseña');
  chkRecordar.checked = true;
}


formulario.addEventListener('submit', function(event) {
  event.preventDefault(); 

  let mail = mailInput.value;
  let contraseña = contraseñaInput.value;

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
}


window.addEventListener('load', checkSession);