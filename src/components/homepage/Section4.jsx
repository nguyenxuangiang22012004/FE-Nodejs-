const Section4 = () => {
  const newArrivals = [
    { id: 1, img: 'product13.jpg', name: 'Nikon DSLR 4K Camera', rating: 0 },
    { id: 2, img: 'product14.jpg', name: 'Nikon DSLR 2K Camera', rating: 0 },
    { id: 3, img: 'product15.jpg', name: 'Sony DSLR 4K Camera', rating: 0 },
    { id: 4, img: 'product16.jpg', name: 'Sony DSLR 2K Camera', rating: 0 },
    { id: 5, img: 'product17.jpg', name: 'Canon DSLR 4K Camera', rating: 0 },
    { id: 6, img: 'product18.jpg', name: 'Canon DSLR 2K Camera', rating: 0 }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<i key={i} className="far fa-star"></i>);
    }
    return stars;
  };

  return (
    <div className="u-s-p-b-60">
      <div className="section__intro u-s-m-b-46">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section__text-wrap">
                <h1 className="section__heading u-c-secondary u-s-m-b-12">NEW ARRIVALS</h1>
                <span className="section__span u-c-silver">GET UP FOR NEW ARRIVALS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section__content">
        <div className="container">
          <div className="slider-fouc">
            <div className="owl-carousel product-slider" data-item="4">
              {newArrivals.map(product => (
                <div key={product.id} className="u-s-m-b-30">
                  <div className="product-o product-o--hover-on">
                    <div className="product-o__wrap">
                      <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img className="aspect__img" src={`images/product/electronic/${product.img}`} alt={product.name} />
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
                      <a href="shop-side-version-2.html">Electronics</a>
                    </span>
                    <span className="product-o__name">
                      <a href="product-detail.html">{product.name}</a>
                    </span>
                    <div className="product-o__rating gl-rating-style">
                      {renderStars(product.rating)}
                      <span className="product-o__review">(0)</span>
                    </div>
                    <span className="product-o__price">$125.00
                      <span className="product-o__discount">$160.00</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4;