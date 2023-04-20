export default function AddToCart() {
  return (
    <div className="row mt-3">
      <div className="col-sm-2">
        <div className="input-group mb-3">
          <select className="form-select text-center">
            <option selected>QTY</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
      </div>
      <div className="col-sm-6">
        <button className="btn btn-primary">Add to Cart</button>
      </div>
    </div>

  );
}
