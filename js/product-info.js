let item = localStorage.getItem("productId");
const URLProducto = `https://japceibal.github.io/emercado-api/products/${item}.json`;
const URLComentarios = `https://japceibal.github.io/emercado-api/products_comments/${item}.json`;
let comentariosIngresados = "";
// const setNuevosComentarios = localStorage.setItem(`comentariosNuevos${item}`, comentariosIngresados);
// const getNuevosComentarios = localStorage.getItem(`comentariosNuevos${item}`);
let producto = {};
let comentario = [];
let opinion = document.getElementById("opinion");
let tu_opinion = "";
let score = "";

if (localStorage.getItem(`comentariosNuevos${item}`) == null) {
    comentariosIngresados = "";
} else {
    comentariosIngresados = localStorage.getItem(`comentariosNuevos${item}`);

};


function insertarImagenes () {
    html = "";
    producto.images.forEach(element => {
        html += `
        <div><img src="${element}" alt="product image" class="img-thumbnail"></div>
        `;
    });

    document.getElementById("imagenesIlustrativas").innerHTML = html;
}

function insertarEstrellas (estrellas){
    let puntuacion = "";
    let contador = 0;
    for (let index = 0; index < estrellas; index++) {
        puntuacion += '<span class="fa fa-star checked"></span>';
        contador += 1;
    }
    if (contador < 5) {
        for (let index = contador; index < 5; index++) {
            puntuacion += '<span class="fa fa-star"></span>';
        }
    }
    
    return puntuacion;
}

function insertarComentarios () {
    let html = "";
    comentario.forEach(element => {       
        html += `
        <div class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                <div class="d-flex w-50 justify-content-between">
                    <h4>${element.user}</h4>
                    <p>${element.dateTime}</p>
                </div>
                <div>
                    ${insertarEstrellas(element.score)}
                </div>
            </div>
            <p>${element.description}</p>
        </div>
        `
    })

    if (localStorage.getItem(`comentariosNuevos${item}`) !== null) {
        html += localStorage.getItem(`comentariosNuevos${item}`);
    }
    document.getElementById("comentarios").innerHTML = html;
    console.log(localStorage.getItem(`comentariosNuevos${item}`));
}

function GuardarComentariosNuevos () {
    if (localStorage.getItem(`comentariosNuevos${item}`) !== null) {
        comentariosIngresados = localStorage.getItem(`comentariosNuevos${item}`);
        console.log("hola");
        comentariosIngresados += `
            <div class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <div class="d-flex w-50 justify-content-between">
                        <h4>${localStorage.getItem("email")}</h4>
                        <p></p>
                    </div>
                    <div>
                        ${insertarEstrellas(score)}
                    </div>
                </div>
                <p>${tu_opinion}</p>
            </div>
            `;
        localStorage.setItem(`comentariosNuevos${item}`, comentariosIngresados);
    } else {
        comentariosIngresados = ""
        comentariosIngresados += `
            <div class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <div class="d-flex w-50 justify-content-between">
                        <h4>${localStorage.getItem("email")}</h4>
                        <p></p>
                    </div>
                    <div>
                        ${insertarEstrellas(score)}
                    </div>
                </div>
                <p>${tu_opinion}</p>
            </div>
            `
        localStorage.setItem(`comentariosNuevos${item}`, comentariosIngresados);
    }
}

function insertarDatosDelProducto () {
    document.getElementById("nombre").innerHTML = `${producto.name}`;
    document.getElementById("precio").innerHTML = `${producto.currency} ${producto.cost}`;
    document.getElementById("categoria").innerHTML = `${producto.category}`;
    document.getElementById("cantidadDeVendidos").innerHTML = `${producto.soldCount}`;
    insertarImagenes();
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(URLProducto).then(function (resultObj) {

        if (resultObj.status === "ok") {
            producto = resultObj.data;
            insertarDatosDelProducto();
    }}).then(
        getJSONData(URLComentarios).then(function (resultObj) {

            if (resultObj.status === "ok") {
                comentario = resultObj.data;
                insertarComentarios();
                
        }}));

    opinion.addEventListener("submit", evento => {
        evento.preventDefault()
        if (tu_opinion.length >= 0) {
            score = document.getElementById("score").value;
            tu_opinion = document.getElementById("tu-opinion").value;
            GuardarComentariosNuevos();
            insertarComentarios();
        }
    })
})