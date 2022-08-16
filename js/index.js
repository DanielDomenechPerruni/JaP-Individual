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

function goToReplace () {
    let link = "login.html";
    window.location.replace(link);
  }
  
let userParams = new URLSearchParams(window.location.search)
let email = userParams.get("email");
let contrasenia = userParams.get("contrasenia");

// console.log(email);
// console.log(contrasenia);

if (email == null || contrasenia == null) {
    goToReplace()
}