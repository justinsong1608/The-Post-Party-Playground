import { useContext } from 'react';
import AppContext from '../components/AppContext';
import { BsSearch } from 'react-icons/bs';

export default function SearchBar() {
  const { handleSearch, searchTerm, search } = useContext(AppContext);

  return (
    <form className="d-flex" onSubmit={handleSearch}>
      <div className="input-group">
        <input
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          size={50}
          value={searchTerm}
          onChange={(event) => search(event.target.value)} />
        <button className="btn btn-primary"><BsSearch size={20} /></button>
      </div>
    </form>
  );
}
