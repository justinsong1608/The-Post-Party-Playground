export function totalPrice(cartProducts) {
  if (!cartProducts) {
    return '0.00';
  }
  const totalPrice = cartProducts.reduce((accumulator, currentValue) => accumulator += currentValue.price * currentValue.quantity, 0);
  return Number(totalPrice).toFixed(2);
}

export function totalQuantity(cartProducts) {
  if (!cartProducts) {
    return '0';
  }
  const totalQuantity = cartProducts.reduce((accumulator, currentValue) => accumulator += currentValue.quantity, 0);
  return totalQuantity;
}
