export default async function addToCart(addProduct) {
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