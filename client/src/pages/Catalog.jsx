import './Catalog.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiTabletopPlayers } from 'react-icons/gi'

export default function Catalog() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadCatalog() {
      try{
        const res = await fetch('/api/products');
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
      <h1 className='butcherman-font'>Catalog</h1>
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
  const { productId, name, price, description, minPlayers, maxPlayers, thumbUrl } = product;
  return (
    <Link to={`/details/${productId}`} className='product text-dark card mb-4 shadow-sm text-decoration-none' style={{ height: '32.5rem' }}>
      <img src={thumbUrl} className='image card-img-top' alt={name} />
      <hr />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <h5 className="card-text text-secondary">${price}</h5>
        <h6 className="description card-text"><GiTabletopPlayers size={25}/> Players: {minPlayers} - {maxPlayers}</h6>
        <p className="description card-text text-truncate">{description}</p>
      </div>
    </Link>
  )
}
