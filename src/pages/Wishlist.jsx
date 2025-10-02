import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Yellow Wireless Headphone',
      category: 'Electronics',
      image: 'images/product/electronic/product3.jpg',
      price: 125.00,
      originalPrice: 160.00,
      inStock: true
    },
    {
      id: 2,
      name: 'New Dress D Nice Elegant',
      category: 'Women Clothing',
      image: 'images/product/women/product8.jpg',
      price: 125.00,
      originalPrice: 160.00,
      inStock: true
    },
    {
      id: 3,
      name: 'New Fashion D Nice Elegant',
      category: 'Men Clothing',
      image: 'images/product/men/product8.jpg',
      price: 125.00,
      originalPrice: 160.00,
      inStock: true
    }
  ]);

  const breadcrumbItems = [
    { label: 'Home', link: '/', hasSeparator: true },
    { label: 'Wishlist', link: '/wishlist', isMarked: true }
  ];

  const handleRemoveItem = (itemId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleAddToCart = (item) => {
    // Logic to add item to cart
    console.log('Adding to cart:', item);
    // You can integrate with your cart context or state management here
  };

  const handleClearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <div className="wishlist-page">
      {/* Section 1 - Breadcrumb */}
      <div className="u-s-p-y-60">
        <div className="section__content">
          <div className="container">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
      </div>

      {/* Section 2 - Wishlist Content */}
      <div className="u-s-p-b-60">
        {/* Section Intro */}
        <div className="section__intro u-s-m-b-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary">Wishlist</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Content */}
        <div className="section__content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                {wishlistItems.length === 0 ? (
                  <div className="empty-wishlist">
                    <div className="empty-wishlist__icon">
                      <i className="far fa-heart"></i>
                    </div>
                    <h3 className="empty-wishlist__title">Your wishlist is empty</h3>
                    <p className="empty-wishlist__text">Start adding items you love to your wishlist!</p>
                    <Link to="/shop" className="btn btn--e-brand">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <>
                    {wishlistItems.map(item => (
                      <WishlistItem 
                        key={item.id}
                        item={item}
                        onRemove={handleRemoveItem}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                    
                    <div className="col-lg-12">
                      <div className="route-box">
                        <div className="route-box__g">
                          <Link className="route-box__link" to="/shop">
                            <i className="fas fa-long-arrow-alt-left"></i>
                            <span>CONTINUE SHOPPING</span>
                          </Link>
                        </div>
                        <div className="route-box__g">
                          <button 
                            className="route-box__link" 
                            onClick={handleClearWishlist}
                          >
                            <i className="fas fa-trash"></i>
                            <span>CLEAR WISHLIST</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wishlist Item Component
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
              <Link to={`/shop?category=${item.category}`}>{item.category}</Link>
            </span>
            <span className="w-r__price">
              ${item.price.toFixed(2)}
              <span className="w-r__discount">${item.originalPrice.toFixed(2)}</span>
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

export default Wishlist;