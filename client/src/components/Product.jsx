import { GiTabletopPlayers } from 'react-icons/gi'
import { Link } from 'react-router-dom';

export default function Product({ product }) {
  const { productId, name, price, description, minPlayers, maxPlayers, imageUrl } = product;
  return (
    <Link to={`/details/${productId}`} className="product text-dark card mb-4 shadow-sm text-decoration-none" style={{ height: '32.5rem' }}>
      <img src={imageUrl} className="catalog-img card-img-top" alt={name} />
      <hr />
      <div className="p-2">
        <h3 className="card-title">{name}</h3>
        <h5 className="card-text text-secondary">${price}</h5>
        <h6 className="description card-text"><GiTabletopPlayers size={25} /> Players: {minPlayers} - {maxPlayers}</h6>
        <p className="description card-text text-truncate">{description}</p>
      </div>
    </Link>
  )
}
