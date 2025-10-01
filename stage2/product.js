const ProductsDiscount = new WeakMap();

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  setDiscount(discount) {
    ProductsDiscount.set(this, discount);
  }

  getDiscount() {
    return ProductsDiscount.get(this) || 0;
  }
}

let product1 = new Product("product1", 1000);
let product2 = new Product("product2", 500);
let product3 = new Product("product3", 300);

product1.setDiscount(100);
product2.setDiscount(50);
product3.setDiscount(30);

console.log(ProductsDiscount.get(product1));
console.log(ProductsDiscount.get(product2));
console.log(ProductsDiscount.get(product3));

product2 = null;

console.log("after");
console.log(ProductsDiscount.get(product1));
console.log(ProductsDiscount.get(product2));
console.log(ProductsDiscount.get(product3));
