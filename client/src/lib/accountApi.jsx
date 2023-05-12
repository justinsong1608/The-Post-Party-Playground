export async function signUpOrIn(action, username, password, firstName, lastName, email, address, state, city, zipCode) {
  const req1 = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  };

  const req2 = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, firstName, lastName, email, address, state, city, zipCode }),
  };

  const res = await fetch(`/api/auth/${action}`, `${action}` === 'sign-in' ? req1 : req2)
  if (!res.ok) {
    const message = await res.text(res.body)
    throw new Error(`${message.substring(10, message.length - 2)}`);
  }

  return await res.json();
}
