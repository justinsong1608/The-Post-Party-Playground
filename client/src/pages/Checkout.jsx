import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import totalPrice from '../lib/checkout';
import { totalQuantity } from '../lib/checkout';
import { useNavigate } from 'react-router-dom';
import CheckoutProducts from '../components/CheckoutProduct';
import getAccount from '../lib/checkoutApi';
import { confirmation } from '../lib/checkoutApi';

export default function Checkout() {
  const [account, setAccount] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const checkoutProducts = location.state;

  useEffect(() => {
    async function accountInfo() {
      try {
        const info = await getAccount()
        setAccount(info);
      } catch (err) {
        console.error(err);
      }
    }
    accountInfo();
  }, []);

  async function confirmOrder() {
    try {
      const order = {
        total: totalPrice(checkoutProducts)
      };
      await confirmation(order);
      navigate('/orders');
    } catch (err) {
      console.error(err);
    }
  }

  const { firstName, lastName, address, city, state, zipCode, email } = account;
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-4 my-cart-title">Checkout</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9">
          {checkoutProducts?.map((product) => (
            <div key={product.cartId} className="mt-3 mb-5">
              <CheckoutProducts product={product} />
            </div>
          ))}
        </div>
        <div className="col-12 col-md-3 col-lg-3 mt-3 mb-5">
          <div className="checkout-blue p-3 text-center sticky-top">
            <h3>Total ({totalQuantity(checkoutProducts)} {totalQuantity(checkoutProducts) === 1 ? 'item' : 'items'}):</h3>
            <h3>${totalPrice(checkoutProducts)}</h3>
            <hr />
            <h3>Account Info:</h3>
            <p>Name: {firstName} {lastName}</p>
            <p>Email: {email}</p>
            <h3>Ship To:</h3>
            <p>{address}</p>
            <p>{city}, {state}</p>
            <p>{zipCode}</p>
            <hr />
            <div className="d-flex flex-column justify-content-center align-items-center">
              <button className="checkout-button btn btn-outline-success" onClick={confirmOrder}>Confirm Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
