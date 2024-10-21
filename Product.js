class Product {
    constructor(name, price, description, rewardPoints, quantity=1) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.inStock = true;
        this.rewardPoints = rewardPoints;
        this.quantity = quantity;
        this.inStock = true;
    }

    display() {
        return `Name: ${this.name}, Price: $${this.price}, Description: ${this.description}`;
    }
}

module.exports = Product;