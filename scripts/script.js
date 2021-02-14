// Script.js

window.addEventListener('DOMContentLoaded', () => {
  
  myStorage = window.localStorage;

  //fetches data if it is not within local storage
  if(!localStorage.getItem('products')) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        console.log("inside fetch if" + data);
        localStorage.setItem('products', JSON.stringify(data));
        populateStorage(data);
      });
  }
  //reads through the response.json() file if data is already on local storage
  else{
    response.json().then(data => {
      Body.blob();
      console.log("blob:" + Body.blob());
      populateStorage(data);
    });
  }
});


//method that sets up the style for each element in the array
function populateStorage(products) {
  console.log(products);
  products.forEach(product => {
    const productItem = document.getElementById('product-list').appendChild(document.createElement('product-item'));

    for(key in product) {
      productItem.setAttribute(key, product[key]);
    }
  })
}
