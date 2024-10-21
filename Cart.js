const Product = require('./Product.js');

class Cart {
    constructor() {
        this.products = [];
        this.total = 0;
    }

    addProduct(product, quantity) {
        if(product instanceof Product) {
            if (product.quantity < quantity) {
                return `I'm sorry there are only ${product.quantity} of this product left.`;
            }

            this.products.push(product);

            this.total += product.price * quantity;

            product.quantity -= quantity;

            if (product.quantity === 0) {
                product.inStock = false;
            }

            return product;
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

    getTotal() {
        return this.total;
    }

    clear() {
        this.products = [];
        this.total = 0;
    }

    removeItemByName(name) {
        this.products.forEach(product => {
            if(product.name === name) {
                this.removeProduct(this.products.indexOf(product));
            }
        })
    }
}

module.exports = Cart;