document.addEventListener("DOMContentLoaded", function(){
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

document.addEventListener("DOMContentLoaded",function(){
    if(localStorage.getItem('registro') != 'true'){
        alert("Usted no ha iniciado sesión.")
        window.location.href = 'login.html'
    }
});