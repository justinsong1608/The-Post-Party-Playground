import './Header.css';
import { Link, Outlet } from 'react-router-dom';
import SearchBar from './SearchBar';
import { FaUserAstronaut } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { CgGames } from 'react-icons/cg';
import colorTitle from './ColorTitle';

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-xl blue">
        <div className="container-fluid">
          <Link className="navbar-brand butcherman-title mx-auto" to='/'>{colorTitle('The Post Party Playground')}</Link>
          <div className='mx-auto px-3'>
            <SearchBar />
          </div>
          <button className="navbar-toggler order-first border-0 btn-sm px-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ fontSize: '1.2rem' }}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/catalog' className="nav-link text-nowrap">
                  <CgGames size={33} />
                  <span className="d-md-inline ms-2 fw-semibold butcherman-link">Catalog</span>
                  </Link>
              </li>
              <li className="nav-item">
                <Link to='/account' className="nav-link text-nowrap">
                  <FaUserAstronaut size={33} />
                  <span className="d-md-inline ms-2 fw-semibold butcherman-link">Your Account</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/wishlist' className="nav-link text-nowrap">
                  <AiFillHeart size={33} style={{color: 'red'}}/>
                  <span className="d-md-inline ms-2 fw-semibold butcherman-link">Wishlist</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/cart' className="nav-link text-nowrap">
                  <HiOutlineShoppingCart size={33} />
                  <span className="d-md-inline ms-2 fw-semibold butcherman-link">Your Cart</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
