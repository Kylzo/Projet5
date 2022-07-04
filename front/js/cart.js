//--------------------
// Fonction permettant de récpérer le panier à partir de localStorage
//--------------------
function getCart() {
  let items = [];
  if (localStorage.getItem("panier") != null) {
    items = JSON.parse(localStorage.getItem("panier"));
  }
  return items;
}
//--------------------
// Fonction qui ajoute un produit au panier présent ou non grace à la fonction add2cart
//--------------------
function add2Cart(productId, color, qty) {
  if (qty <= 0 || color == "") {
    return;
  }
  let items = getCart();
  if (items.length == 0) {
    items = [[productId, color, qty]];
  } else {
    let found = false;
    for (let i = 0; i < items.length; i++) {
      if (productId === items[i][0] && color === items[i][1]) {
        found = true;
        items[i][2] += qty;
      }
    }
    if (found == false) {
      let item = [productId, color, qty];
      items.push(item);
    }
  }
  localStorage.setItem("panier", JSON.stringify(items));
}

//--------------------
// Fonction permettant de "supprimer un item" présent dans le panier TEST
//--------------------
function deleteItem(id, color) {
  let items = getCart();
  for (i = 0; i < items.length; i++) {
    if (id === items[i][0] && color === items[i][1]) {
      items.splice(i, 1);
      localStorage.setItem("panier", JSON.stringify(items));
      window.location.reload();
    }
  }
}

//--------------------
// Fonction permettant de changer la "quantité des items" sur la page
//--------------------
function changeQuantity(id, color, qty) {
  let items = getCart();
  for (let i = 0; i < items.length; i++) {
    if (id === items[i][0] && color === items[i][1]) {
      items[i][2] = qty;
    }
    localStorage.setItem("panier", JSON.stringify(items));
    window.location.reload();
  }
}

//--------------------
// FORMULAIRE & REGEX Test
//--------------------

//--------------------
// Récupération des valeurs pour le formulaire
//--------------------

const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const ville = document.getElementById("city");
const adresse = document.getElementById("address");
const mail = document.getElementById("email");

//--------------------
// Mail
//--------------------
const emailErrorMsg = document.getElementById("emailErrorMsg");
function validateEmail(mail) {
  const regexMail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexMail.test(mail) == false) {
    return false;
  } else {
    emailErrorMsg.innerHTML = null;
    return true;
  }
}

//--------------------
// Prénom
//--------------------
const regexName = /^[a-z][a-z '-.,]{1,31}$|^$/i;
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
function validateFirstName(prenom) {
  if (regexName.test(prenom) == false) {
    return false;
  } else {
    firstNameErrorMsg.innerHTML = null;
    return true;
  }
}

//--------------------
// Nom
//--------------------
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
function validateLastName(nom) {
  if (regexName.test(nom) == false) {
    return false;
  } else {
    lastNameErrorMsg.innerHTML = null;
    return true;
  }
}

//--------------------
// Ville
//--------------------
const cityErrorMsg = document.getElementById("cityErrorMsg");
function validateCity(ville) {
  if (regexName.test(ville) == false) {
    return false;
  } else {
    cityErrorMsg.innerHTML = null;
    return true;
  }
}


//--------------------
// fonction qui genere le "contact" du formulaire, doit contenir :
// contact: {
//    firstName: string,
//    lastName: string,
//    address: string,
//    city: string,
//    email: string
//  }
//-------------------- 


function makeJsonData() {
  let contact = {
    firstName: prenom.value,
    lastName: nom.value,
    address: adresse.value,
    city: ville.value,
    email: mail.value,
  };
  let items = getCart();
  let products = [];

  for (i = 0; i < items.length; i++) {
    if (products.find((e) => e == items[i][0])) {}
    else {
      products.push(items[i][0]);
    }
  }
  let jsonData = JSON.stringify({ contact, products });
  return jsonData;
}