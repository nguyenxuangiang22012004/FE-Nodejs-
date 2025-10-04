import React from 'react';

const RelatedProducts = () => {
  const products = [
    {
      id: 1,
      image: "images/product/electronic/product1.jpg",
      category: "Electronics",
      name: "Beats Bomb Wireless Headphone",
      price: "$125.00",
      discount: "$160.00",
      rating: 5,
      reviews: 20
    },
    {
      id: 2,
      image: "images/product/electronic/product2.jpg",
      category: "Electronics",
      name: "Red Wireless Headphone",
      price: "$125.00",
      discount: "$160.00",
      rating: 5,
      reviews: 20
    },
    {
      id: 3,
      image: "images/product/electronic/product3.jpg",
      category: "Electronics",
      name: "Yellow Wireless Headphone",
      price: "$125.00",
      discount: "$160.00",
      rating: 5,
      reviews: 20
    },
    {
      id: 4,
      image: "images/product/electronic/product23.jpg",
      category: "Electronics",
      name: "Razor Gear Ultra Slim 8GB Ram",
      price: "$125.00",
      discount: "$160.00",
      rating: 5,
      reviews: 20
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  return (
    <div className="u-s-p-b-90">
      {/*====== Section Intro ======*/}
      <div className="section__intro u-s-m-b-46">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section__text-wrap">
                <h1 className="section__heading u-c-secondary u-s-m-b-12">CUSTOMER ALSO VIEWED</h1>
                <span className="section__span u-c-grey">PRODUCTS THAT CUSTOMER VIEWED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*====== End - Section Intro ======*/}

      {/*====== Section Content ======*/}
      <div className="section__content">
        <div className="container">
          <div className="slider-fouc">
            <div className="owl-carousel product-slider" data-item="4">
              {products.map(product => (
                <div key={product.id} className="u-s-m-b-30">
                  <div className="product-o product-o--hover-on">
                    <div className="product-o__wrap">
                      <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img className="aspect__img" src={product.image} alt={product.name} />
                      </a>
                      <div className="product-o__action-wrap">
                        <ul className="product-o__action-list">
                          <li>
                            <a data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick View">
                              <i className="fas fa-search-plus"></i>
                            </a>
                          </li>
                          <li>
                            <a data-modal="modal" data-modal-id="#add-to-cart" data-tooltip="tooltip" data-placement="top" title="Add to Cart">
                              <i className="fas fa-plus-circle"></i>
                            </a>
                          </li>
                          <li>
                            <a href="signin.html" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist">
                              <i className="fas fa-heart"></i>
                            </a>
                          </li>
                          <li>
                            <a href="signin.html" data-tooltip="tooltip" data-placement="top" title="Email me When the price drops">
                              <i className="fas fa-envelope"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <span className="product-o__category">
                      <a href="shop-side-version-2.html">{product.category}</a>
                    </span>
                    <span className="product-o__name">
                      <a href="product-detail.html">{product.name}</a>
                    </span>
                    <div className="product-o__rating gl-rating-style">
                      {renderStars(product.rating)}
                      <span className="product-o__review">({product.reviews})</span>
                    </div>
                    <span className="product-o__price">
                      {product.price}
                      <span className="product-o__discount">{product.discount}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*====== End - Section Content ======*/}
    </div>
  );
};

export default RelatedProducts;