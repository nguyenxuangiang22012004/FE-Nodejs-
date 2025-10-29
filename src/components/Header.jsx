import React, { useEffect, useState } from "react";
import { logout } from '../services/AuthService';
import { useNavigate, Link } from 'react-router-dom';
const Header = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const safeParseUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser || storedUser === "undefined") return null;
        return JSON.parse(storedUser);
      } catch (err) {
        console.error("Lỗi parse user từ localStorage:", err);
        localStorage.removeItem("user"); // dọn lỗi
        return null;
      }
    };

    setUser(safeParseUser());

    const handleAuthChange = () => {
      setUser(safeParseUser());
    };

    window.addEventListener("auth-changed", handleAuthChange);
    return () => window.removeEventListener("auth-changed", handleAuthChange);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header--style-1">
      {/* Nav 1 */}
      <nav className="primary-nav primary-nav-wrapper--border">
        <div className="container">
          <div className="primary-nav">
            {/* Main Logo */}
            <a className="main-logo" href="index.html">
              <img src="images/logo/logo-1.png" alt="Ludus" />
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
                  <li
                    className="has-dropdown"
                    data-tooltip="tooltip"
                    data-placement="left"
                    title="Account"
                  >
                    <a>
                      <i className="far fa-user-circle"></i>
                      {/* 👇 Hiển thị tên người dùng ngay bên cạnh icon */}
                      {user && (
                        <span style={{ marginLeft: "8px", fontWeight: "500" }}>
                          {user.lastName || user.email}
                        </span>
                      )}
                    </a>
                    <span className="js-menu-toggle"></span>

                    {user ? (
                      <ul style={{ width: "140px" }}>
                        <li>
                          <Link to="/dashboard/dash-my-profile">
                            <i className="fas fa-user-circle u-s-m-r-6"></i>
                            <span>{"Profile"}</span>
                          </Link>
                        </li>
                        <li>
                          <a onClick={handleLogout}>
                            <i className="fas fa-lock-open u-s-m-r-6"></i>
                            <span>Signout</span>
                          </a>
                        </li>
                      </ul>
                    ) : (
                      <ul style={{ width: "120px" }}>
                        <li>
                          <Link to="/dashboard/dash-my-profile">
                            <i className="fas fa-user-circle u-s-m-r-6"></i>
                            <span>Account</span>
                          </Link>
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
                      </ul>
                    )}
                  </li>
                  <li className="has-dropdown" data-tooltip="tooltip" data-placement="left" title="Settings">
                    <a><i className="fas fa-user-cog"></i></a>
                    <span className="js-menu-toggle"></span>
                    <ul style={{ width: '120px' }}>
                      <li className="has-dropdown has-dropdown--ul-right-100">
                        <a>Language<i className="fas fa-angle-down u-s-m-l-6"></i></a>
                        <span className="js-menu-toggle"></span>
                        <ul style={{ width: '120px' }}>
                          <li><a className="u-c-brand">ENGLISH</a></li>
                          <li><a>ARABIC</a></li>
                          <li><a>FRANCAIS</a></li>
                          <li><a>ESPANOL</a></li>
                        </ul>
                      </li>
                      <li className="has-dropdown has-dropdown--ul-right-100">
                        <a>Currency<i className="fas fa-angle-down u-s-m-l-6"></i></a>
                        <span className="js-menu-toggle"></span>
                        <ul style={{ width: '225px' }}>
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
                            <li>
                              <a href="index.html">
                                <i className="fas fa-utensils u-s-m-r-6"></i>
                                <span>Food & Supplies</span>
                              </a>
                              <span className="js-menu-toggle"></span>
                            </li>
                            <li>
                              <a href="index.html">
                                <i className="fas fa-couch u-s-m-r-6"></i>
                                <span>Furniture & Decor</span>
                              </a>
                              <span className="js-menu-toggle"></span>
                            </li>
                            <li>
                              <a href="index.html">
                                <i className="fas fa-football-ball u-s-m-r-6"></i>
                                <span>Sports & Game</span>
                              </a>
                              <span className="js-menu-toggle"></span>
                            </li>
                            <li>
                              <a href="index.html">
                                <i className="fas fa-heartbeat u-s-m-r-6"></i>
                                <span>Beauty & Health</span>
                              </a>
                              <span className="js-menu-toggle"></span>
                            </li>
                          </ul>
                        </div>

                        {/* Electronics Mega Menu */}
                        <div className="mega-menu-content js-active">
                          <div className="row">
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title"><a href="shop-side-version-2.html">3D PRINTER & SUPPLIES</a></li>
                                <li><a href="shop-side-version-2.html">3d Printer</a></li>
                                <li><a href="shop-side-version-2.html">3d Printing Pen</a></li>
                                <li><a href="shop-side-version-2.html">3d Printing Accessories</a></li>
                                <li><a href="shop-side-version-2.html">3d Printer Module Board</a></li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title"><a href="shop-side-version-2.html">HOME AUDIO & VIDEO</a></li>
                                <li><a href="shop-side-version-2.html">TV Boxes</a></li>
                                <li><a href="shop-side-version-2.html">TC Receiver & Accessories</a></li>
                                <li><a href="shop-side-version-2.html">Display Dongle</a></li>
                                <li><a href="shop-side-version-2.html">Home Theater System</a></li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title"><a href="shop-side-version-2.html">MEDIA PLAYERS</a></li>
                                <li><a href="shop-side-version-2.html">Earphones</a></li>
                                <li><a href="shop-side-version-2.html">Mp3 Players</a></li>
                                <li><a href="shop-side-version-2.html">Speakers & Radios</a></li>
                                <li><a href="shop-side-version-2.html">Microphones</a></li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title"><a href="shop-side-version-2.html">VIDEO GAME ACCESSORIES</a></li>
                                <li><a href="shop-side-version-2.html">Nintendo Video Games Accessories</a></li>
                                <li><a href="shop-side-version-2.html">Sony Video Games Accessories</a></li>
                                <li><a href="shop-side-version-2.html">Xbox Video Games Accessories</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
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
                  <li>
                    <Link to="/shopside">NEW ARRIVALS</Link>
                  </li>
                  <li className="has-dropdown">
                    <a>PAGES<i className="fas fa-angle-down u-s-m-l-6"></i></a>
                    <span className="js-menu-toggle"></span>
                    <ul style={{ width: '170px' }}>
                      <li className="has-dropdown has-dropdown--ul-left-100">
                        <a>Home<i className="fas fa-angle-down i-state-right u-s-m-l-6"></i></a>
                        <span className="js-menu-toggle"></span>
                        <ul style={{ width: '118px' }}>
                          <li><a href="index.html">Home 1</a></li>
                          <li><a href="index-2.html">Home 2</a></li>
                          <li><a href="index-3.html">Home 3</a></li>
                        </ul>
                      </li>
                      <li><a href="cart.html">Cart</a></li>
                      <li><a href="wishlist.html">Wishlist</a></li>
                      <li><a href="checkout.html">Checkout</a></li>
                      <li><a href="faq.html">FAQ</a></li>
                      <li><a href="about.html">About us</a></li>
                      <li><a href="contact.html">Contact</a></li>
                    </ul>
                  </li>
                  <li className="has-dropdown">
                    <a>BLOG<i className="fas fa-angle-down u-s-m-l-6"></i></a>
                    <span className="js-menu-toggle"></span>
                    <ul style={{ width: '200px' }}>
                      <li><a href="blog-left-sidebar.html">Blog Left Sidebar</a></li>
                      <li><a href="blog-right-sidebar.html">Blog Right Sidebar</a></li>
                      <li><a href="blog-sidebar-none.html">Blog Sidebar None</a></li>
                      <li><a href="blog-masonry.html">Blog Masonry</a></li>
                      <li><a href="blog-detail.html">Blog Details</a></li>
                    </ul>
                  </li>
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
                      <div className="mini-product-container gl-scroll u-s-m-b-15">
                        {/* Mini cart items would go here */}
                        <div className="card-mini-product">
                          <div className="mini-product">
                            <div className="mini-product__image-wrapper">
                              <a className="mini-product__link" href="product-detail.html">
                                <img className="u-img-fluid" src="images/product/electronic/product3.jpg" alt="" />
                              </a>
                            </div>
                            <div className="mini-product__info-wrapper">
                              <span className="mini-product__category">
                                <a href="shop-side-version-2.html">Electronics</a>
                              </span>
                              <span className="mini-product__name">
                                <a href="product-detail.html">Yellow Wireless Headphone</a>
                              </span>
                              <span className="mini-product__quantity">1 x</span>
                              <span className="mini-product__price">$8</span>
                            </div>
                          </div>
                          <a className="mini-product__delete-link far fa-trash-alt"></a>
                        </div>
                      </div>
                      <div className="mini-product-stat">
                        <div className="mini-total">
                          <span className="subtotal-text">SUBTOTAL</span>
                          <span className="subtotal-value">$16</span>
                        </div>
                        <div className="mini-action">
                          <a className="mini-link btn--e-brand-b-2" href="checkout.html">PROCEED TO CHECKOUT</a>
                          <a className="mini-link btn--e-transparent-secondary-b-2" href="cart.html">VIEW CART</a>
                        </div>
                      </div>
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