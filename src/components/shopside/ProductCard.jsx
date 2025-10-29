import { useState } from 'react';
import { Link } from 'react-router-dom';

// Modal Component
const AddToCartModal = ({ isOpen, onClose, product, cartItemCount }) => {
  if (!isOpen || !product) return null;

  return (
    <>
      <div 
        className={`modal fade ${isOpen ? 'show' : ''}`} 
        id="add-to-cart" 
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={onClose}
      >
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content modal-radius modal-shadow">
            <button className="btn dismiss-button fas fa-times" type="button" onClick={onClose}></button>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="success u-s-m-b-30">
                    <div className="success__text-wrap">
                      <i className="fas fa-check"></i>
                      <span>Item is added successfully!</span>
                    </div>
                    <div className="success__img-wrap">
                      <img className="u-img-fluid" src={product.image} alt={product.name} />
                    </div>
                    <div className="success__info-wrap">
                      <span className="success__name">{product.name}</span>
                      <span className="success__quantity">Quantity: 1</span>
                      <span className="success__price">{product.price}</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="s-option">
                    <span className="s-option__text">{cartItemCount} item(s) in your cart</span>
                    <div className="s-option__link-box">
                      <a className="s-option__link btn--e-white-brand-shadow" onClick={onClose}>
                        CONTINUE SHOPPING
                      </a>
                      <Link className="s-option__link btn--e-white-brand-shadow" to="/cart">
                        VIEW CART
                      </Link>
                      <Link className="s-option__link btn--e-brand-shadow" to="/checkout">
                        PROCEED TO CHECKOUT
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

// Updated ProductCard Component
const ProductCard = ({ product, onQuickLook, onAddToCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };

  const handleAddToCart = () => {
    // Call parent's onAddToCart if provided
    if (onAddToCart) {
      onAddToCart(product);
    }
    
    // Update cart count and show modal
    setCartCount(prev => prev + 1);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="product-m">
          <div className="product-m__thumb">
            <Link className="aspect aspect--bg-grey aspect--square u-d-block" to={`/product-detail/${product.id}`}>
              <img className="aspect__img" src={product.image} alt={product.name} />
            </Link>
            <div className="product-m__quick-look">
              <a className="fas fa-search" onClick={onQuickLook}></a>
            </div>
            <div className="product-m__add-cart">
              <a className="btn--e-brand" onClick={handleAddToCart}>Add to Cart</a>
            </div>
          </div>
          <div className="product-m__content">
            <div className="product-m__category">
              <Link to="/shop-side-version-2">{product.category}</Link>
            </div>
            <div className="product-m__name">
              <Link to="/product-detail">{product.name}</Link>
            </div>
            <div className="product-m__rating gl-rating-style">
              {renderStars(product.rating)}
              <span className="product-m__review">({product.reviews})</span>
            </div>
            <div className="product-m__price">{product.price}</div>
            <div className="product-m__hover">
              <div className="product-m__preview-description">
                <span>{product.description}</span>
              </div>
              <div className="product-m__wishlist">
                <a className="far fa-heart" href="#"></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddToCartModal 
        isOpen={showModal} 
        onClose={handleCloseModal} 
        product={product}
        cartItemCount={cartCount}
      />
    </>
  );
};

export default ProductCard;