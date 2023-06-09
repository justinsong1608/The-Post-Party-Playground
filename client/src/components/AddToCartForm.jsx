import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addToCart, getCart, updateQuantity } from '../lib/cartApi';

export default function AddToCartForm() {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();

  async function handleAddProduct(event) {
    event.preventDefault();
    try {
      const product = {
        productId,
        quantity
      };
      const cartProducts = await getCart();
      const findProductInCart = cartProducts.filter(item => item.productId === Number(product.productId));
      if (findProductInCart.length === 0) {
        await addToCart(product);
      } else {
        const updateProduct = {
          cartId: findProductInCart[0].cartId,
          quantity: (Number(quantity) + findProductInCart[0].quantity),
        };
        await updateQuantity(updateProduct);
      }
      setQuantity(1);
      navigate('/cart');
    } catch (err) {
      setError(err);
    }
  }

  const quantityOptions = () => {
    const options = [];
    for (let i = 1; i <= 5; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  return (
    <form onSubmit={handleAddProduct}>
      <div className="row mt-3">
        <div className="col-sm-3">
          <div className="input-group mb-3">
            <select className="form-select text-center" style={{cursor: 'pointer'}} onChange={ e => setQuantity(e.target.value)}>
              {quantityOptions()}
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
