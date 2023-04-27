import './pagesCSS/Catalog.css';
import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import Product from '../components/Product';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCatalog() {
      try{
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
        const products = await res.json();
        setProducts(products);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadCatalog();
  }, []);

  if (isLoading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
      <span className="spinner-border text-secondary" role="status"></span>
    </div>
  );

  if (error) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
      <span className="text-center">Error Loading Catalog: {error.message}</span>
    </div>);

  return (
    <div className='container'>
      <br />
      <h1 className='butcherman-font'>Catalog</h1>
      <br />
      <div className='row'>
        {products?.map((product) => (
          <div key={product.productId} className="col-12 col-md-6 col-lg-4">
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
