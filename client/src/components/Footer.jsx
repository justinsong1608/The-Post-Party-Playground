import './Footer.css';
import { Link } from 'react-router-dom';
import { FiTwitter } from 'react-icons/fi';
import { BsFacebook, BsInstagram, BsLinkedin, BsGithub } from 'react-icons/bs';
import { FaWarehouse, FaPhoneAlt, FaFax, FaMailBulk } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="page-footer font-small gradient pt-4">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <h5 className="text-uppercase butcherman-footer-title">Social Links</h5>
            <div className="row justify-content-center">
              <div className="col-auto">
                <a className="white" target="_blank" href="http://www.facebook.com" rel="noreferrer"><BsFacebook size={25}/></a>
              </div>
              <div className="col-auto">
                <a className="white" target="_blank" href="http://www.twitter.com" rel="noreferrer"><FiTwitter size={25}/></a>
              </div>
              <div className="col-auto">
                <a className="white" target="_blank" href="http://www.instagram.com" rel="noreferrer"><BsInstagram size={25}/></a>
              </div>
              <div className="col-auto">
                <a className="white" target="_blank" href="http://www.linkedin.com/in/justinsong8" rel="noreferrer"><BsLinkedin size={25}/></a>
              </div>
              <div className="col-auto">
                <a className="white" target="_blank" href="https://github.com/justinsong1608/The-Post-Party-Playground" rel="noreferrer"><BsGithub size={25}/></a>
              </div>
              <h4 className="white mt-3">Don't Forget to Follow Us!</h4>
            </div>
          </div>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase butcherman-white">Contact</h5>
            <ul className="list-unstyled white">
              <li><p><FaWarehouse className='mx-2'/> Irvine, CA 92602, USA</p></li>
              <li><p><FaMailBulk className='mx-2' />info@example.com</p></li>
              <li><p><FaPhoneAlt className='mx-2' /> + 01 234 567 89</p></li>
              <li><p><FaFax className='mx-2' /> + 01 234 567 89</p></li>
            </ul>
          </div>

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase butcherman-white">Useful Links</h5>
            <ul className="list-unstyled">
              <li><p><Link to="/account" className="links">Account</Link></p></li>
              <li><p><Link to="/wishlist" className="links">Wishlist</Link></p></li>
              <li><p><Link to="/cart" className="links">View Cart</Link></p></li>
              <li><p><a href="https://github.com/justinsong1608/The-Post-Party-Playground" className="links">Help</a></p></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright text-center py-3">© 2020 Copyright:
        <a href="https://github.com/justinsong1608/The-Post-Party-Playground"> The Post Party PlayGround</a>
      </div>

    </footer>
  );
}
