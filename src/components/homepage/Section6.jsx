const Section6 = () => {
  const featuredProducts = [
    { id: 1, img: 'product19.jpg', name: 'Tablet 14inch Screen', rating: 4.5, reviews: 23 },
    { id: 2, img: 'product20.jpg', name: 'Tablet 18inch Screen', rating: 4.5, reviews: 23 },
    { id: 3, img: 'product21.jpg', name: 'Tablet 13inch Screen Ram 16GB', rating: 4.5, reviews: 23 },
    { id: 4, img: 'product22.jpg', name: 'Tablet 12inch Screen Ram 16GB', rating: 4.5, reviews: 23 }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }

    return stars;
  };

  return (
    <div className="u-s-p-y-60">
      <div className="section__intro u-s-m-b-46">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section__text-wrap">
                <h1 className="section__heading u-c-secondary u-s-m-b-12">FEATURED PRODUCTS</h1>
                <span className="section__span u-c-silver">FIND NEW FEATURED PRODUCTS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section__content">
        <div className="container">
          <div className="row">
            {featuredProducts.map(product => (
              <div key={product.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30">
                <div className="product-o product-o--hover-on u-h-100">
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
                    <span className="product-o__review">({product.reviews})</span>
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
  );
};

export default Section6;