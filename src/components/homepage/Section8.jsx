const Section8 = () => {
  const products = {
    special: [
      { id: 1, img: 'product23.jpg', name: 'Razor Gear 15 Ram 16GB', price: '$125.00' },
      { id: 2, img: 'product24.jpg', name: 'Razor Gear 13 Ram 16GB', price: '$125.00' },
      { id: 3, img: 'product25.jpg', name: 'Razor Gear 15 Ram 8GB', price: '$125.00' }
    ],
    weekly: [
      { id: 1, img: 'product26.jpg', name: 'Razor Gear 10 Ram 16GB', price: '$125.00', discount: '$160' },
      { id: 2, img: 'product27.jpg', name: 'Razor Gear 15 Ram 8GB', price: '$125.00', discount: '$160' },
      { id: 3, img: 'product28.jpg', name: 'Razor Gear 15 Ultra Ram 16GB', price: '$125.00', discount: '$160' }
    ],
    flash: [
      { id: 1, img: 'product29.jpg', name: 'Razor Gear 20 Ultra Ram 16GB', price: '$125.00', rating: 3 },
      { id: 2, img: 'product30.jpg', name: 'Razor Gear 11 Ultra Ram 16GB', price: '$125.00', rating: 3 },
      { id: 3, img: 'product31.jpg', name: 'Razor Gear 10 Ultra Ram 16GB', price: '$125.00', rating: 3 }
    ]
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  return (
    <div className="u-s-p-b-60">
      <div className="section__content">
        <div className="container">
          <div className="row">
            {/* Special Products */}
            <div className="col-lg-4 col-md-6 col-sm-6 u-s-m-b-30">
              <div className="column-product">
                <span className="column-product__title u-c-secondary u-s-m-b-25">SPECIAL PRODUCTS</span>
                <ul className="column-product__list">
                  {products.special.map(product => (
                    <li key={product.id} className="column-product__item">
                      <div className="product-l">
                        <div className="product-l__img-wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block product-l__link" href="product-detail.html">
                            <img className="aspect__img" src={`images/product/electronic/${product.img}`} alt={product.name} />
                          </a>
                        </div>
                        <div className="product-l__info-wrap">
                          <span className="product-l__category">
                            <a href="shop-side-version-2.html">Electronics</a>
                          </span>
                          <span className="product-l__name">
                            <a href="product-detail.html">{product.name}</a>
                          </span>
                          <span className="product-l__price">{product.price}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Weekly Products */}
            <div className="col-lg-4 col-md-6 col-sm-6 u-s-m-b-30">
              <div className="column-product">
                <span className="column-product__title u-c-secondary u-s-m-b-25">WEEKLY PRODUCTS</span>
                <ul className="column-product__list">
                  {products.weekly.map(product => (
                    <li key={product.id} className="column-product__item">
                      <div className="product-l">
                        <div className="product-l__img-wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block product-l__link" href="product-detail.html">
                            <img className="aspect__img" src={`images/product/electronic/${product.img}`} alt={product.name} />
                          </a>
                        </div>
                        <div className="product-l__info-wrap">
                          <span className="product-l__category">
                            <a href="shop-side-version-2.html">Electronics</a>
                          </span>
                          <span className="product-l__name">
                            <a href="product-detail.html">{product.name}</a>
                          </span>
                          <span className="product-l__price">
                            {product.price}
                            <span className="product-l__discount">{product.discount}</span>
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Flash Products */}
            <div className="col-lg-4 col-md-6 col-sm-6 u-s-m-b-30">
              <div className="column-product">
                <span className="column-product__title u-c-secondary u-s-m-b-25">FLASH PRODUCTS</span>
                <ul className="column-product__list">
                  {products.flash.map(product => (
                    <li key={product.id} className="column-product__item">
                      <div className="product-l">
                        <div className="product-l__img-wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block product-l__link" href="product-detail.html">
                            <img className="aspect__img" src={`images/product/electronic/${product.img}`} alt={product.name} />
                          </a>
                        </div>
                        <div className="product-l__info-wrap">
                          <div className="product-l__rating gl-rating-style">
                            {renderStars(product.rating)}
                          </div>
                          <span className="product-l__category">
                            <a href="shop-side-version-2.html">Electronics</a>
                          </span>
                          <span className="product-l__name">
                            <a href="product-detail.html">{product.name}</a>
                          </span>
                          <span className="product-l__price">{product.price}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section8;