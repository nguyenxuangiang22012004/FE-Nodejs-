import React from 'react';

const ProductInfo = ({ product = {}, quantity, onQuantityChange, onAddToCart }) => {
  return (
    <div className="pd-detail">
      <div>
        <span className="pd-detail__name">{product.name}</span>
      </div>
      <div>
        <div className="pd-detail__inline">
          <span className="pd-detail__price">${product.price}</span>
          <span className="pd-detail__discount">({product.discountedPrice}% OFF)</span>
          <del className="pd-detail__del">${product.originalPrice}</del>
        </div>
      </div>
      <div className="u-s-m-b-15">
        <div className="pd-detail__rating gl-rating-style">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half-alt"></i>
          <span className="pd-detail__review u-s-m-l-4">
            <a data-click-scroll="#view-review">{product.reviews} Reviews</a>
          </span>
        </div>
      </div>
      <div className="u-s-m-b-15">
        <div className="pd-detail__inline">
          <span className="pd-detail__stock">{product.stockQuantity} in stock</span>
          <span className="pd-detail__left">Only {product.left} left</span>
        </div>
      </div>
      <div className="u-s-m-b-15">
        <span className="pd-detail__preview-desc">
          {product.escription}
        </span>
      </div>
      <div className="u-s-m-b-15">
        <div className="pd-detail__inline">
          <span className="pd-detail__click-wrap">
            <i className="far fa-heart u-s-m-r-6"></i>
            <a href="signin.html">Add to Wishlist</a>
            <span className="pd-detail__click-count">({product.wishlistCount})</span>
          </span>
        </div>
      </div>
      <div className="u-s-m-b-15">
        <div className="pd-detail__inline">
          <span className="pd-detail__click-wrap">
            <i className="far fa-envelope u-s-m-r-6"></i>
            <a href="signin.html">Email me When the price drops</a>
            <span className="pd-detail__click-count">({product.priceDropCount})</span>
          </span>
        </div>
      </div>
      <div className="u-s-m-b-15">
        <ul className="pd-social-list">
          <li>
            <a className="s-fb--color-hover" href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a className="s-tw--color-hover" href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a className="s-insta--color-hover" href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a className="s-wa--color-hover" href="#">
              <i className="fab fa-whatsapp"></i>
            </a>
          </li>
          <li>
            <a className="s-gplus--color-hover" href="#">
              <i className="fab fa-google-plus-g"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="u-s-m-b-15">
        <form className="pd-detail__form">
          <div className="pd-detail-inline-2">
            <div className="u-s-m-b-15">
              <div className="input-counter">
                <span
                  className="input-counter__minus fas fa-minus"
                  onClick={() => onQuantityChange(-1)}
                ></span>
                <input
                  className="input-counter__text input-counter--text-primary-style"
                  type="text"
                  value={quantity}
                  readOnly
                />
                <span
                  className="input-counter__plus fas fa-plus"
                  onClick={() => onQuantityChange(1)}
                ></span>
              </div>
            </div>
            <div className="u-s-m-b-15">
              <button className="btn btn--e-brand-b-2" type="button" onClick={onAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="u-s-m-b-15">
        <span className="pd-detail__label u-s-m-b-8">Product Policy:</span>
        <ul className="pd-detail__policy-list">
          <li>
            <i className="fas fa-check-circle u-s-m-r-8"></i>
            <span>Buyer Protection.</span>
          </li>
          <li>
            <i className="fas fa-check-circle u-s-m-r-8"></i>
            <span>Full Refund if you don't receive your order.</span>
          </li>
          <li>
            <i className="fas fa-check-circle u-s-m-r-8"></i>
            <span>Returns accepted if product not as described.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;