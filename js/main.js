
const productContainer = document.getElementById("product-container")
productContainer.className = "productContainer"
const itemC = document.createElement("div")
itemC.className = itemC
const buttonCart = document.createElement("button")
buttonCart.innerText = "Mi carrito"
productContainer.append(buttonCart)
buttonCart.addEventListener("click", () =>{
    Swal.fire({
        title: "Cargando tus productos!",
        html: "Esto tardara unos segundos...",
        timer: 2000,
        timerProgressBar: true,
        }) 
setTimeout(() => {
    const myCart = document.createElement("h3")
    myCart.innerText = "Estos son tus productos"
    productContainer.append(myCart)
    cart.forEach(el => createCardCart(el))
},3000)
})
function productCreator(producto){
    const container = document.getElementById("container")
    container.className = "contenedor"
    const item = document.createElement("div")
    item.className = "item"
    const nombreProducto = document.createElement("h3")
    nombreProducto.innerText = producto.prenda
    const precio = document.createElement("p")
    precio.innerText = "$ " + producto.precio
    const image = document.createElement("img")
    image.src = producto.Image
    image.className = "img"
    const button1 = document.createElement("button")
    button1.innerText = "Añadir al carrito"
    const mensajeConfirm = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
            confirmButton: "botonConfirmar",
            cancelButton: "btn btn-danger"
            },
    });
        swalWithBootstrapButtons.fire({
        title: "¿DESEA AGREGAR ESTE PRODUCTO AL CARRITO?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "NO",
            confirmButtonText: "SI!",
        }).then((result) => {
            if (result.isConfirmed) {
                cartAdd(producto)
                swalWithBootstrapButtons.fire({
                title: mensajeFinal,
                icon: "success"
            });
            } else if (
            result.dismiss === Swal.DismissReason.cancel
            ) {
            swalWithBootstrapButtons.fire({
                title: "NO AGREGASTE ESTE PRODUCTO A TU CARRITO",
                icon: "error"
            });
            }
        })
    }
    const mensajeFinal = `    Añadiste ${producto.prenda} al carrito. 
    Para ver los productos que agregaste usa el botón:
    MI CARRITO `
    button1.addEventListener("click", () => mensajeConfirm())
    item.append(image)
    item.append(nombreProducto)
    item.append(precio)
    item.append(button1)
    container.append(item)
    }
    fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(el => {
            productCreator(el);
    })
    });   
    let cart = JSON.parse(localStorage.getItem("cart")) || []
function cartAdd(producto){
    if(cart.some(el => el.id === producto.id)){
        const indexProduct = cart.findIndex (el => el.id === producto.id)
        cart[indexProduct].cantidad += 1;
    } else{
        const newItem = {
            id: producto.id,
            prenda: producto.prenda,
            precio: producto.precio,
            cantidad: 1,
        };
        cart.push(newItem);
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    actualizaCart()
}
const cartCountElement = document.getElementById("cartCount")
function actualizaCart(){
    const cart = JSON.parse(localStorage.getItem("cart"));
    const count = cart.reduce((acum, current) => acum+current.cantidad,0 );
    cartCountElement.innerText = count
}
actualizaCart()

function createCardCart(producto){
    const productContainer = document.getElementById("product-container")
    productContainer.className = "productContainer"
    const itemC = document.createElement("div")
    itemC.className = itemC
    const nameCart = document.createElement("h4")
    nameCart.innerText = producto.prenda
    const cantidadCart = document.createElement("h4")
    cantidadCart.innerText =  producto.cantidad
    const priceCart = document.createElement("p")
    priceCart.innerText = "$" + producto.precio
    itemC.append(nameCart)
    itemC.append(priceCart)
    productContainer.append(itemC) 
}




