import { useState, useEffect } from 'react';

const tokenKey = 'react-jwt';
const userKey = 'user';

export default function useUserAuth() {
  const [user, setUser] = useState(null);
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem(userKey);
    const user = userInfo ? JSON.parse(userInfo) : null;
    setUser(user);
    setIsAuthorizing(false);
  }, []);

  function handleSignIn(result) {
    const { user, token } = result;
    localStorage.setItem(tokenKey, token);
    localStorage.setItem(userKey, JSON.stringify(user));
    setUser(user);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
    setUser(undefined);
  }

  return { user, isAuthorizing, handleSignIn, handleSignOut };
}
