// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();


    this.title = product['title'];
    this.price = product['price'];
    this.description = product['description'];
    this.category = product['category'];
    this.img = product['image'];
    this.id = product['id'];

    var cart;
    var myStorage = window.localStorage;
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }
      
      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }
      
      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }
      
      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }
      
      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }
      
      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }
    
      <li class="product">
      <img src="${json_data["image"]}", width=200></img>
      <p class="title">${json_data["title"]}</p>
      <p class="price">${json_data["price"]}</p>
      <button class="cart_button">Add to Cart</button>
      </li>
    `;
    
    if('cartKey' in myStorage) {
      cart = JSON.parse(myStorage.getItem('cartKey'));
      if(cart.includes(this.id)) {
        this.button.innerHTML = "Remove from Cart";
      }
      else{
        this.button.innerHTML = "Add to Cart";
      }
    }

    this.button.onclick = function() {
      if(this.button.innerHTML == "Remove from Cart"){
        this.editCart('remove', this.id);
        this.button.onclick = "alert('Added to Cart!)";
        this.button.innerHTML = "Add to Cart";
      }
      else{
        this.editCart('add', this.id);
        this.button.onclick = "alert('Removed from Cart!)";
        this.button.innerHTML = "Remove from Cart";
      }
    };
  }  

    editCart(edit, id) {
      var productInCart = document.getElementById('productCount');
      var productCount = Number(productInCart.innerHTML);
      var myStorage = window.localStorage;
      var cart;

      if('cartKey' in myStorage) {
        console.log('og cart: ' + myStorage.getItem('cartKey'));
        cart = JSON.parse(myStorage.getItem('cartKey'));
      }
      else{
        cart = [];
      }

      if(edit == 'remove'){
        productInCart.innerHTML = productCount + 1;
        cart.push(this.id);
        myStorage.setItem('cartKey', JSON.stringify(cart));
        console.log('New cart: ' + myStorage.getItem('cartKey'));
      }
      else{
        productCount.innerHTML = productCount - 1;
        const i = cart.indexOf(this.id);
        if(index > -1) {
          cart.splice(index, 1);
        }
        myStorage.setItem('cartKey', JSON.stringify(cart));
        console.log('New cart: ' + myStorage.getItem('cartKey'));
      }
    }
}

customElements.define('product-item', ProductItem);