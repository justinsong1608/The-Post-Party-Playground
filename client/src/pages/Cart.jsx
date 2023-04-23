import './Cart.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiTabletopPlayers } from 'react-icons/gi'

export default function Cart() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function getCart() {
      try {
        const token = localStorage.getItem('react-jwt');
        if (!token) {
          throw new Error('Please log in or create an account to have access to adding items to your Cart!')
        }
        const res = await fetch('/api/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
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
    getCart();
  }, []);

  if (isLoading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
      <span className="spinner-border text-secondary" role="status"></span>
    </div>
  );

  if (error) return (
    <div className="d-flex justify-content-center align-items-center mb-5" style={{ height: "50vh" }}>
      <span className="text-center">
        Cannot access Cart: {error.message} <Link to='/sign-in'>Account</Link>
      </span>
    </div>);

  return (
    <div>
      {products?.map((product) => (
        <div key={product.productId} className="col-12 col-md-6 col-lg-4">
          <Product product={product} />
        </div>
      ))}
    </div>
  );
}

function Product({ product }) {
  const { productId, name, price, description, minPlayers, maxPlayers, imageUrl } = product;
  return (
    <Link to={`/details/${productId}`} className="product text-dark card mb-4 shadow-sm text-decoration-none" style={{ height: '32.5rem' }}>
      <img src={imageUrl} className="catalog-img card-img-top" alt={name} />
      <hr />
      <div className="p-2">
        <h3 className="card-title">{name}</h3>
        <h5 className="card-text text-secondary">${price}</h5>
        <h6 className="description card-text"><GiTabletopPlayers size={25} /> Players: {minPlayers} - {maxPlayers}</h6>
        <p className="description card-text text-truncate">{description}</p>
      </div>
    </Link>
  )
}
