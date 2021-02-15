// Script.js

window.addEventListener('DOMContentLoaded', () => {

  var myStorage = window.localStorage;

  if (myStorage.getItem('items')) {
    populateStorage(JSON.parse(myStorage.getItem('items')));
  }
  else {
    fetch('https://fakestoreapi.com/products').then(resp => resp.json())
    .then(data => {
      myStorage.setItem('items', JSON.stringify(data));
      populateStorage(data);
    });
  }

  if (myStorage.getItem('cartCount')) {
    document.getElementById('cart-count').textContent = myStorage.getItem('cartCount');
  }
});

function populateStorage(items) {
  var myStorage = window.localStorage;
  console.log(items);

  items.forEach(item => {
    const productItem = document.getElementById('product-list').appendChild(document.createElement('product-item'));

    for (key in item) {
      productItem.setAttribute(key, item[key]);
    }

    if (myStorage.getItem(item.id)) {
      productItem.shadowRoot.querySelector('button').innerHTML = "Remove from Cart";
    }
    else{
      cart = [];
      productItem.shadowRoot.querySelector('button').innerHTML = "Add to Cart";
    }

    // the structure of the products
    productItem.shadowRoot.querySelector('img').setAttribute('src', item.image);
    productItem.shadowRoot.querySelector('.title').innerHTML = item.title;
    productItem.shadowRoot.querySelector('.price').innerHTML = item.price;
    productItem.shadowRoot.querySelector('img').setAttribute('alt', item.title);

  })
}