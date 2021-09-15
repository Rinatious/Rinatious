class Cart {
    constructor(source, container = '#cart'){
        this.source = source;
        this.container = container;
        this.countGoods = 0; // Общее кол-во товаров
        this.amount = 0; // Общая стоимость товаров
        this.cartItems = []; // Массив товаров
        this._init();
    }
    _render(){
        let $cartItemsDiv = $('<div/>', {
            class: 'cart-items-wrap'
        });
        let $totalCount = $('<div/>', {
            class: 'cart-summary sum-count'
        });
        let $totalPrice = $('<div/>', {
            class: 'cart-summary sum-price'
        });
        $(this.container).text('Корзина');
        $cartItemsDiv.appendTo($(this.container));
        $totalCount.appendTo($(this.container));
        $totalPrice.appendTo($(this.container));
    }
    _init(){
        this._render();
        fetch(this.source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents){
                    this.cartItems.push(product);
                    this._renderProduct(product);
                }
                this.amount = data.amount;
                this.countGoods = data.countGoods;
                this._renderSum();
            })
    }
    _renderProduct(product){
        let $container = $('<div/>', {
            class: 'cart-item',
            'data-product': product.id_product
        });
        $container.append($(`<p class="product-name">${product.product_name}</p>`));
        $container.append($(`<p class="product-quantity">${product.quantity}</p>`));
        $container.append($(`<p class="product-price">${product.price} руб.</p>`));
        let $btnRemove = $('<button/>', {
            class: 'btn-remove',
            text: '-'
        });
        $btnRemove.on('click', () => {
          this._remove(product.id_product);
        })
        $container.append($btnRemove);
        $container.appendTo($('.cart-items-wrap'));
    }
    _renderSum(){
        $('.sum-count').text(`Всего товаров в корзине: ${this.countGoods}`);
        $('.sum-price').text(`Всего товаров в корзине: ${this.amount}`);
    }
    _updateCart(product){
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.product-quantity').text(product.quantity);
        $container.find('.product-price').text(`${product.quantity*product.price} руб.`);
    }
    addProduct(element){
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if(find){
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                price: +$(element).data('price'),
                product_name: $(element).data('title'),
                quantity: 1
            };
            this.cartItems.push(product);
            this.amount += product.price;
            this.countGoods += product.quantity;
            this._renderProduct(product);
        }
        // console.log(element);
        this._renderSum();
    }
    _remove(productId){
        //TODO: удаление товара
        let find = this.cartItems.find(product => product.id_product === productId);
          if(find.quantity >1) {
            find.quantity--;
            this._updateCart(find);
          } else {
            this.cartItems.splice(this.cartItems.indexOf(find), 1);
            $(`div[data-product="${productId}"]`).remove();
          }
          this.countGoods--;
          this.amount -= find.price;
          this._renderSum();
        }

}
