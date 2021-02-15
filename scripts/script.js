// Script.js

window.addEventListener('DOMContentLoaded', () => {

  var myStorage = window.localStorage;

  if (myStorage.getItem('products')) {
    populateStorage(JSON.parse(myStorage.getItem('products')));
  }
  else {
    fetch('https://fakestoreapi.com/products').then(resp => resp.json())
    .then(data => {
      myStorage.setItem('products', JSON.stringify(data));
      populateStorage(data);
    });
  }

  if (myStorage.getItem('cartCount')) {
    document.getElementById('cart-count').textContent = myStorage.getItem('cartCount');
  }
});

function populateStorage(products) {
  var myStorage = window.localStorage;
  console.log(products);

  products.forEach(product => {
    const productItem = document.getElementById('product-list').appendChild(document.createElement('product-item'));

    for (key in product) {
      productItem.setAttribute(key, product[key]);
    }

    if (myStorage.getItem(product.id)) {
      productItem.shadowRoot.querySelector('button').innerHTML = "Remove from cart";
    }

    // the structure of the products
    productItem.shadowRoot.querySelector('img').setAttribute('src', product.image);
    productItem.shadowRoot.querySelector('.title').innerHTML = product.title;
    productItem.shadowRoot.querySelector('.price').innerHTML = product.price;
    productItem.shadowRoot.querySelector('img').setAttribute('alt', product.title);

  })
}