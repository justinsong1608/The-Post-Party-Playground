import './App.css';
import { Routes, Route } from 'react-router-dom';
import AppContext from './components/AppContext';
import useUserAuth from './lib/useUserAuth';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import Auth from './pages/Auth';
import Cart from './pages/Cart.jsx';
import ProductDeatils from './pages/ProductDetails';
import SearchResult from './pages/SearchResult';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AccountInfo from './pages/AccountInfo';
import NotFound from './pages/NotFound';

function App() {
  const { user, isAuthorizing, handleSignIn, handleSignOut } = useUserAuth();

  if (isAuthorizing) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
      <span className="spinner-border text-secondary" role="status"></span>
    </div>
  );

  const contextValue = { user, handleSignIn, handleSignOut };

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppContext.Provider value={contextValue}>
        <div className="flex-grow-1">
          <Routes>
            <Route path='/' element={<NavBar />}>
              <Route index element={<Home />} />
              <Route path='catalog' element={<Catalog />} />
              <Route path='search' element={<SearchResult />} />
              <Route path='sign-up' element={<Auth action="sign-up" />} />
              <Route path='sign-in' element={<Auth action="sign-in" />} />
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
