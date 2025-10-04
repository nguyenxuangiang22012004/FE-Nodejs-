import React from 'react';

const ProductBreadcrumb = () => {
  return (
    <div className="pd-breadcrumb u-s-m-b-30">
      <ul className="pd-breadcrumb__list">
        <li className="has-separator">
          <a href="index.html">Home</a>
        </li>
        <li className="has-separator">
          <a href="shop-side-version-2.html">Electronics</a>
        </li>
        <li className="has-separator">
          <a href="shop-side-version-2.html">DSLR Cameras</a>
        </li>
        <li className="is-marked">
          <a href="shop-side-version-2.html">Nikon Cameras</a>
        </li>
      </ul>
    </div>
  );
};

export default ProductBreadcrumb;