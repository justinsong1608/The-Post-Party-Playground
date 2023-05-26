import './pagesCSS/Orders.css';
import Accordion from '../components/Accordion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrderContents, getOrders } from '../lib/ordersApi';

export default function Orders() {
  const [orders, setOrders ] = useState([]);
  const [orderContents, setOrderContents ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const order = await getOrders();
        setOrders(order);
        const orderProducts = await getOrderContents();
        setOrderContents(orderProducts);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadOrders();
  }, []);

  function getProductsByOrderId(orderId) {
    return orderContents.filter((product) => product.orderId === orderId);
  }

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
    </div>
  );

  return (
    <div className="container mb-5 col-md-8 col-12">
      <div className="row">
          <div className="col-12">
            <h1 className="mt-4 my-cart-title">Orders</h1>
          </div>
        </div>
      <div className="accordion" id="accordionFlushExample">
        {orders?.map((order) => (
          <Accordion order={order} key={order.orderId} orderContentsByOrderId={getProductsByOrderId(order.orderId)} />
        ))}
        {orders.length === 0 && <div className="d-flex justify-content-center align-items-center text-center mb-5 empty-cart">Go Order Some Board Games!</div>}
      </div>
    </div>
  )
}
