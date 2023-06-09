import { GiTabletopPlayers } from 'react-icons/gi'

export default function CheckoutProducts({ product }) {
  const { name, price, description, minPlayers, maxPlayers, imageUrl, quantity } = product;

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
