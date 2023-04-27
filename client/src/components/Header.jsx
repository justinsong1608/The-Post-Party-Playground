import './componentsCSS/Header.css';
import { Link, Outlet } from 'react-router-dom';
import SearchBar from './SearchBar';
import { FaUserAstronaut } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { CgGames } from 'react-icons/cg';
import ColorTitle from './ColorTitle';
import { useState, useContext } from 'react';
import AppContext from './AppContext';

export default function Header() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { user, handleSignOut } = useContext(AppContext);

  function handleLinkClick() {
    setIsCollapsed(true);
  }

  return (
    <>
      <nav className="navbar navbar-expand-xl blue top-overlay">
        <div className="container-fluid">
          <Link className="navbar-brand butcherman-title mx-auto" to='/' onClick={handleLinkClick}>
            <ColorTitle word="The Post Party Playground"/>
          </Link>
          <div className='mx-auto px-3'>
            <SearchBar />
          </div>
          <button className="navbar-toggler order-first border-0 btn-sm px-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ fontSize: '1.2rem' }} onClick={() => setIsCollapsed(!isCollapsed)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarSupportedContent" className={`collapse navbar-collapse ${isCollapsed ? 'hide' : 'show'}`}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <h7 className="nav-link dropdown-toggle butcherman-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaUserAstronaut size={33} />{user ? user.username : 'Account'}
                </h7>
                <ul className="dropdown-menu">
                  <li>
                    <Link to='/orders' className="nav-link text-nowrap">
                      <span className="d-md-inline ms-1 fw-semibold butcherman-link">Orders</span>
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider"></hr></li>
                  <li>
                    {user &&
                      <Link to='/sign-in' className="nav-link text-nowrap" onClick={() => { handleSignOut(); handleLinkClick(); }}>
                        <span className="d-md-inline ms-1 fw-semibold butcherman-link-red">Sign Out</span>
                      </Link>
                    }
                    {!user &&
                      <Link to='/sign-in' className="nav-link text-nowrap" onClick={() => { handleSignOut(); handleLinkClick(); }}>
                        <span className="d-md-inline ms-1 fw-semibold butcherman-link">Sign In</span>
                      </Link>
                    }
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to='/catalog' className="nav-link text-nowrap" onClick={handleLinkClick}>
                  <CgGames size={33} />
                  <span className="d-md-inline ms-1 fw-semibold butcherman-link">Catalog</span>
                  </Link>
              </li>
              <li className="nav-item">
                <Link to='/wishlist' className="nav-link text-nowrap" onClick={handleLinkClick}>
                  <AiFillHeart size={33} style={{ color: 'red' }} />
                  <span className="d-md-inline ms-1 fw-semibold butcherman-link">Wishlist</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/cart' className="nav-link text-nowrap" onClick={handleLinkClick}>
                  <HiOutlineShoppingCart size={33} />
                  <span className="d-md-inline ms-1 fw-semibold butcherman-link">Your Cart</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {isCollapsed ? null : <div className="overlay" onClick={handleLinkClick}></div>}
      <Outlet />
    </>
  );
}
