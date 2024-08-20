const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productos = [
    {
        id: "letras-de-encastre",
        titulo: "letras de encastre",
        precio: 5000,
        img: "./assets/03.webp",
    },
    {
        id: "encastre-de-animales",
        titulo: "encastre de animales",
        precio: 10000,
        img: "./assets/01.webp",
    },
    {
        id: "bloques-apilables",
        titulo: "bloques apilables",
        precio: 15000,
        img: "./assets/02.webp",
    }
];

const contenedorProductos = document.querySelector("#productos")
const carritoVacio = document.querySelector("#carrito-vacio")
const carritoProductos = document.querySelector("#carrito-productos")
const carritoTotal = document.querySelector("#carrito-total")
const vaciarCarrito = document.querySelector("#vaciar-carrito")

productos.forEach((producto) => {

    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class="producto-img" src="${producto.img}" alt="">
        <h3>${producto.titulo}</h3>
        <p>$${producto.precio}</p>
    `;

    let button = document.createElement("button");
    button.classList.add("producto-btn");
    button.innerText = "Agregar al carrito";
    button.addEventListener("click", () => {
        agregarAlCarrito(producto);
    })

    div.append(button);
    contenedorProductos.append(div);
});

const agregarAlCarrito = (producto) => {
    let productoEnCarrito = carrito.find((item) => item.id === producto.id);
    
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }

    actualizarCarrito();

    Toastify({
        text: producto.titulo +" agregado ",
        duration: 2000,
        
        close: true,
        
        style: {
          background: "#008cff",
          color: "#000000"
        },
        
      }).showToast();
}

function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
        vaciarCarrito.classList.add("d-none")
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");
        vaciarCarrito.classList.remove("d-none")

        carritoProductos.innerHTML = "";
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h3>${producto.titulo}</h3>
                <p>$${producto.precio}</p>
                <p>${producto.cantidad}<p>
                <p>$${producto.cantidad * producto.precio}<p>
            `;

            let button = document.createElement("button");
            button.classList.add("carrito-producto-btn");
            button.innerText = "✖️";
            button.addEventListener("click", () => {
                borrarDelCarrito(producto);
            })

            div.append(button);
            carritoProductos.append(div);
        })
    }
    actualizarTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
actualizarCarrito();

function borrarDelCarrito(producto) {
    const indice = carrito.findIndex((item) => item.id === producto.id);
    carrito.splice(indice, 1);
    actualizarCarrito();
}

function actualizarTotal() {
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = "$" + total;
}

vaciarCarrito.addEventListener("click", () => {
   
    Swal.fire({
        title: "estas cuacktasticamente seguro de vaciar el carrito?",
        text: "🦆",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "si, vacialo!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "vaciado!",
            text: "tu carrito fue vaciado cuaktasticamente .",
            icon: "🦆"
          });
        }
      });

    carrito.length = 0;
    actualizarCarrito();
})

