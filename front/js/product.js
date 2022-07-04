const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const host = "http://localhost:3000/";
const objectURL = host + "api/products/" + id;


//--------------------
// DOM
//--------------------


/////////
// Récupération du data dans le backend
/////////
let cardsFetch = function () {
    fetch(objectURL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // Récupération de la valeur image dans le data
            let img = document.querySelector(".item__img");
            img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
            // Récupération de la valeur nom et titre dans le data
            let name = document.getElementById("title");
            name.innerHTML = data.name;
            let title = document.querySelector("title");
            title.innerHTML = data.name;
            // Récupération de la valeur prix dans le data
            let price = document.getElementById("price");
            price.innerHTML = `${data.price}`;
            // Récupération de la valeur desctiption dans le data
            let description = document.getElementById("description");
            description.innerHTML = data.description;
            // Récupération de la valeur couleur dans le data
            let color = document.getElementById("colors");
            for (i = 0; i < data.colors.length; i++) {
                color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
            }
        });
};
cardsFetch();
//--------------------
// Récupération des valeurs dans le HTML
//--------------------


//--------------------
// Fonction pour récupérer la valeur quantité
//--------------------
function qtyValue() {
    let qty = document.getElementById("quantity");
    return qty.value;
}

//--------------------
// Fonction pour récupérer la valeur couleur
//--------------------
function colorValue() {
    let color = document.getElementById("colors");
    return color.value;
}

//------------------------
// Boutton ajout au panier
//------------------------
const toCartBtn = document.getElementById("addToCart");
toCartBtn.addEventListener("click", () => {
    let qty = parseInt(qtyValue());
    let color = colorValue();
    add2Cart(id, color, qty);

    if (qty >= 1) {
        toCartBtn.innerHTML = "Article ajouté !"
    }

    if (color >= 1) {
        toCartBtn.innerHTML = "Article ajouté !"
    }
    //-----------------------------
    // Message erreur si quantité null
    //-----------------------------
    if (qty <= 0) {
        toCartBtn.innerHTML = "Veuillez choisir une quantité !"
    }
    //----------------------------
    // Message erreur si couleur null
    //----------------------------
    if (color <= 0) {
        toCartBtn.innerHTML = "Veuillez choisir une couleur !" 
    }
});