let item = localStorage.getItem("productId");
const URLProducto = `https://japceibal.github.io/emercado-api/products/${item}.json`;
const URLComentarios = `https://japceibal.github.io/emercado-api/products_comments/${item}.json`;
let producto = {};
let comentario = [];

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
    html = "";
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

    document.getElementById("comentarios").innerHTML = html;
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
    
});

