import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Footer.css";
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>CONNECT WITH ME</h3>
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/saurabh-rawat-0843551a1/"
            target="_blank"
            rel="noreferrer"
          >
            <AiIcons.AiFillLinkedin className="social-link-icon" size="30" />
          </a>
          <a
            href="https://twitter.com/SaurabhDev_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiIcons.AiOutlineTwitter className="social-link-icon" size="30" />
          </a>
          <a
            href="https://github.com/learnersaura-bh/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiIcons.AiFillGithub className="social-link-icon" size="30" />
          </a>
        </div>
      </div>
      <div className="footer-section">
        <h1>PET SPOT</h1>
        <p>The Best Spot For Your Pet</p>
      </div>
      <div className="footer-section">
        <h3>QUICK LINKS</h3>
        <nav className="quick-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
        </nav>
      </div>
    </footer>
  );
};
