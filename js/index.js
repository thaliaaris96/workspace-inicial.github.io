// Evento que se ejecuta cuando el documento HTML se ha cargado completamente
document.addEventListener("DOMContentLoaded", function(){
    // Event listeners para los elementos con ID "autos", "juguetes" y "muebles"
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    let mmail = localStorage.getItem('mail');
    let spanM = document.getElementById('mailNB');
    if (mmail != null)
    {
    spanM.innerHTML = `${mmail}`;
    }
});
// Evento que se ejecuta cuando el documento HTML se ha cargado completamente
document.addEventListener("DOMContentLoaded",function(){
    if(localStorage.getItem('registro') != 'true'){
        // Si no se ha registrado (basado en el valor en el almacenamiento local), mostrar una alerta y redirigir a "login.html"
        alert("Usted no ha iniciado sesión.")
        window.location.href = 'login.html'
    }
});