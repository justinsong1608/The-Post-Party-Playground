export default function totalPrice(cartProducts) {
  const totalPrice = cartProducts.reduce((accumulator, currentValue) => accumulator += currentValue.price * currentValue.quantity, 0);
  return Number(totalPrice).toFixed(2);
}

export function totalQuantity(cartProducts) {
  const totalQuantity = cartProducts.reduce((accumulator, currentValue) => accumulator += currentValue.quantity, 0);
  return totalQuantity;
}
