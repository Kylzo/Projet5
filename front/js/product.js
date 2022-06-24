const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const Url = "http://localhost:3000/api/products/" + id;

/* DOM */
let cardsFetch = function () {
    fetch(Url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            /* Image */
            let img = document.querySelector(".item__img");
            img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
            /* Nom */
            let name = document.getElementById("title");
            name.innerHTML = data.name;
            /* Prix */
            let price = document.getElementById("price");
            price.innerHTML = `${data.price}`;
            /* Description */
            let description = document.getElementById("description");
            description.innerHTML = data.description;
            /* Couleur */
            let color = document.getElementById("colors");
            for (i = 0; i < data.colors.length; i++) {
                color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
            }
        });
};
cardsFetch();

/*Obtention valeur quantité HTML*/ 
function qtyValue() {
    let qty = document.getElementById("quantity");
    return qty.value;
}

/* Obtention valeur couleur HTML */
function colorValue() {
    let color = document.getElementById("colors");
    return color.value;
}

/* Ajout au panier avec choix */
const toCartBtn = document.getElementById("addToCart");
toCartBtn.addEventListener("click", () => {
    let qty = parseInt(qtyValue());
    let color = colorValue();
    add2Cart(id, color, qty);
    backToShop.style.display = "block";
    goToCartBtn.style.display = "block";
    toCartBtn.innerHTML = `Article ajouté !`;
});

/*Ajout d'un bouton panier et retour product.html ligne 83

const goToCartBtn = document.getElementById("goToCart");
goToCartBtn.style.display = "none";
goToCartBtn.addEventListener("click", () => {
    window.location.href = "cart.html";
  });

const backToShop = document.getElementById("backToShopping");
backToShop.style.display = "none";
backToShop.addEventListener("click", () => {
    window.location.href = "index.html";
  });*/