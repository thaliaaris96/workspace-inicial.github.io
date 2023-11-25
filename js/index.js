// Evento que se ejecuta cuando el documento HTML se ha cargado completamente
document.addEventListener("DOMContentLoaded", function () {
  // Event listeners para los elementos con ID "autos", "juguetes" y "muebles"
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html"
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html"
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html"
  });
  let mmail = localStorage.getItem('mail');
  let spanM = document.getElementById('mailNB');
  if (mmail != null) {
    spanM.innerHTML = `${mmail}`;
  }
});
// Evento que se ejecuta cuando el documento HTML se ha cargado completamente
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem('registro') != 'true') {
    // Si no se ha registrado (basado en el valor en el almacenamiento local), mostrar una alerta y redirigir a "login.html"
    alert("Usted no ha iniciado sesión.")
    window.location.href = 'login.html'
  }
});

const modoOscuroToggle = document.getElementById('modoOscuroToggle');

const body = document.body

// Agregar un evento de clic al interruptor del modo oscuro
const cambiarModo = () => {
  body.classList.toggle('modo-oscuro');

  if (body.classList.contains('modo-oscuro')) {
    localStorage.setItem('modo-oscuro', 'true');//Guardado en LocalStorage
    main[0].classList.remove('bg-light');
  } else {
    localStorage.setItem('modo-oscuro', 'false');//Guardado en LocalStorage
  }
};

modoOscuroToggle.addEventListener('click', cambiarModo);

const main = document.getElementsByClassName('album py-5 bg-light')
console.log(main)

const modoOscuroGuardado = localStorage.getItem('modo-oscuro');
if (modoOscuroGuardado === 'true') {
  body.classList.add('modo-oscuro');
  main[0].classList.remove('bg-light')

} else {
  body.classList.remove('modo-oscuro');
}
