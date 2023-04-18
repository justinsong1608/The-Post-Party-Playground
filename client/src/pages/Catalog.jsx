import './Catalog.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Catalog() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadCatalog() {
      try{
        const res = await fetch('http://localhost:8080/api/products');
        if (!res.ok) throw new Error(`fetch Error ${res.status}`);
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading Catalog: {error.message}</div>;

  return (
    <div className='container'>
      <br />
      <h1>Catalog</h1>
      <br />
      <div className='row'>
        {products?.map((product) => (
          <div key={product.productId} className='col-12 col-md-6 col-lg-4'>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Product({ product }) {
  const { productId, name, price, minPlayers, maxPlayers, thumbUrl } = product;
  return (
    <Link to={`/details/${productId}`} className='product text-dark card mb-4 shadow-sm text-decoration-none'>
      <img src={thumbUrl} classname='image card-img-top' alt={name} />
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        <p className="card-text text-secondary">${price}</p>
        <p className="description card-text">Players: {minPlayers} - {maxPlayers}</p>
      </div>
    </Link>
  )
}
