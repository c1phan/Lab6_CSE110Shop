// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();

    var myStorage = window.localStorage;

    const one = this;
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const template = document.createElement('li');
    template.setAttribute('class', 'product');

    //sets up the style for the image of the product
    const img = template.appendChild(document.createElement('img'));
    img.setAttribute('width', '200');

    //sets up the style for the name of the product
    const title = template.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');

    const price = template.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');

    const button = template.appendChild(document.createElement('button'));
    button.innerHTML = "Add to Cart";
    button.setAttribute('onclick', 'alert("Added to Cart!")');
    button.addEventListener('click', function () {
    const cartCount = document.getElementById('cart-count');

      var counter = cartCount.innerHTML;
  
      //changes the button's text and function to Add to Cart once the item has been removed from cart
      if (this.innerHTML === "Remove from Cart") {
        this.innerHTML = "Add to Cart";
        counter = parseInt(counter) - 1;
        myStorage.setItem('cartCount', counter);
        myStorage.setItem(one.getAttribute('id'), 'false');
      }

      //changes the button's text and function to Remove from Cart once the item has been added to the cart
      else {
        this.innerHTML = "Remove from Cart";
        button.setAttribute('onclick', 'alert("Removed from Cart!")')
        counter = 1 + parseInt(counter);
        myStorage.setItem('cartCount', counter);
        myStorage.setItem(one.getAttribute('id'), 'true');
      }

      cartCount.innerHTML = counter;
    })

    const el = document.createElement('link');
    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('href', './styles/styles.css');

    shadowRoot.appendChild(el);
    shadowRoot.appendChild(template);
  }

}

customElements.define('product-item', ProductItem);