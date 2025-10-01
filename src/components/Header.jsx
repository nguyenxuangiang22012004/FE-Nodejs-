import React from 'react';

const Header = () => {
  return (
    <header className="header--style-1">
      {/* Nav 1 */}
      <nav className="primary-nav primary-nav-wrapper--border">
        <div className="container">
          <div className="primary-nav">
            {/* Main Logo */}
            <a className="main-logo" href="index.html">
              <img src="images/logo/logo-1.png" alt="" />
            </a>

            {/* Search Form */}
            <form className="main-form">
              <label htmlFor="main-search"></label>
              <input 
                className="input-text input-text--border-radius input-text--style-1" 
                type="text" 
                id="main-search" 
                placeholder="Search" 
              />
              <button className="btn btn--icon fas fa-search main-search-button" type="submit"></button>
            </form>

            {/* Dropdown Main plugin */}
            <div className="menu-init" id="navigation">
              <button className="btn btn--icon toggle-button toggle-button--secondary fas fa-cogs" type="button"></button>

              <div className="ah-lg-mode">
                <span className="ah-close">✕ Close</span>

                <ul className="ah-list ah-list--design1 ah-list--link-color-secondary">
                  <li className="has-dropdown" data-tooltip="tooltip" data-placement="left" title="Account">
                    <a><i className="far fa-user-circle"></i></a>
                    <span className="js-menu-toggle"></span>
                    <ul style={{width: '120px'}}>
                      <li>
                        <a href="dashboard.html">
                          <i className="fas fa-user-circle u-s-m-r-6"></i>
                          <span>Account</span>
                        </a>
                      </li>
                      <li>
                        <a href="signup.html">
                          <i className="fas fa-user-plus u-s-m-r-6"></i>
                          <span>Signup</span>
                        </a>
                      </li>
                      <li>
                        <a href="signin.html">
                          <i className="fas fa-lock u-s-m-r-6"></i>
                          <span>Signin</span>
                        </a>
                      </li>
                      <li>
                        <a href="signup.html">
                          <i className="fas fa-lock-open u-s-m-r-6"></i>
                          <span>Signout</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="has-dropdown" data-tooltip="tooltip" data-placement="left" title="Settings">
                    <a><i className="fas fa-user-cog"></i></a>
                    <span className="js-menu-toggle"></span>
                    <ul style={{width: '120px'}}>
                      <li className="has-dropdown has-dropdown--ul-right-100">
                        <a>Language<i className="fas fa-angle-down u-s-m-l-6"></i></a>
                        <span className="js-menu-toggle"></span>
                        <ul style={{width: '120px'}}>
                          <li><a className="u-c-brand">ENGLISH</a></li>
                          <li><a>ARABIC</a></li>
                          <li><a>FRANCAIS</a></li>
                          <li><a>ESPANOL</a></li>
                        </ul>
                      </li>
                      <li className="has-dropdown has-dropdown--ul-right-100">
                        <a>Currency<i className="fas fa-angle-down u-s-m-l-6"></i></a>
                        <span className="js-menu-toggle"></span>
                        <ul style={{width: '225px'}}>
                          <li><a className="u-c-brand">$ - US DOLLAR</a></li>
                          <li><a>£ - BRITISH POUND STERLING</a></li>
                          <li><a>€ - EURO</a></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li data-tooltip="tooltip" data-placement="left" title="Contact">
                    <a href="tel:+0900901904"><i className="fas fa-phone-volume"></i></a>
                  </li>
                  <li data-tooltip="tooltip" data-placement="left" title="Mail">
                    <a href="mailto:contact@domain.com"><i className="far fa-envelope"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Nav 2 */}
      <nav className="secondary-nav-wrapper">
        <div className="container">
          <div className="secondary-nav">
            {/* Categories Menu */}
            <div className="menu-init" id="navigation1">
              <button className="btn btn--icon toggle-mega-text toggle-button" type="button">M</button>
              <div className="ah-lg-mode">
                <span className="ah-close">✕ Close</span>
                <ul className="ah-list">
                  <li className="has-dropdown">
                    <span className="mega-text">M</span>
                    <span className="js-menu-toggle"></span>
                    <div className="mega-menu">
                      <div className="mega-menu-wrap">
                        <div className="mega-menu-list">
                          <ul>
                            <li className="js-active">
                              <a href="shop-side-version-2.html">
                                <i className="fas fa-tv u-s-m-r-6"></i>
                                <span>Electronics</span>
                              </a>
                              <span className="js-menu-toggle js-toggle-mark"></span>
                            </li>
                            <li>
                              <a href="shop-side-version-2.html">
                                <i className="fas fa-female u-s-m-r-6"></i>
                                <span>Women's Clothing</span>
                              </a>
                              <span className="js-menu-toggle"></span>
                            </li>
                            <li>
                              <a href="shop-side-version-2.html">
                                <i className="fas fa-male u-s-m-r-6"></i>
                                <span>Men's Clothing</span>
                              </a>
                              <span className="js-menu-toggle"></span>
                            </li>
                          </ul>
                        </div>
                        {/* Mega menu content would go here */}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="menu-init" id="navigation2">
              <button className="btn btn--icon toggle-button toggle-button--secondary fas fa-cog" type="button"></button>
              <div className="ah-lg-mode">
                <span className="ah-close">✕ Close</span>
                <ul className="ah-list ah-list--design2 ah-list--link-color-secondary">
                  <li><a href="shop-side-version-2.html">NEW ARRIVALS</a></li>
                  <li><a href="shop-side-version-2.html">VALUE OF THE DAY</a></li>
                  <li><a href="shop-side-version-2.html">GIFT CARDS</a></li>
                </ul>
              </div>
            </div>

            {/* Shopping Cart */}
            <div className="menu-init" id="navigation3">
              <button className="btn btn--icon toggle-button toggle-button--secondary fas fa-shopping-bag toggle-button-shop" type="button"></button>
              <span className="total-item-round">2</span>
              <div className="ah-lg-mode">
                <span className="ah-close">✕ Close</span>
                <ul className="ah-list ah-list--design1 ah-list--link-color-secondary">
                  <li><a href="index.html"><i className="fas fa-home u-c-brand"></i></a></li>
                  <li><a href="wishlist.html"><i className="far fa-heart"></i></a></li>
                  <li className="has-dropdown">
                    <a className="mini-cart-shop-link">
                      <i className="fas fa-shopping-bag"></i>
                      <span className="total-item-round">2</span>
                    </a>
                    <span className="js-menu-toggle"></span>
                    <div className="mini-cart">
                      {/* Mini cart content */}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;