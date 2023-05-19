import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const tokenKey = 'react-jwt';

export default function useUserAuth() {
  const [user, setUser] = useState(null);
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    const user = token ? jwtDecode(token) : null;
    setUser(user);
    setIsAuthorizing(false);
  }, []);

  function handleSignIn(result) {
    const { user, token } = result;
    localStorage.setItem(tokenKey, token);
    setUser(user);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
  }

  return { user, isAuthorizing, handleSignIn, handleSignOut };
}
