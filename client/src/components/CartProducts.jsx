import { GiTabletopPlayers } from 'react-icons/gi'
import { useState } from 'react';
import { updateQuantity } from '../lib/cartApi';
import { removeFromCart } from '../lib/cartApi';

export default function CartProducts({ product, update, updateTotal }) {
  const { name, price, description, minPlayers, maxPlayers, imageUrl, quantity, cartId } = product;
  const [cartQuantity, setCartQuantity ] = useState(quantity);

  async function handleRemoveProduct(event) {
    event.preventDefault();
    const removeProduct = {
      cartId
    };
    await removeFromCart(removeProduct);
    update(cartId);
  };

  async function updateCartQuantity(event) {
    setCartQuantity(Number(event.target.value))
    const updateProduct = {
      cartId,
      quantity: Number(event.target.value)
    };
    await updateQuantity(updateProduct);
    updateTotal();
  }

  const quantityValue = () => {
    const options = [];
    for (let i = 1; i <= 5; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

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
              {/* <p>{`Quantity: ${quantity}`}</p> */}
              <select className="form-select text-center" style={{cursor: 'pointer'}} value={cartQuantity} onChange={updateCartQuantity}>
                {quantityValue()}
              </select>
              <div className="mt-3 float-end">
                <button className="btn btn-outline-danger my-2 my-sm-0" onClick={handleRemoveProduct}>Remove from cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
