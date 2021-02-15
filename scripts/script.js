// Script.js

window.addEventListener('DOMContentLoaded', () => {

  var myStorage = window.localStorage;

  //checking to see how many things are in the cart initially
  if (myStorage.getItem('cartCount')) {
    document.getElementById('cart-count').textContent = myStorage.getItem('cartCount');
  }

  //populates the products
  if (myStorage.getItem('items')) {
    populateStorage(JSON.parse(myStorage.getItem('items')));
  }
  //fetches the data from the website and populates it to the webpage
  else {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        myStorage.setItem('items', JSON.stringify(data));
        populateStorage(data);
    });
  }

});


//function that populates the items saved on the local webpage
function populateStorage(items) {
  var myStorage = window.localStorage;

  items.forEach(item => {
    const thisItem = document.getElementById('product-list').appendChild(document.createElement('product-item'));

    for (key in item) {
      thisItem.setAttribute(key, item[key]);
    }

    //this is for when the user goes back to this webpage with product(s) already added to their cart
    if (myStorage.getItem(item.id)) {
      thisItem.shadowRoot.querySelector('button').innerHTML = "Remove from Cart";
      thisItem.shadowRoot.querySelector('button').setAttribute('onclick', 'alert("Removed from Cart!")')
    }

    // the structure of the products' view (UI/UX?)
    thisItem.shadowRoot.querySelector('img').setAttribute('src', item.image);
    thisItem.shadowRoot.querySelector('.title').innerHTML = item.title;
    thisItem.shadowRoot.querySelector('.price').innerHTML = item.price;
    thisItem.shadowRoot.querySelector('img').setAttribute('alt', item.title);

  })
}