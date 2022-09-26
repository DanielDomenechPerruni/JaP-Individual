let item = localStorage.getItem("catID");
const URLProductos = `https://japceibal.github.io/emercado-api/cats_products/${item}.json`;

const ORDER_ASC_BY_PRICE = "$UP";
const ORDER_DESC_BY_PRICE = "$DOWN";
const ORDER_BY_PROD_REL = "Rel.";
let productsArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

function goToProductosInfo() {
    ;
    window.location = "product-info.html";
}

function sortProductos(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_REL) {
        result = array.sort(function (a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if (aSoldCount > bSoldCount) { return -1; }
            if (aSoldCount < bSoldCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function insertarProductos(productos) {
    let html = "";
    productos.forEach(producto => {

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(producto.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(producto.cost) <= maxPrice))) {

            html += `
            <div class="list-group-item list-group-item-action" id="${producto.id}">
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
        }
    });
    document.getElementById("lista-de-productos").innerHTML = html;
}

function sortAndShowProducts(sortCriteria, productsArray) {

    if (productsArray != undefined) {
        let currentProductsArray = sortProductos(sortCriteria, productsArray);
        insertarProductos(currentProductsArray);
    }
}

function cambioDePaginaDeProductos() {
    let elementos = document.getElementsByClassName("list-group-item");
    for (let elemento of elementos) {
        elemento.addEventListener("click", function () {
            localStorage.setItem("productId", elemento.id)
            goToProductosInfo();
        })
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(URLProductos).then(function (resultObj) {

        if (resultObj.status === "ok") {
            productsArray = resultObj.data.products;
            insertarProductos(productsArray);
            cambioDePaginaDeProductos();
        }
    });

    document.getElementById("sortPriceAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE, productsArray);
    });

    document.getElementById("sortPriceDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE, productsArray);
    });

    document.getElementById("sortByRelevance").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_REL, productsArray);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterMinPrice").value = "";
        document.getElementById("rangeFilterMaxPrice").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        insertarProductos(productsArray);
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function () {

        minPrice = document.getElementById("rangeFilterMinPrice").value;
        maxPrice = document.getElementById("rangeFilterMaxPrice").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        }
        else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        }
        else {
            maxPrice = undefined;
        }

        insertarProductos(productsArray);
    });

    document.getElementById("barraDeBusqueda").addEventListener(type = "keyup", function (e) {
        for (let elementos of document.getElementsByClassName("list-group-item")) {
            elementos.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?elementos.classList.remove("filtro")
            :elementos.classList.add("filtro")
        }  
    })



});

