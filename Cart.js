const Product = require('./Product.js');

class Cart {
    constructor() {
        this.products = [];
        this.total = 0;
    }

    addProduct(product) {
        if(product instanceof Product) {
            this.products.push(product);
            this.total += product.price;
        } else {
            throw new Error("Product must be instance of Product");
        }
    }

    removeProduct(index) {
        if(index >= 0 && index < this.products.length) {
            const removedProduct = this.products.splice(index, 1)[0];
            this.total -= removedProduct.price;
        } else {
            throw new Error("Invalid index");
        }
    }
}

module.exports = Cart;