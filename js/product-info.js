let item = localStorage.getItem("productId");
const URLProducto = `https://japceibal.github.io/emercado-api/products/${item}.json`;
let producto = {};

function insertarImagenes () {
    html = "";
    producto.images.forEach(element => {
        html += `
        <div><img src="${element}" alt=""></div>
        `;
    });

    document.getElementById("imagenesIlustrativas").innerHTML = html;
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
    }});

});

