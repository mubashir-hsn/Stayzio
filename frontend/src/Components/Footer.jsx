import React from "react";
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="bg-white text-dark mt-5 bottom-0">
      <div className="container py-5">
        <div className="row">
          {/* About Section */}
          <div className="col-md-6 mb-3 px-2 px-md-5">
            <h4 className="text-uppercase mb-3" style={{color:"#24befa" , fontWeight:"bold"}}>About Stayzio</h4>
            <p>
              Stayzio is your go-to platform for insightful blogs, sharing ideas,
              and exploring diverse topics. Join our community and stay inspired!
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-3 mb-3">
            <h4 className="text-uppercase mb-3" style={{color:"#24befa" , fontWeight:"bold"}}>Quick Links</h4>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-dark text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-dark text-decoration-none">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacypolicy" className="text-dark text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-3 mb-3">
            <h4 className="text-uppercase mb-3" style={{color:"#24befa" , fontWeight:"bold"}}>Contact Us</h4>
            <p>
              <b>Email: </b> <a href="#" className="text-dark text-decoration-none">support@stayzio.com</a>
            </p>
            <p><b>Phone: </b> +1 234 567 890</p>
          </div>
        </div>

      </div>
        <div className="text-center py-4  border-top border-1">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Stayzio. All Rights Reserved.
          </p>
        </div>
    </footer>
  );
};

export default Footer;
