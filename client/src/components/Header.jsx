import './componentsCSS/Header.css';
import { Link, Outlet } from 'react-router-dom';
import SearchBar from './SearchBar';
import { FaUserAstronaut, FaSignOutAlt } from 'react-icons/fa';
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
                {user &&
                  <Link to='/sign-in' className="nav-link text-nowrap" onClick={() => { handleSignOut(); handleLinkClick(); }}>
                    <FaSignOutAlt size={33} />
                    <span className="d-md-inline ms-1 fw-semibold butcherman-link">Sign Out</span>
                  </Link>
                }
                {!user &&
                  <Link to='/sign-in' className="nav-link text-nowrap" onClick={() => { handleSignOut(); handleLinkClick(); }}>
                    <FaUserAstronaut size={33} />
                    <span className="d-md-inline ms-1 fw-semibold butcherman-link">Your Account</span>
                  </Link>
                }
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
