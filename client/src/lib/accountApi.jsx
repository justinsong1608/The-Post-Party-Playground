export async function signUpOrIn(action, formData) {
  const { username, password, firstName, lastName, email, address, state, city, zipCode } = Object.fromEntries(formData.entries());
  const req1 = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  };

  const req2 = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, firstName, lastName, email, address, state, city, zipCode })
  };

  const res = await fetch(`/api/auth/${action}`, `${action}` === 'sign-in' ? req1 : req2)
  if (!res.ok) {
    const message = await res.text(res.body)
    throw new Error(`${message.substring(10, message.length - 2)}`);
  }

  return await res.json();
}

export async function updateAccountInfo(formData) {
  const token = localStorage.getItem('react-jwt');
  if (!token) {
    throw new Error('Please log in or create an account to have access to adding items to your Cart!')
  }

  const { username, firstName, lastName, email, address, state, city, zipCode } = Object.fromEntries(formData.entries());
  const res = await fetch('/api/updateAccount', {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ username, firstName, lastName, email, address, state, city, zipCode }),
  });
  if (!res.ok) {
    const message = await res.text(res.body);
    throw new Error(`${message.substring(10, message.length - 2)}`);
  }
}
