export default async function addToCart(addProduct) { // This function adds the product to the database //
  const token = localStorage.getItem('react-jwt');
  if (!token) {
    throw new Error('Please log in or create an account to have access to adding items to your Cart!')
  }
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(addProduct)
  });
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
}

export async function removeFromCart(removeProduct) {
  const token = localStorage.getItem('react-jwt');
  if (!token) {
    throw new Error('Please log in or create an account to have access to adding items to your Cart!')
  }
  const res = await fetch('/api/cart', {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(removeProduct)
  });
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
}

export async function updateQuantity(cartId) { // This function updates the quantity of a product that is in the cart already //
  const token = localStorage.getItem('react-jwt');
  if (!token) {
    throw new Error('Please log in or create an account to have access to adding items to your Cart!')
  }
  const res = await fetch('/api/cart', {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(cartId)
  });
  if (!res.ok){ // Throws an error that there might already be more than 3 quantity of the similar product.//
    const message = await res.text(res.body);
    throw new Error(`${message.substring(10, message.length - 2)}`);
  }
}

export async function getCart() { // This function is to see what products are in the cart so that I can check to see if I need to update or add product //
  const token = localStorage.getItem('react-jwt');
  if (!token) {
    throw new Error('Please log in or create an account to have access to adding items to your Cart!')
  }
  const res = await fetch('/api/cart', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  const products = await res.json();
  return products;
}
