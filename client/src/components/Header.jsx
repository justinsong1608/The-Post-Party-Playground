import './Header.css';
import { Link, Outlet } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg blue">
        <div className="container-fluid">
          <Link className="navbar-brand butcherman-font" to='/'>{colorTitle('The Post Party Playground')}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/catalog' className="nav-link">Catalog</Link>
              </li>
              <li className="nav-item">
                <Link to='/account' className="nav-link">Your Account</Link>
              </li>
              <li className="nav-item">
                <Link to='/wishlist' className="nav-link">Wishlist</Link>
              </li>
              <li className="nav-item">
                <Link to='/cart' className="nav-link">Your Cart</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

// This function adds different colors for each individual letter in a word. //
function colorTitle(word) {
  const titleWithSpace = word.split('');
  const title = titleWithSpace.filter(function (str) {
    return /\S/.test(str);
  });

  let fixedKey = 0; //This is when I add back the spaces. The spaces need keys that are unique.//
  const titleWithColor = title.map((letter, index) => {
      fixedKey++;
      return (<span key={index} className={`butcherman-${index % 7 + 1}`}>{letter}</span>);
  });

  // Add spaces back to the title
  for (let i = 0; i < titleWithSpace.length; i++) {
    if (titleWithSpace[i] === ' ') {
      titleWithColor.splice(i, 0, <span key={fixedKey}> </span>); //fixedKey is a unique number that increments from the previous key //
      fixedKey++;
    }
  }

  return (<div>{titleWithColor}</div>);
}
