const Cart = require('./Cart.js');

class Customer {
    constructor(name, email, shippingAddress) {
        this.name = name;
        this.email = email;
        this.shippingAddress = shippingAddress;
        this.orderHistory = []
    }

    addToOrderHistory(cart) {
        if(cart instanceof Cart) {
            this.orderHistory.push(cart);
        } else {
            throw new Error("Cart must be instance of Cart");
        }
    }
}

module.exports = Customer;