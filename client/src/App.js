// import { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import Account from './pages/Account.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Cart from './pages/Cart.jsx';

function App() {
  // const [serverData, setServerData] = useState("");

  // useEffect(() => {
  //   async function getServerData() {
  //     const resp = await fetch('/api/hello');
  //     const data = await resp.json();

  //     console.log('Data from server:', data);

  //     setServerData(data.message);
  //   }

  //   getServerData();
  // }, []);

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <h1>{serverData}</h1>
  //     </header>
  //   </div>
  // );
  return (
    <Routes>
      <Route path='/' element={<Header />}>
        <Route index element={<Home />} />
        <Route path='catalog' element={<Catalog />} />
        <Route path='account' element={<Account />} />
        <Route path='wishlist' element={<Wishlist />} />
        <Route path='cart' element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default App;
