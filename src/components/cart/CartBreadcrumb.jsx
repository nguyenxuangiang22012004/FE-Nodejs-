import React from 'react';

const CartBreadcrumb = () => {
  return (
    <div className="breadcrumb">
      <div className="breadcrumb__wrap">
        <ul className="breadcrumb__list">
          <li className="has-separator">
            <a href="/">Home</a>
          </li>
          <li className="is-marked">
            <a href="/cart">Cart</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CartBreadcrumb;