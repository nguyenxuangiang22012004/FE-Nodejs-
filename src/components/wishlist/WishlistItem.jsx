import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const WishlistItem = ({ item, onRemove, onAddToCart }) => {
  const product = item.product || {}; 
  const { id, name, description, price, imageUrl, subcategoryId } = product;

  return (
    <div className="w-r u-s-m-b-30">
      <div className="w-r__container">
        <div className="w-r__wrap-1">
          <div className="w-r__img-wrap">
            <img
              className="u-img-fluid"
              src={imageUrl || "/images/default.png"}
              alt={name}
            />
          </div>
          <div className="w-r__info">
            <span className="w-r__name">
              <Link to={`/product-detail/${id}`}>{name}</Link>
            </span>

            <span className="w-r__category">
              <Link to={`#`}>
                {description || "Uncategorized"}
              </Link>
            </span>

            <span className="w-r__price">
              {price
                ? price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                : "N/A"}
            </span>
          </div>
        </div>

        <div className="w-r__wrap-2">
          <button
            className="w-r__link btn--e-brand-b-2"
            onClick={() => onAddToCart(item)}
          >
            ADD TO CART
          </button>

          <Link
            className="w-r__link btn--e-transparent-platinum-b-2"
            to={`/product-detail/${id}`}
          >
            VIEW
          </Link>

          <button
            className="w-r__link btn--e-transparent-platinum-b-2"
            onClick={() => onRemove(item.productId)}
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
