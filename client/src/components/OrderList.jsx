export default function OrderList({ contents }) {
  const { name, price, imageUrl, quantity } = contents;
  return (
    <>
      <hr />
      <li className="list-group-item d-flex justify-content-between lh-condensed">
        <div className="d-flex align-items-center">
          <img src={imageUrl} alt={name} id="orderImage" />
          <div className="ms-2">
            <h6 className="my-0">{name}</h6>
            <small className="text-muted">{`Quantity: ${quantity}`}</small>
          </div>
        </div>
        <span className="text-muted">${price}</span>
      </li>
    </>
  );
}
