import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScriptLoader from '../components/ScriptLoader';

const MainLayout = () => {
  useEffect(() => {
    // Remove preloader after component mounts
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.remove('is-active');
      }, 1000);
    }

    // Handle any console errors gracefully
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Filter out known harmless errors
      const message = args[0];
      if (typeof message === 'string' && message.includes('onboarding.js')) {
        // Suppress onboarding.js errors
        return;
      }
      originalConsoleError.apply(console, args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);
  return (
    <div id="app">

      <div className="preloader is-active">
        <div className="preloader__wrap">
          <img className="preloader__img" src="images/preloader.png" alt="" />
        </div>
      </div>

      <Header />
      
      <div className="app-content">
        <Outlet />
      </div>

      <Footer />

      {/* Modals */}
      {/* Quick Look Modal */}
      <div className="modal fade" id="quick-look">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal--shadow">
            <button className="btn dismiss-button fas fa-times" type="button" data-dismiss="modal"></button>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-5">
                  <div className="pd-breadcrumb u-s-m-b-30">
                    <ul className="pd-breadcrumb__list">
                      <li className="has-separator"><a href="index.hml">Home</a></li>
                      <li className="has-separator"><a href="shop-side-version-2.html">Electronics</a></li>
                      <li className="has-separator"><a href="shop-side-version-2.html">DSLR Cameras</a></li>
                      <li className="is-marked"><a href="shop-side-version-2.html">Nikon Cameras</a></li>
                    </ul>
                  </div>
                  {/* Product detail content would go here */}
                </div>
                <div className="col-lg-7">
                  {/* Product right side details would go here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Cart Modal */}
      <div className="modal fade" id="add-to-cart">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-radius modal-shadow">
            <button className="btn dismiss-button fas fa-times" type="button" data-dismiss="modal"></button>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="success u-s-m-b-30">
                    <div className="success__text-wrap">
                      <i className="fas fa-check"></i>
                      <span>Item is added successfully!</span>
                    </div>
                    <div className="success__img-wrap">
                      <img className="u-img-fluid" src="images/product/electronic/product1.jpg" alt="" />
                    </div>
                    <div className="success__info-wrap">
                      <span className="success__name">Beats Bomb Wireless Headphone</span>
                      <span className="success__quantity">Quantity: 1</span>
                      <span className="success__price">$170.00</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="s-option">
                    <span className="s-option__text">1 item (s) in your cart</span>
                    <div className="s-option__link-box">
                      <a className="s-option__link btn--e-white-brand-shadow" data-dismiss="modal">CONTINUE SHOPPING</a>
                      <a className="s-option__link btn--e-white-brand-shadow" href="cart.html">VIEW CART</a>
                      <a className="s-option__link btn--e-brand-shadow" href="checkout.html">PROCEED TO CHECKOUT</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Subscribe Modal */}
      <div className="modal fade new-l" id="newsletter-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal--shadow">
            <button className="btn new-l__dismiss fas fa-times" type="button" data-dismiss="modal"></button>
            <div className="modal-body">
              <div className="row u-s-m-x-0">
                <div className="col-lg-6 new-l__col-1 u-s-p-x-0">
                  <a className="new-l__img-wrap u-d-block" href="shop-side-version-2.html">
                    <img className="u-img-fluid u-d-block" src="images/newsletter/newsletter.jpg" alt="" />
                  </a>
                </div>
                <div className="col-lg-6 new-l__col-2">
                  <div className="new-l__section u-s-m-t-30">
                    <div className="u-s-m-b-8 new-l--center">
                      <h3 className="new-l__h3">Newsletter</h3>
                    </div>
                    <div className="u-s-m-b-30 new-l--center">
                      <p className="new-l__p1">Sign up for emails to get the scoop on new arrivals, special sales and more.</p>
                    </div>
                    <form className="new-l__form">
                      <div className="u-s-m-b-15">
                        <input className="news-l__input" type="text" placeholder="E-mail Address" />
                      </div>
                      <div className="u-s-m-b-15">
                        <button className="btn btn--e-brand-b-2" type="submit">Sign up!</button>
                      </div>
                    </form>
                    <div className="u-s-m-b-15 new-l--center">
                      <p className="new-l__p2">By Signing up, you agree to receive Reshop offers,<br />promotions and other commercial messages. You may unsubscribe at any time.</p>
                    </div>
                    <div className="u-s-m-b-15 new-l--center">
                      <a className="new-l__link" data-dismiss="modal">No Thanks</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

