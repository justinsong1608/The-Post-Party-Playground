export async function getAccount() {
  const token = localStorage.getItem('react-jwt');
  if (!token) {
    throw new Error('Please log in or create an account to have access to adding items to your Cart!')
  }
  const res = await fetch('/api/account', {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  const info = await res.json();
  return info;
}

export async function confirmation(order) {
  const token = localStorage.getItem('react-jwt');
  if (!token) {
    throw new Error('Please log in or create an account to have access to adding items to your Cart!')
  }
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(order)
  });
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
}
