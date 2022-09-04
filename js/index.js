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
    let html = "";
    html += `<h4 class="nav-link" id="h4UserName">${userName}</h4>`;
    document.getElementById("userName").innerHTML = html;
}

function goToReplace () {
    let link = "login.html";
    window.location.replace(link);
  }

if (localStorage.getItem('email') === null || localStorage.getItem('contrasenia') === null) {
    goToReplace();
} else {
    insertarUserName(localStorage.getItem('email'));
}