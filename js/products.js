const URLProductos = "https://japceibal.github.io/emercado-api/cats_products/101.json"

function insertarProductos(productos) {
    let html = "";
    productos.forEach(producto => {
        html += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${producto.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>${producto.name} - ${producto.currency} ${producto.cost}</h4> 
                        <p>${producto.description}</p> 
                        </div>
                        <small class="text-muted">${producto.soldCount} artículos</small> 
                    </div>
                </div>
            </div>
        </div>
        `
    });
    document.getElementById("lista-de-productos").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URLProductos).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            insertarProductos(resultObj.data.products)
        }
    });
});