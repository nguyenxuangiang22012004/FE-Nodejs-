import React from "react";
import { Link } from "react-router-dom";

const MiniCartHeader = () => {
  return (
    <div className="menu-init" id="navigation3">
      <button
        className="btn btn--icon toggle-button toggle-button--secondary fas fa-shopping-bag toggle-button-shop"
        type="button"
      ></button>
      <span className="total-item-round">2</span>

      <div className="ah-lg-mode">
        <span className="ah-close">✕ Close</span>
        <ul className="ah-list ah-list--design1 ah-list--link-color-secondary">
          <li>
            <Link to="/">
              <i className="fas fa-home u-c-brand"></i>
            </Link>
          </li>

          <li>
            <Link to="/wishlist">
              <i className="far fa-heart"></i>
            </Link>
          </li>

          <li className="has-dropdown">
            <a className="mini-cart-shop-link">
              <i className="fas fa-shopping-bag"></i>
              <span className="total-item-round">2</span>
            </a>
            <span className="js-menu-toggle"></span>

            <div className="mini-cart">
              <div className="mini-product-container gl-scroll u-s-m-b-15">
                {/* Mini cart items */}
                <div className="card-mini-product">
                  <div className="mini-product">
                    <div className="mini-product__image-wrapper">
                      <Link className="mini-product__link" to="/product-detail">
                        <img
                          className="u-img-fluid"
                          src="images/product/electronic/product3.jpg"
                          alt="Yellow Wireless Headphone"
                        />
                      </Link>
                    </div>
                    <div className="mini-product__info-wrapper">
                      <span className="mini-product__category">
                        <Link to="/shop-side-version-2">Electronics</Link>
                      </span>
                      <span className="mini-product__name">
                        <Link to="/product-detail">Yellow Wireless Headphone</Link>
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
                  <Link className="mini-link btn--e-brand-b-2" to="/checkout">
                    PROCEED TO CHECKOUT
                  </Link>
                  <Link
                    className="mini-link btn--e-transparent-secondary-b-2"
                    to="/cart"
                  >
                    VIEW CART
                  </Link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MiniCartHeader;
