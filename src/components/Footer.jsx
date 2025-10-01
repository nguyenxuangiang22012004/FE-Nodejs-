import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 u-s-m-b-30">
              <div className="footer__contact">
                <h3 className="footer__title">Contact Us</h3>
                <p>4247 Ashford Drive Virginia VA-20006 USA</p>
                <p>(+0) 900 901 904</p>
                <p><a href="mailto:contact@domain.com">contact@domain.com</a></p>
                <div className="footer__social">
                  <a className="footer__social-link" href="#"><i className="fab fa-facebook-f"></i></a>
                  <a className="footer__social-link" href="#"><i className="fab fa-twitter"></i></a>
                  <a className="footer__social-link" href="#"><i className="fab fa-google-plus-g"></i></a>
                  <a className="footer__social-link" href="#"><i className="fab fa-linkedin-in"></i></a>
                  <a className="footer__social-link" href="#"><i className="fab fa-pinterest-p"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 u-s-m-b-30">
              <div className="footer__info">
                <h3 className="footer__title">Information</h3>
                <ul className="footer__info-list">
                  <li><a href="cart.html">Cart</a></li>
                  <li><a href="signin.html">Account</a></li>
                  <li><a href="#">Manufacturer</a></li>
                  <li><a href="#">Finance</a></li>
                  <li><a href="shop-side-version-2.html">Shop</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 u-s-m-b-30">
              <div className="footer__info">
                <h3 className="footer__title">Our Company</h3>
                <ul className="footer__info-list">
                  <li><a href="about.html">About us</a></li>
                  <li><a href="contact.html">Contact Us</a></li>
                  <li><a href="#">Sitemap</a></li>
                  <li><a href="#">Delivery</a></li>
                  <li><a href="#">Store</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 u-s-m-b-30">
              <div className="footer__newsletter">
                <h3 className="footer__title">Join our Newsletter</h3>
                <form className="footer__newsletter-form">
                  <div className="u-s-m-b-15">
                    <label className="gl-radio">
                      <input type="radio" name="gender" value="male" /> Male
                    </label>
                    <label className="gl-radio">
                      <input type="radio" name="gender" value="female" /> Female
                    </label>
                  </div>
                  <div className="u-s-m-b-15">
                    <input className="news-l__input" type="text" placeholder="E-mail Address" />
                  </div>
                  <div className="u-s-m-b-15">
                    <button className="btn btn--e-brand-b-2" type="submit">SUBSCRIBE</button>
                  </div>
                </form>
                <p>Subscribe to the mailing list to receive updates on promotions, new arrivals, discount and coupons.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <p>Copyright © 2018 <a href="#">Reshop</a> All Right Reserved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;