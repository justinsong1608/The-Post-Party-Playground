import Product from "../components/Product";
import { useContext } from 'react';
import AppContext from '../components/AppContext';

export default function SearchResult() {
  const { searchResults } = useContext(AppContext);

  return (
    <div className='row'>
        {searchResults?.map((product) => (
          <div key={product.productId} className="col-12 col-md-6 col-lg-4">
            <Product product={product} />
          </div>
        ))}
      </div>
  );
}
