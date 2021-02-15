// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();

    //var

    const self = this;  // used in eventListener
    const shadow = this.attachShadow({ mode: 'open' });

    const list = document.createElement('li');
    list.setAttribute('class', 'product');

    const img = list.appendChild(document.createElement('img'));
    img.setAttribute('width', '200');

    const title = list.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');

    const price = list.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');

    const button = list.appendChild(document.createElement('button'));
    button.setAttribute('onclick', 'alert("Added to Cart!")');
    button.innerHTML = "Add to Cart";
    button.addEventListener('click', function () {
      const cartCount = document.getElementById('cart-count');

      if (this.innerHTML === "Add to Cart") {
        this.innerHTML = "Remove from Cart";
        button.setAttribute('onclick', 'alert("Removed from Cart!")')
        cartCount.innerHTML = parseInt(cartCount.innerHTML) + 1;
        localStorage.setItem(self.getAttribute('id'), 'true');
        localStorage.setItem('cartCount', cartCount.innerHTML);
      }
      else {
        this.innerHTML = "Add to Cart";
        cartCount.innerHTML = parseInt(cartCount.innerHTML) - 1;
        localStorage.setItem(self.getAttribute('id'), 'false');
        localStorage.setItem('cartCount', cartCount.innerHTML);
      }
    })

    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', './styles/styles.css');

    shadow.appendChild(linkElem);
    shadow.appendChild(list);
  }

}

customElements.define('product-item', ProductItem);