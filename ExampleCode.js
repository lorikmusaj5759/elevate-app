/* 
   Filename: ExampleCode.js
   Description: This code is a complex implementation of a customer management system
*/

class Customer {
  constructor(name, email, address, phoneNumber) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.orders = [];
  }

  addOrder(order) {
    this.orders.push(order);
  }

  getTotalOrderValue() {
    let total = 0;
    for (let i = 0; i < this.orders.length; i++) {
      total += this.orders[i].getTotalValue();
    }
    return total;
  }
}

class Order {
  constructor(orderNumber, items) {
    this.orderNumber = orderNumber;
    this.items = items;
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(item) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  getTotalValue() {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total += this.items[i].price;
    }
    return total;
  }
}

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

// Creating customers
const customer1 = new Customer("John Doe", "john@example.com", "123 Main St", "555-1234");
const customer2 = new Customer("Jane Smith", "jane@example.com", "456 Elm St", "555-5678");

// Creating items
const item1 = new Item("Item 1", 10);
const item2 = new Item("Item 2", 20);

// Creating orders
const order1 = new Order(1, [item1, item2]);
const order2 = new Order(2, [item2]);

// Adding orders to customers
customer1.addOrder(order1);
customer2.addOrder(order2);

// Calculating total order values
const totalOrderValue1 = customer1.getTotalOrderValue();
const totalOrderValue2 = customer2.getTotalOrderValue();

console.log(`Customer 1 Total Order Value: $${totalOrderValue1}`);
console.log(`Customer 2 Total Order Value: $${totalOrderValue2}`);

// More code...
// ...
// ...