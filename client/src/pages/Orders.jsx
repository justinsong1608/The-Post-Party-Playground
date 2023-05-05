import './pagesCSS/Orders.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getOrders from '../lib/ordersApi';
import { getOrderContents } from '../lib/ordersApi';
import getAccount from '../lib/checkoutApi';

export default function Orders() {
  const [orders, setOrders ] = useState([]);
  const [orderContents, setOrderContents ] = useState([]);
  const [account, setAccount] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const order = await getOrders();
        setOrders(order);
        const accountInfo = await getAccount();
        setAccount(accountInfo);
        // const orderProduct = await getOrderContents();
        // setOrderContents(orderProduct);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadOrders();
  }, []);

  if (isLoading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
      <span className="spinner-border text-secondary" role="status"></span>
    </div>
  );

  if (error) return (
    <div className="d-flex justify-content-center align-items-center mb-5" style={{ height: "50vh" }}>
      <span className="text-center">
        Cannot access Orders Page: {error.message} <Link to='/sign-in'>Account</Link>
      </span>
    </div>);

  return (
    <div className="container mb-5">
      <div className="row">
          <div className="col-12">
            <h1 className="mt-4 my-cart-title">Orders</h1>
          </div>
        </div>
      <div className="accordion" id="accordionExample">
        {orders?.map((order) => (
          <Accordion order={order} account={account} key={order.orderId} />
        ))}
      </div>
    </div>
  )
}

function Accordion({ order, account }){
  const { firstName, lastName, address, city, state, zipCode, email } = account;
  const { orderId, total, status, createdAt } = order;
  // const { name, price, imageUrl, quantity } = orderContent;

  return (
    <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#" + orderId} aria-expanded="false">
        Order #{orderId}
        <span className="date"> Ordered Date: {createdAt.substring(0, 10)}</span>
      </button>
    </h2>
    <div id={orderId} className="accordion-collapse collapse">
      <div className="accordion-body row">
        <div className="col-md-6 pt-4 info">
          <p>Order Status: <span className="pending">{status}</span></p>
          <p>Total Price: <span className="complete">${total}</span></p>
        </div>
        <div className="col-md-6 text-end info">
          <p>{firstName} {lastName}</p>
          <p>{email}</p>
          <p>{address}</p>
          <p>{city}, {state} {zipCode}</p>
        </div>
        <div className="col-12">
          hello
        </div>
      </div>
    </div>
  </div>
  );
}

{/* <li className="list-group-item d-flex justify-content-between lh-condensed">
  <div>
    <h6 className="my-0">{productName}</h6>
    <small className="text-muted">{`Quantity: ${productQuantity}`}</small>
  </div>
  <span className="text-muted">{`$${price * productQuantity / 100}`}</span>
</li> */}
