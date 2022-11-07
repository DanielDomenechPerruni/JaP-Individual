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

});

function insertarUserName(userName) {
    let html = `${userName}`;
    document.getElementById("dropdownMenuButton1").innerHTML = html;
}

function goToReplace () {
    let link = "login.html";
    window.location.replace(link);
  }

function closeSesion () {
    document.getElementById("cerrarSesion").addEventListener("click", function() {
        localStorage.removeItem('E-mail');
        goToReplace();
    })
    
}

if (localStorage.getItem('E-mail') === null || localStorage.getItem('contrasenia') === null) {
    goToReplace();
} else {
    insertarUserName(localStorage.getItem('E-mail'));
    closeSesion();
}

