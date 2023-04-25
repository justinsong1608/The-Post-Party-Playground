import { useState } from 'react';
import { useParams } from 'react-router-dom';
import addToCart from '../lib/cartApi';
import { useNavigate } from 'react-router-dom';
import { getCart, updateQuantity } from '../lib/cartApi';

export default function AddToCartForm() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState();
  const navigate = useNavigate();

  async function handleAddProduct(event) {
    try {
      event.preventDefault();
      const product = {
        productId,
        quantity
      };
      const cartProducts = await getCart();
      const findProductInCart = cartProducts.filter(item => item.productId === Number(product.productId));
      if (findProductInCart.length === 0) {
        await addToCart(product);
        setQuantity(1);
        navigate('/cart');
      } else {
        const updateProduct = {
          cartId: findProductInCart[0].cartId,
          quantity: (Number(quantity) + findProductInCart[0].quantity),
        };
        await updateQuantity(updateProduct);
        setQuantity(1);
        navigate('/cart');
      }
    } catch (err) {
      setError(err);
    }

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
        {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
      </div>
    </form>
  );
}
