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
    fetch('https://fakestoreapi.com/products').then(resp => resp.json())
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
    const productItem = document.getElementById('product-list').appendChild(document.createElement('product-item'));

    for (key in item) {
      productItem.setAttribute(key, item[key]);
    }

    //this is for when the user goes back to this webpage with product(s) already added to their cart
    if (myStorage.getItem(item.id)) {
      productItem.shadowRoot.querySelector('button').innerHTML = "Remove from Cart";
      productItem.shadowRoot.querySelector('button').setAttribute('onclick', 'alert("Removed from Cart!")')
    }

    // the structure of the products' view (UI/UX?)
    productItem.shadowRoot.querySelector('img').setAttribute('src', item.image);
    productItem.shadowRoot.querySelector('.title').innerHTML = item.title;
    productItem.shadowRoot.querySelector('.price').innerHTML = item.price;
    productItem.shadowRoot.querySelector('img').setAttribute('alt', item.title);

  })
}