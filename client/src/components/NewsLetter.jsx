import { FaMailchimp } from 'react-icons/fa';
import './NewsLetter.css';

export default function NewsLetter() {
  return (
    <form className="d-flex">
      <div className="input-group center">
        <input className="form-control-md input" type="email" placeholder="Email" aria-label="Email" size={20} />
        <button className="btn btn-primary" type="submit"><FaMailchimp size={20} /></button>
      </div>
    </form>
  );
}