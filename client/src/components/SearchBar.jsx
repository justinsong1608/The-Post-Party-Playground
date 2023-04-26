import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  async function handleSearch(event) {
    event.preventDefault();
    try {
      const res = await fetch(`/api/search?term=${searchTerm}`);
      if (!res.ok){
        const message = await res.text(res.body);
        throw new Error(`${message.substring(10, message.length - 2)}`);
      }
      const data = await res.json();
      navigate('/search', { state: data });
      setSearchTerm('');
    } catch (err) {
      navigate('/search', { state: err.message });
    }
  };

  return (
    <>
      <div className="position-relative">
        <form className="d-flex" onSubmit={handleSearch}>
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              size={50}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button className="btn btn-primary"><BsSearch size={20} /></button>
          </div>
        </form>
        {/* <div className="position-absolute bg-white w-100" style={{ top: "100%", left: "0" }}>
          <ul className="list-group">
            <li className="list-group-item">Hi</li>
            <li className="list-group-item">Beast</li>
            <li className="list-group-item">Bitch</li>
          </ul>
        </div> */}
      </div>
    </>

  );
}
