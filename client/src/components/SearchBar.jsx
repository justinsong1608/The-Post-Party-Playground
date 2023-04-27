import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './componentsCSS/SearchBar.css';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropDown, setDropDown] = useState([]);
  const navigate = useNavigate();

  async function handleSearch(event) {
    event.preventDefault();
    try {
      const res = await fetch(`/api/search?term=${searchTerm}`);
      if (!res.ok) {
        const message = await res.text(res.body);
        throw new Error(`${message.substring(10, message.length - 2)}`);
      }
      const searchedProduct = await res.json();
      navigate('/search', { state: searchedProduct });
      setSearchTerm('');
      setDropDown([]);
    } catch (err) {
      navigate('/search', { state: err.message });
    }
  };

  async function getDropDown(query) {
    try {
      const res = await fetch(`/api/search?term=${query}`);
      if (!res.ok) {
        setDropDown([]);
        throw new Error('Not Found!');
      }
      const dropDownProducts = await res.json();
      setDropDown(dropDownProducts);
    } catch (err) {
      console.error(err.message);
    }
  }

  function showDropDown(event) {
    const query = event.target.value;
    getDropDown(query);
  }

  function handleSelectDropDown(productId) {
    setDropDown([]);
    setSearchTerm('');
    navigate(`/details/${productId}`)
  }

  function handleOverlay() {
    setDropDown([]);
  }

  return (
    <>
      <div className="position-relative">
        <form className="d-flex" onSubmit={handleSearch}>
          <div className="input-group top-overlay">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              size={50}
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value)
                showDropDown(event);
              }}
            />
            <button className="btn btn-primary"><BsSearch size={20} /></button>
          </div>
        </form>
        {dropDown.length > 0 && (
          <>
            <div className="position-absolute bg-white w-100 top-overlay" style={{ top: "100%", left: "0" }}>
              <ul className="list-group">
                {dropDown.map((result) => (
                  <li className="list-group-item dark" key={result.productId}>
                    <button className="btn w-100 p-0 left border-0 shadow-none" onClick={() => handleSelectDropDown(result.productId)}>
                      {result.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="overlay" onClick={handleOverlay}></div>
          </>
        )}
      </div>
    </>
  );
}
