class Product {
    constructor(id, title, price, img = 'https://placehold.it/200x150', container = '#products'){
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
        this.container = container;
        this._render();
    }
    _render(){
        let $wrapper = $('<div/>', {
            class: 'product'
        });
        let $desc = $('<div/>', {
            class: 'desc'
        });
        let $img = $('<img/>', {
            src: this.img,
            alt: 'Some img'
        });
        let $name = $('<p/>', {
            text: this.title
        });
        let $price = $(`<p>Цена: <span class="product-price">${this.price}</span></p>`);

        let $buyBtn = $('<button/>', {
            class: 'buy-btn',
            text: 'Купить',
            'data-id': this.id,
            'data-title': this.title,
            'data-price': this.price
        });

        // Создаем структуру
        $img.appendTo($wrapper);
        $name.appendTo($desc);
        $price.appendTo($desc);
        $buyBtn.appendTo($desc);
        $desc.appendTo($wrapper);
        $(this.container).append($wrapper);
    }
}