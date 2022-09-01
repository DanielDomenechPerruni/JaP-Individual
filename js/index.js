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

    // function goToReplace () {
    //     let link = "login.html";
    //     window.location.replace(link);
    //   }
      
    // let userParams = new URLSearchParams(window.location.search)
    // let email = userParams.get("email");
    // let contrasenia = userParams.get("contrasenia");
    
    // // console.log(email);
    // // console.log(contrasenia);
    
    // if (email == null || contrasenia == null) {
    //     goToReplace()
    // }
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
  
let userParams = new URLSearchParams(window.location.search)
let email = userParams.get("email");
let contrasenia = userParams.get("contrasenia");
// localStorage.setItem('email', email);
// let emailUserName = localStorage.getItem('email');
// localStorage.setItem('contrasenia', contrasenia);
// let contraseniaUser = localStorage.getItem('contrasenia');

// console.log(email);
// console.log(contrasenia);
// console.log(emailUserName);
// console.log(contraseniaUser);
// console.log(((email == null || contrasenia == null) && (emailUserName == null || contraseniaUser == null)));
// console.log((email == null || contrasenia == null));
// console.log((emailUserName == null || contraseniaUser == null));
// console.log(contraseniaUser == null);

if ((email == null || contrasenia == null) && (localStorage.getItem('email') === "null" || localStorage.getItem('contrasenia') === "null")) {
    goToReplace()
} else if (localStorage.getItem('email') === "null" || localStorage.getItem('contrasenia') === "null"){
    localStorage.setItem('email', email);
    //let emailUserName = localStorage.getItem('email');
    localStorage.setItem('contrasenia', contrasenia);
    // let contraseniaUser = localStorage.getItem('contrasenia');
    insertarUserName(email ?? localStorage.getItem('email'));
} else {
    insertarUserName(email ?? localStorage.getItem('email'));
}



