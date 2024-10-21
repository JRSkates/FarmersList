const { Product, Cart, Customer, Auth } = require('./index.js');

describe("Product Tests", () => {
    test('Can create instance of product class', () => {
        const carrots = new Product("Carrots", 4, "Bushel of carrots that have been freshly harvested for you", 5, 1);
        expect(carrots instanceof Product).toEqual(true);
    });

    test('Correctly sets values of name, price, description, and inStock', () => {
        const carrots = new Product("Carrots", 4, "Bushel of carrots that have been freshly harvested for you", 5, 1);
        expect(carrots.name).toEqual("Carrots");
        expect(carrots.price).toEqual(4);
        expect(carrots.description).toEqual("Bushel of carrots that have been freshly harvested for you");
        expect(carrots.inStock).toEqual(true);
    });

    test('display method returns correct string', () => {
        const carrots = new Product("Carrots", 4, "Bushel of carrots that have been freshly harvested for you", 5, 1);
        expect(carrots.display()).toEqual("Name: Carrots, Price: $4, Description: Bushel of carrots that have been freshly harvested for you");
    });
  
})

describe("Cart Tests", () => {

    test('Instance of Cart initializes with empty products array and total of 0', () => {
        const myCart = new Cart();
        expect(Array.isArray(myCart.products)).toEqual(true);
        expect(myCart.products.length).toEqual(0);
        expect(myCart.total).toEqual(0);
    });

    test('Can add products to array with addProduct', () => {
        const carrots = new Product("Carrots", 2, "Perfect for an afternoon snack", 5, 1);
        const myCart = new Cart();
        myCart.addProduct(carrots, 1);
        expect(myCart.products.length).toEqual(1);
        expect(myCart.total).toEqual(carrots.price);
    });

    test('Can remove products to array with removeProduct and total is updated', () => {
        const strawberries = new Product("Strawberries", 5, "The freshest fresas on the market", 10);
        const carrots = new Product("Carrots", 2, "Perfect for an afternoon snack", 5);
        const mangos = new Product("Mangos", 3, "The tastiest fruit you can buy", 3);
        const myCart = new Cart();
        myCart.addProduct(carrots, 1);
        myCart.addProduct(mangos, 1);
        myCart.addProduct(strawberries, 1);
        myCart.removeProduct(0);
        expect(myCart.products.length).toEqual(2);
        expect(myCart.total).toEqual(8);
    });

    test('getTotal returns the total price of items in the cart', () => {
        const carrots = new Product("Carrots", 4, "Bushel of carrots", 5);
        const apples = new Product("Apples", 3, "Fresh apples", 1);
        const myCart = new Cart();
        myCart.addProduct(carrots, 1);
        myCart.addProduct(apples, 1);
        expect(myCart.getTotal()).toEqual(7); // 4 + 3
    });
    
    test('clear method empties the cart and resets total to 0', () => {
        const carrots = new Product("Carrots", 4, "Bushel of carrots", 5);
        const myCart = new Cart();
        myCart.addProduct(carrots);
        myCart.clear();
        expect(myCart.products.length).toEqual(0);
        expect(myCart.total).toEqual(0);
    });

    test('removeItemByName removes the specified product by name', () => {
        const carrots = new Product("Carrots", 2, "Perfect for a snack", 5);
        const apples = new Product("Apples", 3, "Fresh apples", 1);
        const myCart = new Cart();
        myCart.addProduct(carrots);
        myCart.addProduct(apples);
        
        myCart.removeItemByName("Carrots");
        expect(myCart.products.length).toEqual(1);
        expect(myCart.products[0].name).toEqual("Apples");
    });

    test('addProduct checks for quantity and updates product stock', () => {
        const mangos = new Product("Mangos", 3, "Tasty mangos", 3, 5);
        const myCart = new Cart();
        
        // Add 2 Mangos to cart
        const result = myCart.addProduct(mangos, 2);
        expect(myCart.products.length).toEqual(1);
        expect(myCart.total).toEqual(6); // 3 * 2
        expect(result.quantity).toEqual(3); // Remaining quantity is 5 - 2 = 3
    
        // Try to add more Mangos than in stock
        const result2 = myCart.addProduct(mangos, 4);
        expect(result2).toEqual("I'm sorry there are only 3 of this product left.");
    });
    
})

