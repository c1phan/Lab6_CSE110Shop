// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();

    var myStorage = window.localStorage;
    var add = "Add to Cart";
    var c = 'class';

    const one = this;
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const template = document.createElement('li');
    template.setAttribute(c, 'product');

    //sets up the style for the image of the product
    const img = template.appendChild(document.createElement('img'));
    img.setAttribute('width', '200');

    //sets up the style for the name of the product
    const title = template.appendChild(document.createElement('p'));
    title.setAttribute(c, 'title');

    const price = template.appendChild(document.createElement('p'));
    price.setAttribute(c, 'price');

    const button = template.appendChild(document.createElement('button'));
    button.innerHTML = add;
    button.setAttribute('onclick', 'alert("Added to Cart!")');

    button.addEventListener('click', function () {
    const itemsInCart = document.getElementById('cart-count');

      var counter = itemsInCart.innerHTML;
      var remove = "Remove from Cart";
  
      //changes the button's text and function to Add to Cart once the item has been removed from cart
      if (this.innerHTML === remove) {
        this.innerHTML = add;
        button.setAttribute('onclick', 'alert("Added to Cart!")');
        counter = Number(counter) - 1;
        myStorage.setItem('cartCount', counter);
        myStorage.setItem(one.getAttribute('id'), 'false');
      }

      //changes the button's text and function to Remove from Cart once the item has been added to the cart
      else {
        this.innerHTML = remove;
        button.setAttribute('onclick', 'alert("Removed from Cart!")')
        counter = 1 + Number(counter);
        myStorage.setItem('cartCount', counter);
        myStorage.setItem(one.getAttribute('id'), 'true');
      }

      itemsInCart.innerHTML = counter;

      if(counter <= 0){
        itemsInCart.innerHTML = 0;
      }
    })

    const el = document.createElement('link');
    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('href', './styles/styles.css');

    shadowRoot.appendChild(el);
    shadowRoot.appendChild(template);
  }

}

customElements.define('product-item', ProductItem);