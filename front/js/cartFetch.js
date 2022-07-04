//--------------------
// Element HTML du panier
//--------------------
const cartSection = document.getElementById("cart__items");
const cartOrder = document.getElementsByClassName("cart__order");
const cartPrice = document.getElementsByClassName("cart__price");
const h1 = document.getElementsByTagName("h1");
const host = "http://localhost:3000/";
//--------------------
// Fonction qui récupère les data du backend pour remplir les propriétés des produits sur la page cart.html
//--------------------
function fetchIdData() {
    let items = getCart();
    let qty = 0;
    let price = 0;
    if (localStorage.getItem("panier") != null) {
        for (let i = 0; i < items.length; i++) {
            let id = items[i][0];
            let color = items[i][1];
            let url = host + "api/products/" + id;
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    cartSection.innerHTML += `<article class="cart__item" data-id="${id}" data-color="${color}">
                <div class="cart__item__img">
                  <img src="${data.imageUrl}" alt="${data.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${data.name}</h2>
                    <p>${color}</p>
                    <p>${data.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQuantity('${id}', '${color}', this.value)" min="1" max="100" value="${items[i][2]}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" onclick="deleteItem('${id}','${color}')">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
                    //--------------------
                    // Prix total si plus d'un item
                    //--------------------
                    price += data.price * items[i][2];
                    document.getElementById("totalPrice").innerHTML = price;
                });

            //--------------------
            // Quantité total
            //--------------------
            qty += parseInt(items[i][2]);
            document.getElementById("totalQuantity").innerHTML = qty;
        }
    } 
    //--------------------
    // Fonction "panier vide" si pas d'item TEST
    //--------------------
    else {
        h1[0].innerHTML = `Votre panier est vide`;
        cartOrder[0].innerHTML = "";
        cartPrice[0].innerHTML = "";
    }
}
fetchIdData();

//--------------------
// Fonction qui récupère les informations du client pour créer l'url de la page confirmation
//--------------------

const postUrl = host + "api/products/order/";
const orderButton = document.getElementById("order");
orderButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    //--------------------
    // Bouton "commander" non opérationnel si les condition REGEX ne sont pas respecté
    //--------------------
    let email = validateEmail(mail.value);
    let firstName = validateFirstName(prenom.value);
    let lastName = validateLastName(nom.value);
    let city = validateCity(ville.value);
    if (
        email == 0 ||
        firstName == 0 ||
        lastName == 0 ||
        city == 0
    )
    //--------------------
    // Récupération des erreurs avec Regex du cart.js & message d'erreur
    //-------------------- 
    {
        if (email == 0) {
            emailErrorMsg.innerHTML = "Entrez une adresse e-mail valide.";
        }
        if (firstName == 0) {
            firstNameErrorMsg.innerHTML = "Entrez un prénom valide sans chiffre.";
        }
        if (lastName == 0) {
            lastNameErrorMsg.innerHTML = "Entrez un nom valide sans chiffre.";
        }
        if (city == 0) {
            cityErrorMsg.innerHTML = "Entrez une commune valide sans chiffre.";
        }
        return;
    }
    let jsonData = makeJsonData();
    fetch(postUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonData,
    })
        .then((res) => res.json())

        //--------------------
        // Fonction du boutton "commander" qui envoie vers la page de confirmation avec bon de commande + id
        //--------------------        
        .then((data) => {
            localStorage.clear();
            let confirmationUrl = "confirmation.html?id=" + data.orderId;
            window.location.href = confirmationUrl;
        })
        //--------------------
        // Fonction catch avec alert si erreur
        //--------------------
        .catch(() => {
            alert("Une erreur est survenue, merci de revenir plus tard.");
        }); 
});