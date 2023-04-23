import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function AddToCartForm() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  // onSubmit = {}
  return (
    <form>
      <div className="row mt-3">
        <div className="col-sm-2">
          <div className="input-group mb-3">
            <select className="form-select text-center">
              <option selected>1</option>
              <option>2</option>
              <option>3</option>
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
