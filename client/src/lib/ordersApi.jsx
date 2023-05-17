export async function getOrders() {
  const token = localStorage.getItem('react-jwt');
  if (!token) {
    throw new Error('Please log in or create an account to have access to adding items to your Cart!')
  }
  const res = await fetch('/api/orders', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  const orders = await res.json();
  return orders;
}

export async function getOrderContents() {
  const token = localStorage.getItem('react-jwt');
  if (!token) {
    throw new Error('Please log in or create an account to have access to adding items to your Cart!')
  }
  const res = await fetch('/api/orderContents', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  const orderContents = await res.json();
  return orderContents;
}
