let item = localStorage.getItem("catID");
const URLProductos = `https://japceibal.github.io/emercado-api/cats_products/${item}.json`;

const ORDER_ASC_BY_PRICE = "$UP";
const ORDER_DESC_BY_PRICE = "$DOWN";
const ORDER_BY_PROD_REL = "Rel.";
let productsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortProductos(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL){
        result = array.sort(function(a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if ( aSoldCount > bSoldCount ){ return -1; }
            if ( aSoldCount < bSoldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

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

function sortAndShowProducts(sortCriteria, productsArray){
    //let currentSortCriteria = sortCriteria;
    //let currentProductsArray = [];
    //console.log(productsArray);
    if(productsArray != undefined){
        //currentProductsArray = productsArray;
        let currentProductsArray = sortProductos(sortCriteria, productsArray);
        insertarProductos(currentProductsArray);
    }

    //currentProductsArray = sortProductos(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    //insertarProductos(currentProductsArray);
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URLProductos).then(function(resultObj){
        
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data.products;
            insertarProductos(productsArray);
        }
    });

    document.getElementById("sortPriceAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE, productsArray);
    });

    document.getElementById("sortPriceDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE, productsArray);
    });

    document.getElementById("sortByRelevance").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_REL, productsArray);
    });
    
});