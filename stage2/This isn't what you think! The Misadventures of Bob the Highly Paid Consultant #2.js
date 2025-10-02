ShoppingCart.prototype.addButtonClicked = function (item) {
  this.checkQuantityAsync(item, this.addButtonClicked1.bind(this));
};

ShoppingCart.prototype.addButtonClicked1 = function ({ item, quantity }) {
  if (quantity > 0) {
    this.addToCartAsync(item, 1, (...params) =>
      this.addButtonClicked2(...params)
    );
  }
};

ShoppingCart.prototype.addButtonClicked2 = function (success) {
  if (success) {
    const context = this;
    this.updateCartDisplayAsync(function () {
      context.addButtonClicked3.apply(context, arguments);
    });
  }
};

ShoppingCart.prototype.addButtonClicked3 = function (success) {
  this.showMessage(
    `${success ? "Successfully" : "Unsuccessfully"} added item to cart`
  );
};
