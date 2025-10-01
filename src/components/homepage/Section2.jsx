
const Section2 = () => {
  const products = [
    { id: 1, category: 'headphone', img: 'product2.jpg', name: 'Red Wireless Headphone', price: '$125.00', discount: '$160.00', rating: 4.5, reviews: 23 },
    { id: 2, category: 'headphone', img: 'product3.jpg', name: 'Yellow Wireless Headphone', price: '$125.00', discount: '$160.00', rating: 2.5, reviews: 23 },
    { id: 3, category: 'sportgadget', img: 'product4.jpg', name: 'Hover Skateboard Scooter', price: '$125.00', discount: '$160.00', rating: 4.5, reviews: 23 },
    { id: 4, category: 'sportgadget', img: 'product5.jpg', name: 'Hover Red Skateboard Scooter', price: '$125.00', discount: '$160.00', rating: 4.5, reviews: 23 },
    { id: 5, category: 'dslr', img: 'product6.jpg', name: 'Canon DSLR Camera 4k', price: '$125.00', discount: '$160.00', rating: 4.5, reviews: 23 },
    { id: 6, category: 'dslr', img: 'product7.jpg', name: 'Nikon DSLR Camera 4k', price: '$125.00', discount: '$160.00', rating: 4.5, reviews: 23 },
    { id: 7, category: 'smartphone', img: 'product8.jpg', name: 'Smartphone RAM 4GB New', price: '$125.00', discount: '$160.00', rating: 4.5, reviews: 23 },
    { id: 8, category: 'smartphone', img: 'product9.jpg', name: 'Smartphone RAM 8GB New', price: '$125.00', discount: '$160.00', rating: 4.5, reviews: 23 },
    { id: 9, category: 'smartphone', img: 'product10.jpg', name: 'Smartphone RAM 16GB New', price: '$125.00', discount: '$160.00', rating: 4.5, reviews: 23 }
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
    <div className="u-s-p-b-60">
      <div className="section__intro u-s-m-b-16">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section__text-wrap">
                <h1 className="section__heading u-c-secondary u-s-m-b-12">TOP TRENDING</h1>
                <span className="section__span u-c-silver">CHOOSE CATEGORY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section__content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="filter-category-container">
                <div className="filter__category-wrapper">
                  <button className="btn filter__btn filter__btn--style-1 js-checked" type="button" data-filter="*">ALL</button>
                </div>
                <div className="filter__category-wrapper">
                  <button className="btn filter__btn filter__btn--style-1" type="button" data-filter=".headphone">HEADPHONES</button>
                </div>
                <div className="filter__category-wrapper">
                  <button className="btn filter__btn filter__btn--style-1" type="button" data-filter=".smartphone">SMARTPHONES</button>
                </div>
                <div className="filter__category-wrapper">
                  <button className="btn filter__btn filter__btn--style-1" type="button" data-filter=".sportgadget">SPORT GADGETS</button>
                </div>
                <div className="filter__category-wrapper">
                  <button className="btn filter__btn filter__btn--style-1" type="button" data-filter=".dslr">DSLR</button>
                </div>
              </div>
              <div className="filter__grid-wrapper u-s-m-t-30">
                <div className="row">
                  {products.map(product => (
                    <div key={product.id} className={`col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item ${product.category}`}>
                      <div className="product-o product-o--hover-on product-o--radius">
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
                        <span className="product-o__price">
                          {product.price}
                          <span className="product-o__discount">{product.discount}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-12">
                <div className="load-more">
                  <button className="btn btn--e-brand" type="button">Load More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;