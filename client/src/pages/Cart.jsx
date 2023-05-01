import './pagesCSS/Cart.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../lib/cartApi';
import totalPrice from '../lib/checkout';
import { totalQuantity } from '../lib/checkout';
import { getCart } from '../lib/cartApi';
import CartProducts from '../components/CartProducts';

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function readCart() {
      try {
        const cartProducts = await getCart()
        setProducts(cartProducts);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    readCart();
  }, []);

  function updateCart(cartId) {
    const updatedProducts = products.filter(p => p.cartId !== cartId);
    setProducts(updatedProducts);
  }

  function emptyCart() {
    products.map(product => removeFromCart(product));
    setProducts([]);
  }

  function checkout() {
    navigate('/checkout', { state: products });
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
          {products.length === 0 && <div className="d-flex justify-content-center align-items-center mb-5 empty-cart">Your cart is empty!</div>}
        </div>
        <div className="col-12 col-md-3 col-lg-3 mt-3 mb-5">
          <div className="checkout-blue p-3 text-center">
            <h3>Subtotal ({totalQuantity(products)} {totalQuantity(products) === 1 ? 'item' : 'items'}):</h3>
            <h3>${totalPrice(products)}</h3>
            <hr />
            <div className="d-flex flex-column justify-content-center align-items-center">
              <button className="checkout-button btn btn-danger mb-3" onClick={emptyCart}>Empty Cart</button>
              <button className="checkout-button btn btn-success" onClick={checkout}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
