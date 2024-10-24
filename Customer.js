const Cart = require('./Cart.js');

class Customer {
    constructor(name, email, shippingAddress) {
        this.name = name;
        this.email = email;
        this.shippingAddress = shippingAddress;
        this.orderHistory = []
        this.rewardPoints = 0
    }

    addToOrderHistory(cart) {
        if(cart instanceof Cart) {
            this.orderHistory.push(cart);
        } else {
            throw new Error("Cart must be instance of Cart");
        }
    }

    getRewardPoints() {
        this.rewardPoints = 0;  // Reset reward points before calculating new ones
        
        this.orderHistory.forEach(cart => {
            cart.products.forEach(product => {
                console.log(product)
                this.rewardPoints += product.rewardPoints; 
            });
        });
    }
}

module.exports = Customer;