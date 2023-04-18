// import { Link, Outlet } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg blue">
        <div className="container-fluid">
          <a className="navbar-brand">The Post Party Playground</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page">Catalog</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Your Account</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Wishlist</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Your Cart</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
