function submitOrder(user) {
  let shoppingCart, zipCode;

  return OrderAPI.getShoppingCartAsync(user)
    .then(function (cart) {
      shoppingCart = cart;
      return CustomerAPI.getProfileAsync(user);
    })
    .then(function (profile) {
      zipCode = profile.zipCode;
      const shippingRate = calculateShipping(shoppingCart, zipCode);
      return OrderAPI.placeOrderAsync(shoppingCart, shippingRate);
    })
    .then(function (orderSuccessful) {
      console.log(
        `Your order ${orderSuccessful ? "was" : "was NOT"} placed successfully`
      );
    })
    .catch(function (error) {
      console.error("Something went wrong:", error);
    });
}
