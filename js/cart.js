const URLProducto = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let productosDelCarrito = [];

function añadirProductoAlCarrito() {
  let contador = 1;
  while (localStorage.getItem(`productoDelCarrito${contador}`) !== null) {
    productosDelCarrito[contador] = localStorage.getItem(`productoDelCarrito${contador}`);
    contador += 1;
  }
}
// <h6 class="mb-0">${producto.currency} ${precio}</h6>
function mostrarCarrito() {
  let carro = "";
  productosDelCarrito.forEach(producto => {
    precio = `${producto.unitCost}`
    carro += `
          <div class="row mb-4 d-flex justify-space-evenly align-items-center">
            <div class="col-md-2 col-lg-2 col-xl-2">
              <img
                src=${producto.image}
                class="img-fluid rounded-3" alt="Cotton T-shirt">
            </div>
            <div class="col-md-2">
              <h6 class="text-muted">${producto.name}</h6>
            </div>
            <div class="col-md-2 column">
              <h6 class="mb-0">${producto.currency} ${producto.unitCost}</h6>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
              <button class="btn btn-link px-2 boton"
                onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                <i class="fas fa-minus" data-costo="${producto.unitCost}" data-id="${producto.id}" data-currency="${producto.currency}"></i>
              </button>

              <input id="cantidad${producto.id}" min="1" name="quantity" value="${producto.count}" type="number"
                class="form-control form-control-sm" />

              <button class="btn btn-link px-2 boton"
                onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                <i class="fas fa-plus" data-costo="${producto.unitCost}" data-id="${producto.id}" data-currency="${producto.currency}"></i>
              </button>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1 column">
              <h6 class="mb-0" id="subtotal${producto.id}">${producto.currency} ${producto.count * producto.unitCost}</h6>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
              <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
            </div>
          </div>
        `

    localStorage.setItem(`subtotal${producto.id}`, producto.count * producto.unitCost);
  })
  document.getElementById("carrito").innerHTML = carro;
}

function botonesInteractuables() {
  console.log("hola");
  let elementos = document.getElementsByClassName(`boton`);
  for (let elemento of elementos) {
    elemento.addEventListener("click", (element) => {
      let id = element.target.dataset.id;
      let costo = element.target.dataset.costo;
      let moneda = element.target.dataset.currency;
      let subtotal = parseInt(costo) * parseInt(document.getElementById(`cantidad${id}`).value);
      localStorage.setItem(`subtotal${id}`, subtotal);
      let ingreso = `${moneda} ${subtotal}`;
      document.getElementById(`subtotal${id}`).innerHTML = ingreso;
      insertarTotal();
    })
  };
}

function insertarTotal() {
  let totalIngresado = 0;

  productosDelCarrito.forEach(producto => {
    if (producto.currency = "USD") {
      totalIngresado += localStorage.getItem(`subtotal${producto.id}`) * 40;
    } else {
      totalIngresado += localStorage.getItem(`subtotal${producto.id}`);
    }
  })

  document.getElementById("total").innerHTML = `$ ${String(totalIngresado)}`;
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(URLProducto).then(function (resultObj) {

    if (resultObj.status === "ok") {
      productosDelCarrito[0] = resultObj.data.articles[0];
      añadirProductoAlCarrito();
      mostrarCarrito();
      insertarTotal();
      botonesInteractuables();
    }
  })

})