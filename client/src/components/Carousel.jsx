import { useState, useEffect, useCallback } from 'react';
import { AiOutlineLeft, AiOutlineRight, AiOutlineStar, AiFillStar } from 'react-icons/ai';
import './Carousel.css';

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading Catalog: {error.message}</div>;

  return (
    <div>
      <h2 className="featured-products">Featured Products</h2>
      <div className="carousel-container">
        <Button onShow={handleClickPre}><AiOutlineLeft size={50} className="red" /></Button>
        <img src={products[currentIndex].img} alt={products[currentIndex].name} className="image mx-0" />
        <Button onShow={handleClickNext}><AiOutlineRight size={50} className="red" /></Button>
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
      {index === currentIndex ? <AiFillStar size={30} className="red" /> : <AiOutlineStar size={30} className="red" />}
      </Button>

  ));

  return <div>{buttons}</div>
}
