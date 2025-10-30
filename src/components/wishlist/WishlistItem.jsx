import React from "react";
import { Link } from "react-router-dom";

const WishlistItem = ({ item, onRemove, onAddToCart }) => {
  return (
    <div className="w-r u-s-m-b-30">
      <div className="w-r__container">
        <div className="w-r__wrap-1">
          <div className="w-r__img-wrap">
            <img className="u-img-fluid" src={item.image} alt={item.name} />
          </div>
          <div className="w-r__info">
            <span className="w-r__name">
              <Link to={`/product/${item.id}`}>{item.name}</Link>
            </span>
            <span className="w-r__category">
              <Link to={`/shop?category=${item.category}`}>
                {item.category}
              </Link>
            </span>
            <span className="w-r__price">
              {item.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
              <span className="w-r__discount">
                {item.originalPrice &&
                  item.originalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
              </span>
            </span>
          </div>
        </div>
        <div className="w-r__wrap-2">
          <button
            className="w-r__link btn--e-brand-b-2"
            // onClick={() => onAddToCart(item)}
          >
            ADD TO CART
          </button>
          <Link
            className="w-r__link btn--e-transparent-platinum-b-2"
            to={`/product/${item.id}`}
          >
            VIEW
          </Link>
          <button
            className="w-r__link btn--e-transparent-platinum-b-2"
            onClick={() => onRemove(item.id)}
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
