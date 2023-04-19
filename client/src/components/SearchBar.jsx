import { BsSearch } from 'react-icons/bs';

export default function SearchBar() {
  return (
    <form className="d-flex">
      <div className="input-group">
        <input className="form-control" type="search" placeholder="Search" aria-label="Search" size={50} />
        <button className="btn btn-primary" type="submit"><BsSearch size={20} /></button>
      </div>
    </form>
  );
}
