import { useState } from 'react';
import { useParams } from 'react-router-dom';
import addToCart from '../lib/cartApi';
// import { isProductInCart } from '../lib/cartApi';
import { useNavigate } from 'react-router-dom';

export default function AddToCartForm() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  function handleAddProduct(event) {
    event.preventDefault();
    const product = {
      productId,
      quantity
    };
    addToCart(product);
    setQuantity(1);
    navigate('/cart');
  }

  return (
    <form onSubmit={handleAddProduct}>
      <div className="row mt-3">
        <div className="col-sm-2">
          <div className="input-group mb-3">
            <select className="form-select text-center" onChange={ e => setQuantity(e.target.value)}>
              <option defaultValue={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
        </div>
        <div className="col-sm-6">
          <button className="btn btn-primary" type="submit">Add to Cart</button>
        </div>
      </div>
    </form>
  );
}
