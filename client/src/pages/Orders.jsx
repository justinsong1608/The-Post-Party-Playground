import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getOrders from '../lib/ordersApi';
import { getOrderContents } from '../lib/ordersApi';

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
        {/* <Accordion /> */}
      </div>
    </div>
  )
}

function Accordion({ order, orderContent }){
  const { orderId, total, status, createdAt } = order;
  const { name, price, imageUrl, quantity } = orderContent;
  return (
    <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>)
}
