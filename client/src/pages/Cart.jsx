import './Cart.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiTabletopPlayers } from 'react-icons/gi'
import { removeFromCart } from '../lib/cartApi';
import totalPrice from '../lib/checkout';
import { totalQuantity } from '../lib/checkout';

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

  function updateCart(cartId) {
    const updatedProducts = products.filter(p => p.cartId !== cartId);
    setProducts(updatedProducts);
  }

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
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-4 my-cart-title">Your Cart</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9">
          {products?.map((product) => (
            <div key={product.cartId} className="mt-3 mb-5">
              <CartProducts product={product} update={updateCart} />
            </div>
          ))}
        </div>
        <div className="col-12 col-md-3 col-lg-3 mt-3 mb-5">
          <div className="checkout-blue p-3 text-center">
            <h3>Subtotal ({totalQuantity(products)} {totalQuantity(products) === 1 ? 'item' : 'items'}):</h3>
            <h3>${totalPrice(products)}</h3>
            <hr />
            <div className="d-flex flex-column justify-content-center align-items-center">
              <button className="checkout-button btn btn-danger mb-3">Empty Cart</button>
              <button className="checkout-button btn btn-success">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartProducts({ product, update }) {
  const { name, price, description, minPlayers, maxPlayers, imageUrl, quantity, cartId } = product;

  function handleRemoveProduct(event) {
    event.preventDefault();
    const removeProduct = {
      cartId
    };
    removeFromCart(removeProduct);
    update(cartId)
  };

  return (
    <div className="container">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-12 col-md-5 mb-3 mb-md-0">
              <img src={imageUrl} alt={name} className="cartImage img-fluid mx-auto" />
            </div>
            <div className="col-12 col-md-7">
              <h2>{name}</h2>
              <h5 className="text-secondary">${price}</h5>
              <p className="description card-text text-truncate">{description}</p>
              <h6 className="description card-text"><GiTabletopPlayers size={25} /> Players: {minPlayers} - {maxPlayers}</h6>
              <p>{`Quantity: ${quantity}`}</p>
              <button className="btn btn-outline-danger my-2 my-sm-0" onClick={handleRemoveProduct}>Remove from cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
