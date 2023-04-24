export default async function addToCart(addProduct) {
    const token = localStorage.getItem('react-jwt');
    if (!token) {
      throw new Error('Please log in or create an account to have access to adding items to your Cart!')
    }
    console.log(addProduct);
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
