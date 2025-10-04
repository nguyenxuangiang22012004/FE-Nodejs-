import React, { useState } from 'react';
import CartBreadcrumb from '../components/cart/CartBreadcrumb';
import CartItems from '../components/cart/CartItems';
import CartSummary from '../components/cart/CartSummary';
import ShippingCalculator from '../components/cart/ShippingCalculator';
import CartNote from '../components/cart/CartNote';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Yellow Wireless Headphone',
      category: 'Electronics',
      price: 125.00,
      quantity: 1,
      image: 'images/product/electronic/product3.jpg',
      variants: [
        { name: 'Size', value: '22' },
        { name: 'Color', value: 'Red' }
      ]
    },
    {
      id: 2,
      name: 'New Dress D Nice Elegant',
      category: 'Women Clothing',
      price: 125.00,
      quantity: 1,
      image: 'images/product/women/product8.jpg',
      variants: [
        { name: 'Size', value: '22' },
        { name: 'Color', value: 'Red' }
      ]
    },
    {
      id: 3,
      name: 'New Fashion D Nice Elegant',
      category: 'Men Clothing',
      price: 125.00,
      quantity: 1,
      image: 'images/product/men/product8.jpg',
      variants: [
        { name: 'Size', value: '22' },
        { name: 'Color', value: 'Red' }
      ]
    }
  ]);

  const [shippingInfo, setShippingInfo] = useState({
    country: '',
    state: '',
    zip: ''
  });

  const [note, setNote] = useState('');

  const handleQuantityChange = (id, change) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleUpdateCart = () => {
    // Logic to update cart
    console.log('Cart updated');
  };

  const handleShippingInfoChange = (field, value) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculateShipping = () => {
    // Logic to calculate shipping
    console.log('Calculating shipping with:', shippingInfo);
  };

  const handleNoteChange = (value) => {
    setNote(value);
  };

  const handleProceedToCheckout = () => {
    // Logic to proceed to checkout
    console.log('Proceeding to checkout');
  };

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 4.00;
  const tax = 0.00;
  const grandTotal = subtotal + shipping + tax;

  return (
    <>
      {/* Section 1 - Breadcrumb */}
      <div className="u-s-p-y-60">
        <div className="section__content">
          <div className="container">
            <CartBreadcrumb />
          </div>
        </div>
      </div>

      {/* Section 2 - Cart Items */}
      <div className="u-s-p-b-60">
        {/* Section Intro */}
        <div className="section__intro u-s-m-b-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary">SHOPPING CART</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Content */}
        <div className="section__content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
                <CartItems 
                  items={cartItems}
                  onQuantityChange={handleQuantityChange}
                  onRemoveItem={handleRemoveItem}
                />
              </div>
              <div className="col-lg-12">
                <div className="route-box">
                  <div className="route-box__g1">
                    <a className="route-box__link" href="/shop">
                      <i className="fas fa-long-arrow-alt-left"></i>
                      <span>CONTINUE SHOPPING</span>
                    </a>
                  </div>
                  <div className="route-box__g2">
                    <button 
                      className="route-box__link" 
                      onClick={handleClearCart}
                    >
                      <i className="fas fa-trash"></i>
                      <span>CLEAR CART</span>
                    </button>
                    <button 
                      className="route-box__link" 
                      onClick={handleUpdateCart}
                    >
                      <i className="fas fa-sync"></i>
                      <span>UPDATE CART</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 - Cart Summary & Forms */}
      <div className="u-s-p-b-60">
        <div className="section__content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
                <form className="f-cart">
                  <div className="row">
                    <div className="col-lg-4 col-md-6 u-s-m-b-30">
                      <ShippingCalculator 
                        shippingInfo={shippingInfo}
                        onShippingInfoChange={handleShippingInfoChange}
                        onCalculateShipping={handleCalculateShipping}
                      />
                    </div>
                    <div className="col-lg-4 col-md-6 u-s-m-b-30">
                      <CartNote 
                        note={note}
                        onNoteChange={handleNoteChange}
                      />
                    </div>
                    <div className="col-lg-4 col-md-6 u-s-m-b-30">
                      <CartSummary 
                        subtotal={subtotal}
                        shipping={shipping}
                        tax={tax}
                        grandTotal={grandTotal}
                        onProceedToCheckout={handleProceedToCheckout}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;