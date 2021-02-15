// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();

    var myStorage = window.localStorage;
    var add = "Add to Cart";
    var c = 'class';

    const one = this;
    const shadowRoot = this.attachShadow({ mode: 'open' });

    //do i need this anymore???
    let styleGuide = document.createElement("styleGuide");
    styleGuide.innerHTML = `
    <style>
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
    }`;
    

    const template = document.createElement('li');
    template.setAttribute(c, 'product');

    //sets up the style for the image of the product
    const image = template.appendChild(document.createElement('img'));
    image.setAttribute('width', '200');

    //sets up the style for the name of the product
    const title = template.appendChild(document.createElement('p'));
    title.setAttribute(c, 'title');

    //sets up the style for the price of the product
    const price = template.appendChild(document.createElement('p'));
    price.setAttribute(c, 'price');

    //sets up the button of the product to automatically be 'Add to Cart'
    const btn = template.appendChild(document.createElement('button'));
    btn.innerHTML = add;
    btn.setAttribute('onclick', 'alert("Added to Cart!")');

    shadowRoot.appendChild(template);

    //this is to change the product's button when clicked
    btn.addEventListener('click', function () {
    const itemsInCart = document.getElementById('cart-count');

      var counter = itemsInCart.innerHTML;
      var remove = "Remove from Cart";
  
      //changes the button's text and function to Add to Cart once the item has been removed from cart
      if (this.innerHTML === remove) {
        counter = Number(counter) - 1;
        this.innerHTML = add;
        btn.setAttribute('onclick', 'alert("Added to Cart!")');
        myStorage.setItem('cartCount', counter);
        myStorage.setItem(one.getAttribute('id'), '0');
      }

      //changes the button's text and function to Remove from Cart once the item has been added to the cart
      else {
        counter = 1 + Number(counter);
        this.innerHTML = remove;
        btn.setAttribute('onclick', 'alert("Removed from Cart!")')
        myStorage.setItem('cartCount', counter);
        myStorage.setItem(one.getAttribute('id'), '1');
      }

      itemsInCart.innerHTML = counter;

      //sometimes the cart becomes negative... has something to do with refreshing the page... otherwise, all good (prob)...
      if(counter <= 0){
        itemsInCart.innerHTML = 0;
      }
    })

    
    const el = document.createElement('link');
    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('href', './styles/styles.css');

    shadowRoot.appendChild(el);
  }

}

customElements.define('product-item', ProductItem);