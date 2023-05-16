import OrderList from "./OrderList";

export default function Accordion({ order, orderContentsByOrderId }) {
  const { orderId, total, status, createdAt, firstName, lastName, address, city, state, zipCode, email } = order;

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#" + orderId} aria-expanded="false">
          Order #{orderId}
          <span className="date"> Ordered Date: {createdAt.substring(0, 10)}</span>
        </button>
      </h2>
      <div id={orderId} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
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
          <ul className="col-12">
            {orderContentsByOrderId?.map((content) => (
              <OrderList contents={content} key={content.orderContentsId} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
