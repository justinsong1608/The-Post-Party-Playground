import './pagesCSS/SearchResult.css';
import Product from "../components/Product";
import { useLocation } from 'react-router-dom';


export default function SearchResult() {
  const location = useLocation();

  const searchResults = location.state;

  if (typeof searchResults === 'string') { // Checks if it is string because the error will return a string //
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <span className="text-center not-found">{searchResults}</span>
      </div>
    );
  }

  return (
    <div className='container'>
      <br />
      <h1 className='darumadrop-font'>Search Results</h1>
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
