import './pagesCSS/Home.css';
import Carousel from '../components/Carousel';
import { Link } from 'react-router-dom';
import NewsLetter from '../components/NewsLetter';

export default function Home() {

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-4">
          <h5 className="title">The Post Party PlayGround</h5>
          <h1 className="bold">Why go out when you can stay home?</h1>
          <p>Welcome to our board games e-commerce store, where you can find a wide variety of exciting and entertaining board games to enjoy with your friends and family. We believe that after a long week of partying, going out to bars and clubs can be exhausting, and sometimes all you need is a relaxing evening at home. That's why we offer an extensive selection of board games that will bring hours of fun and laughter to your living room. Whether you're into strategy games, party games, or classic board games, we have something for everyone. So why go out when you can stay home and have a blast with our board games? Order now and get ready to create unforgettable memories with your loved ones!</p>
          <Link to='/catalog'>
            <button type="button" className="shop-now-button mt-1">SHOP NOW</button>
          </Link>
        </div>
        <div className="col-sm-6 mt-4">
          <Carousel />
        </div>
      </div>
      <div className="row flex">
        <div className="col-sm-12 mt-3 mb-5 center newsletter-background p-3">
          <h2 className="title">NewsLetter</h2>
          <h4>Subscribe to our newsletter!</h4>
          <NewsLetter />
        </div>
      </div>
    </div>
  );
}
