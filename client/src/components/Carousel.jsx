import { useState, useEffect, useCallback } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { RiGamepadFill, RiGamepadLine } from 'react-icons/ri';
import './Carousel.css';
import { Link } from 'react-router-dom';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const handleClickNext = useCallback(() => setCurrentIndex((currentIndex + 1) % products.length), [currentIndex, products]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleClickNext();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [handleClickNext]);

  useEffect(() => {
    async function loadCatalog() {
      try {
        const res = await fetch('/api/featuredProducts');
        if (!res.ok) throw new Error(`fetch Error ${res.status}`);
        const products = await res.json();
        setProducts(products);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadCatalog();
  }, []);

  function handleClickPre() {
    setCurrentIndex(((currentIndex - 1) + products.length) % products.length);
  }

  function handleClickDot(index) {
    setCurrentIndex(index);
  }

  if (isLoading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
      <span className="spinner-border text-secondary" role="status"></span>
    </div>
  );

  if (error) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
      <span className="text-center">Error Loading Catalog: {error.message}</span>
    </div>);

  return (
    <div>
      <h2 className="featured-products">Featured Products</h2>
      <div className="carousel-container">
        <Button onShow={handleClickPre}><AiOutlineLeft size={40} className="red" /></Button>
        <div className="d-flex justify-content-center background-carousel">
          <Link to={`/details/${products[currentIndex].productId}`}>
            <img src={products[currentIndex].img} alt={products[currentIndex].name} className="img-carousel"/>
          </Link>
        </div>
        <Button onShow={handleClickNext}><AiOutlineRight size={40} className="red" /></Button>
      </div>
      <div className="carousel-container">
        <Buttons data={products} currentIndex={currentIndex} onShow={handleClickDot} className="mx-sm-0"/>
      </div>
    </div>
  );
}

function Button({ onShow, children }) {
  return <button onClick={onShow} className='carousel-button'>{children}</button>;
}

function Buttons({ data, onShow, currentIndex }) {
  const buttons = data.map((topic, index) => (
    <Button
      key={index}
      onShow={() => onShow(index)}>
      {index === currentIndex ? <RiGamepadFill size={30} className="red" /> : <RiGamepadLine size={30} className="red" />}
      </Button>

  ));

  return <div>{buttons}</div>
}