describe("Customer Tests", () => {
    test('Can create Customer instance', () => {
        const francis = new Customer("Francis", "francis@gmail.com", "222 Main St");
    
        expect(francis instanceof Customer).toEqual(true);
    });

    test('Customer instance correctly sets property values', () => {
        const francis = new Customer("Francis", "francis@gmail.com", "222 Main St");
        expect(francis.name).toEqual("Francis");
        expect(francis.email).toEqual("francis@gmail.com");
        expect(francis.shippingAddress).toEqual("222 Main St");
        expect(Array.isArray(francis.orderHistory)).toEqual(true);
        expect(francis.orderHistory.length).toEqual(0);
    });

    test('addToOrderHistory Cart to orderHistory array', () => {
        const francis = new Customer("Francis", "francis@gmail.com", "222 Main St");
        const strawberries = new Product("Strawberries", 5, "The freshest fresas on the market", 10);
        const carrots = new Product("Carrots", 2, "Perfect for an afternoon snack", 5);
        const mangos = new Product("Mangos", 3, "The tastiest fruit you can buy", 3);
        
        const myFirstOrder = new Cart();
        myFirstOrder.addProduct(mangos);
        myFirstOrder.addProduct(carrots);
        const mySecondOrder = new Cart();
        mySecondOrder.addProduct(strawberries);
        francis.addToOrderHistory(myFirstOrder);
    
        expect(francis.orderHistory.length).toEqual(1);
        francis.addToOrderHistory(mySecondOrder);
        expect(francis.orderHistory.length).toEqual(2);
    });

    test('rewardPoints are calculated correctly based on order history', () => {
        const strawberries = new Product("Strawberries", 5, "Fresh strawberries", 10);
        const carrots = new Product("Carrots", 2, "Perfect for a snack", 5);
        
        const francis = new Customer("Francis", "francis@gmail.com", "222 Main St");
        const myOrder = new Cart();
        myOrder.addProduct(strawberries);
        myOrder.addProduct(carrots);
        francis.addToOrderHistory(myOrder);
        
        francis.getRewardPoints(); // Updates rewardPoints
        expect(francis.rewardPoints).toEqual(15); // 10 from strawberries + 5 from carrots
    });  
})

describe("Auth Tests", () => {
    test('Can create instance of Auth', () => {
        const myAuth = new Auth();
        expect(myAuth instanceof Auth).toEqual(true);
    });

    test('Auth has empty customers array when initialized', () => {
        const myAuth = new Auth();
        expect(Array.isArray(myAuth.customers)).toEqual(true);
        expect(myAuth.customers.length).toEqual(0);
    });

    test('register creates new Customer and adds it to customers array', () => {
        const myAuth = new Auth();
        myAuth.register("Kaiya", "Kaiya@example.com", '121 Main St');
        expect(myAuth.customers[0] instanceof Customer).toEqual(true);
    });

    test('login finds correct Customer in customers array', () => {
        const myAuth = new Auth();
        myAuth.register("Kaiya", "Kaiya@example.com", '121 Main St');
        myAuth.register("Nina", "Nina@example.com", '22 Broadway St');
        const result = myAuth.login("Kaiya@example.com")
        expect(result.name).toEqual("Kaiya");
    });

    test('login returns null if Customer is not in the customers array', () => {
        const myAuth = new Auth();
        myAuth.register("Kaiya", "Kaiya@example.com", '121 Main St');
        myAuth.register("Nina", "Nina@example.com", '22 Broadway St');
        const result = myAuth.login("benny@example.com")
        expect(result).toEqual(null);
    });
})