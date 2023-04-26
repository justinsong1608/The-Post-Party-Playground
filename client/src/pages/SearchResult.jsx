import Product from "../components/Product";
import { useLocation } from 'react-router-dom';
import './SearchResult.css';


export default function SearchResult() {
  const location = useLocation();

  const searchResults = location.state;

  if (typeof searchResults === 'string') {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <span className="text-center not-found">{searchResults}</span>
      </div>
    );
  }

  return (
    <div className='container'>
      <br />
      <h1 className='butcherman-font'>Search Results</h1>
      <br />
      <div className='row mb-5'>
        {searchResults?.map((product) => (
          <div key={product.productId} className="col-12 col-md-6 col-lg-4">
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
