import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import SignUpOrSignIn from './pages/SignUpOrSignIn.jsx';
import Cart from './pages/Cart.jsx';
import ProductDeatils from './pages/ProductDetails';
import Footer from './components/Footer';
import AppContext from './components/AppContext';
import jwtDecode from 'jwt-decode';
import SearchResult from './pages/SearchResult';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AccountInfo from './pages/AccountInfo';
import { NotFound } from './pages/NotFound';

const tokenKey = 'react-jwt';

function App() {
  const [user, setUser] = useState(null);
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
    <div className="d-flex flex-column min-vh-100">
      <AppContext.Provider value={contextValue}>
        <div className="flex-grow-1">
          <Routes>
            <Route path='/' element={<Header />}>
              <Route index element={<Home />} />
              <Route path='catalog' element={<Catalog />} />
              <Route path='search' element={<SearchResult />} />
              <Route path='sign-up' element={<SignUpOrSignIn action="sign-up" />} />
              <Route path='sign-in' element={<SignUpOrSignIn action="sign-in" />} />
              <Route path='cart' element={<Cart />} />
              <Route path='details/:productId' element={<ProductDeatils />} />
              <Route path='checkout' element={<Checkout />} />
              <Route path='orders' element={<Orders />} />
              <Route path='account-info' element={<AccountInfo />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </AppContext.Provider>
    </div>
  )
}

export default App;
