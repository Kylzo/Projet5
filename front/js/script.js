let article = `
<a href="product.html?id=107fb5b75607497b96722bda5b504926">
          <article>
            <img src="back/images/kanap01.jpeg" alt="Lorem ipsum dolor sit amet, Kanap name1">
            <h3 class="productName">Kanap Sinopé</h3>
            <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada
              risus sapien gravida nulla nisl arcu.</p>
              <p id="products"></p>
          </article>
        </a>

`

el = document.getElementById ("items")
console.log ("123",el)

el.innerHTML = article

let url = `http://localhost:3000/api/products`
fetch (url)
.then(function(response){
    console.log ("response",response)
    return response.json()
})
.then(function(articles){
    console.log ("json",articles)    
})
.catch(function(err){
    console.log ("Une erreur est survenue", err)
})
console.log ("456")
