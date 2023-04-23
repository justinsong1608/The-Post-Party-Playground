export default async function addToCart(event) {
  event.preventDefault();
    const token = localStorage.getItem('react-jwt');
    if (!token) {
      throw new Error('Please log in or create an account to have access to adding items to your Cart!')
    }
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      }
    });
    if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
    const product = await res.json();
    return product;
}
