import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import Auth from './pages/Auth.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Cart from './pages/Cart.jsx';
import ProductDeatils from './pages/ProductDetails';
import Footer from './components/Footer';
import AppContext from './components/AppContext';
import jwtDecode from 'jwt-decode';

const tokenKey = 'react-jwt';

function App() {
  const [user, setUser] = useState();
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    const user = token ? jwtDecode(token) : null;
    setUser(user);
    setIsAuthorizing(false);
  }, []);

  if (isAuthorizing) return null;

  function handleSignIn(result) {
    const { user, token } = result;
    localStorage.setItem(tokenKey, token);
    setUser(user);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
  }

  const contextValue = { user, handleSignIn, handleSignOut };

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Home />} />
          <Route path='catalog' element={<Catalog />} />
          <Route path='sign-up' element={<Auth action="sign-up" />} />
          <Route path='sign-in' element={<Auth action="sign-in" />} />
          <Route path='wishlist' element={<Wishlist />} />
          <Route path='cart' element={<Cart />} />
          <Route path='details/:productId' element={<ProductDeatils />} />
        </Route>
      </Routes>
      <Footer />
    </AppContext.Provider>
  )
}

export default App;
