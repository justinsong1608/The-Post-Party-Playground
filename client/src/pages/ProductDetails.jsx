import './ProductDetails.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GiTabletopPlayers } from 'react-icons/gi';
import { TbArrowBackUp } from 'react-icons/tb';
import { RiStarSLine } from 'react-icons/ri';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsFillCheckCircleFill, BsTruck } from 'react-icons/bs';
import { SlSocialDropbox } from 'react-icons/sl';
import AddToCart from '../components/AddToCart';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadProduct(productId) {
      try{
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error(`fetch Error ${res.status}`);
        const product = await res.json();
        setProduct(product);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadProduct(productId);
  }, [productId]);

  if (isLoading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
      <span className="spinner-border text-secondary" role="status"></span>
    </div>
  );

  if (error) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
      <span className="text-center">Error Loading Catalog: {error.message}</span>
    </div>);

  if (!product) return null;

  const { name, imageUrl, price, description, minPlayers, maxPlayers } = product;
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="text-left">
            <Link to='/catalog' className="btn text-danger text-size">
              <TbArrowBackUp size={30} /> Back to Catalog
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="col-lg-6 product-background mx-auto mb-4">
            <img src={imageUrl} alt={name} className="product-detail-img" />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="col-lg-6 product-detail-background p-3 mx-auto mt-4">
            <h1>{name}</h1>
            <div className="red">
              <RiStarSLine size={30} /> <RiStarSLine size={30} /> <RiStarSLine size={30} /> <RiStarSLine size={30} /> <RiStarSLine size={30} />
            </div>
            <h4 className="text-dark mt-2">{`$${price}`}</h4>
            <h5><GiTabletopPlayers size={25} /> Players: {minPlayers} - {maxPlayers}</h5>
            <AddToCart />
            <hr />
            <h5><AiOutlineHeart className="red mx-1" size={40} />Add to Wishlist</h5>
            <h5 className="mt-3"><BsFillCheckCircleFill className="mx-1 green" size={40} />Free 30 Day Returns</h5>
            <h5 className="mt-3"><BsTruck className="mx-1" size={40} />Free Delivery</h5>
            <h5 className="mt-3"><SlSocialDropbox className="mx-1" size={40} />Sold and Shipped by The-Post-Party-Playground</h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mt-4 mb-4">
          <h4>Description</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
