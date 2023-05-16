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
    <>
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
              {products.length > 0 &&
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <button type="button" className="checkout-button btn btn-danger mb-3" data-bs-toggle="modal" data-bs-target="#modal">Empty Cart</button>
                  <button type="button" className="checkout-button btn btn-success" onClick={checkout}>Checkout</button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalLabel">Empty your cart?</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              <p>Please don't empty the cart! Buy my board games!</p>
              <img src="https://media.tenor.com/images/746df79a484e4f71d9f7e0519ef18ef5/tenor.png" alt="Donkey Kong Mad" className="mx-auto block" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn btn-outline-danger" data-bs-dismiss="modal" onClick={emptyCart}>Empty Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
