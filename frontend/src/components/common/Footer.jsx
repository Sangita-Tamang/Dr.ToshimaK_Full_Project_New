import { Link } from 'react-router-dom';
import { NAV_LINKS, SOCIAL_LINKS } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <h2>Dr. Toshima Karki</h2>
            <p>Dedicated to building a healthier, stronger and more prosperous Nepal through leadership and service.</p>
            <div className="footer-socials">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              {NAV_LINKS.slice(0, 4).map(link => (
                <li key={link.path}><Link to={link.path}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-links">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/media">Speeches & Media</Link></li>
              <li><Link to="/contact?type=internship">Internship</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h3>Newsletter</h3>
            <p>Stay updated with my latest work and announcements.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Dr. Toshima Karki. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
