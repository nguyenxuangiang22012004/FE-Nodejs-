import React, { useState } from 'react';

const Checkout = () => {
  const [showReturnCustomer, setShowReturnCustomer] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [useDefaultAddress, setUseDefaultAddress] = useState(false);
  const [makeDefaultAddress, setMakeDefaultAddress] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = () => {
    console.log('Placing order with payment method:', paymentMethod);
  };

  // Dữ liệu giỏ hàng mẫu
  const cartItems = [
    {
      id: 1,
      name: 'Yellow Wireless Headphone',
      image: 'images/product/electronic/product3.jpg',
      quantity: 1,
      price: 150.00
    },
    {
      id: 2,
      name: 'Nikon DSLR Camera 4k',
      image: 'images/product/electronic/product18.jpg',
      quantity: 1,
      price: 150.00
    },
    {
      id: 3,
      name: 'New Dress D Nice Elegant',
      image: 'images/product/women/product8.jpg',
      quantity: 1,
      price: 150.00
    },
    {
      id: 4,
      name: 'New Fashion D Nice Elegant',
      image: 'images/product/men/product8.jpg',
      quantity: 1,
      price: 150.00
    }
  ];

  const subtotal = 379.00;
  const shipping = 4.00;
  const tax = 0.00;
  const grandTotal = subtotal + shipping + tax;

  return (
    <>
      {/* Breadcrumb Section */}
      <div className="u-s-p-y-60">
        <div className="section__content">
          <div className="container">
            <div className="breadcrumb">
              <div className="breadcrumb__wrap">
                <ul className="breadcrumb__list">
                  <li className="has-separator">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="is-marked">
                    <a href="checkout.html">Checkout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Messages Section */}
      <div className="u-s-p-b-60">
        <div className="section__content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div id="checkout-msg-group">
                  {/* Returning Customer */}
                  <div className="msg u-s-m-b-30">
                    <span className="msg__text">
                      Returning customer?{' '}
                      <button 
                        className="gl-link" 
                        onClick={() => setShowReturnCustomer(!showReturnCustomer)}
                      >
                        Click here to login
                      </button>
                    </span>
                    {showReturnCustomer && (
                      <div className="l-f u-s-m-b-16">
                        <span className="gl-text u-s-m-b-16">
                          If you have an account with us, please log in.
                        </span>
                        <form className="l-f__form">
                          <div className="gl-inline">
                            <div className="u-s-m-b-15">
                              <label className="gl-label" htmlFor="login-email">
                                E-MAIL *
                              </label>
                              <input
                                className="input-text input-text--primary-style"
                                type="text"
                                id="login-email"
                                placeholder="Enter E-mail"
                              />
                            </div>
                            <div className="u-s-m-b-15">
                              <label className="gl-label" htmlFor="login-password">
                                PASSWORD *
                              </label>
                              <input
                                className="input-text input-text--primary-style"
                                type="password"
                                id="login-password"
                                placeholder="Enter Password"
                              />
                            </div>
                          </div>
                          <div className="gl-inline">
                            <div className="u-s-m-b-15">
                              <button className="btn btn--e-transparent-brand-b-2" type="submit">
                                LOGIN
                              </button>
                            </div>
                            <div className="u-s-m-b-15">
                              <a className="gl-link" href="lost-password.html">
                                Lost Your Password?
                              </a>
                            </div>
                          </div>
                          <div className="check-box">
                            <input type="checkbox" id="remember-me" />
                            <div className="check-box__state check-box__state--primary">
                              <label className="check-box__label" htmlFor="remember-me">
                                Remember Me
                              </label>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>

                  {/* Coupon Code */}
                  <div className="msg">
                    <span className="msg__text">
                      Have a coupon?{' '}
                      <button 
                        className="gl-link" 
                        onClick={() => setShowCoupon(!showCoupon)}
                      >
                        Click Here to enter your code
                      </button>
                    </span>
                    {showCoupon && (
                      <div className="c-f u-s-m-b-16">
                        <span className="gl-text u-s-m-b-16">
                          Enter your coupon code if you have one.
                        </span>
                        <form className="c-f__form">
                          <div className="u-s-m-b-16">
                            <div className="u-s-m-b-15">
                              <input
                                className="input-text input-text--primary-style"
                                type="text"
                                id="coupon"
                                placeholder="Coupon Code"
                              />
                            </div>
                            <div className="u-s-m-b-15">
                              <button className="btn btn--e-transparent-brand-b-2" type="submit">
                                APPLY
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Form Section */}
      <div className="u-s-p-b-60">
        <div className="section__content">
          <div className="container">
            <div className="checkout-f">
              <div className="row">
                {/* Delivery Information */}
                <div className="col-lg-6">
                  <h1 className="checkout-f__h1">DELIVERY INFORMATION</h1>
                  <form className="checkout-f__delivery">
                    <div className="u-s-m-b-30">
                      <div className="u-s-m-b-15">
                        <div className="check-box">
                          <input 
                            type="checkbox" 
                            id="get-address" 
                            checked={useDefaultAddress}
                            onChange={(e) => setUseDefaultAddress(e.target.checked)}
                          />
                          <div className="check-box__state check-box__state--primary">
                            <label className="check-box__label" htmlFor="get-address">
                              Use default shipping and billing address from account
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="gl-inline">
                        <div className="u-s-m-b-15">
                          <label className="gl-label" htmlFor="billing-fname">
                            FIRST NAME *
                          </label>
                          <input
                            className="input-text input-text--primary-style"
                            type="text"
                            id="billing-fname"
                            data-bill=""
                          />
                        </div>
                        <div className="u-s-m-b-15">
                          <label className="gl-label" htmlFor="billing-lname">
                            LAST NAME *
                          </label>
                          <input
                            className="input-text input-text--primary-style"
                            type="text"
                            id="billing-lname"
                            data-bill=""
                          />
                        </div>
                      </div>

                      <div className="u-s-m-b-15">
                        <label className="gl-label" htmlFor="billing-email">
                          E-MAIL *
                        </label>
                        <input
                          className="input-text input-text--primary-style"
                          type="text"
                          id="billing-email"
                          data-bill=""
                        />
                      </div>

                      <div className="u-s-m-b-15">
                        <label className="gl-label" htmlFor="billing-phone">
                          PHONE *
                        </label>
                        <input
                          className="input-text input-text--primary-style"
                          type="text"
                          id="billing-phone"
                          data-bill=""
                        />
                      </div>

                      <div className="u-s-m-b-15">
                        <label className="gl-label" htmlFor="billing-street">
                          STREET ADDRESS *
                        </label>
                        <input
                          className="input-text input-text--primary-style"
                          type="text"
                          id="billing-street"
                          placeholder="House name and street name"
                          data-bill=""
                        />
                      </div>
                      <div className="u-s-m-b-15">
                        <input
                          className="input-text input-text--primary-style"
                          type="text"
                          id="billing-street-optional"
                          placeholder="Apartment, suite unit etc. (optional)"
                          data-bill=""
                        />
                      </div>

                      <div className="u-s-m-b-15">
                        <label className="gl-label" htmlFor="billing-country">
                          COUNTRY *
                        </label>
                        <select className="select-box select-box--primary-style" id="billing-country" data-bill="">
                          <option value="">Choose Country</option>
                          <option value="uae">United Arab Emirate (UAE)</option>
                          <option value="uk">United Kingdom (UK)</option>
                          <option value="us">United States (US)</option>
                        </select>
                      </div>

                      <div className="u-s-m-b-15">
                        <label className="gl-label" htmlFor="billing-town-city">
                          TOWN/CITY *
                        </label>
                        <input
                          className="input-text input-text--primary-style"
                          type="text"
                          id="billing-town-city"
                          data-bill=""
                        />
                      </div>

                      <div className="u-s-m-b-15">
                        <label className="gl-label" htmlFor="billing-state">
                          STATE/PROVINCE *
                        </label>
                        <select className="select-box select-box--primary-style" id="billing-state" data-bill="">
                          <option value="">Choose State/Province</option>
                          <option value="al">Alabama</option>
                          <option value="al">Alaska</option>
                          <option value="ny">New York</option>
                        </select>
                      </div>

                      <div className="u-s-m-b-15">
                        <label className="gl-label" htmlFor="billing-zip">
                          ZIP/POSTAL CODE *
                        </label>
                        <input
                          className="input-text input-text--primary-style"
                          type="text"
                          id="billing-zip"
                          placeholder="Zip/Postal Code"
                          data-bill=""
                        />
                      </div>

                      <div className="u-s-m-b-10">
                        <div className="check-box">
                          <input 
                            type="checkbox" 
                            id="make-default-address" 
                            data-bill=""
                            checked={makeDefaultAddress}
                            onChange={(e) => setMakeDefaultAddress(e.target.checked)}
                          />
                          <div className="check-box__state check-box__state--primary">
                            <label className="check-box__label" htmlFor="make-default-address">
                              Make default shipping and billing address
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="u-s-m-b-10">
                        <button 
                          type="button"
                          className="gl-link" 
                          onClick={() => setShowCreateAccount(!showCreateAccount)}
                        >
                          Want to create a new account?
                        </button>
                      </div>

                      {showCreateAccount && (
                        <div className="u-s-m-b-15">
                          <span className="gl-text u-s-m-b-15">
                            Create an account by entering the information below. If you are a returning customer please login at the top of the page.
                          </span>
                          <div>
                            <label className="gl-label" htmlFor="reg-password">
                              Account Password *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="password"
                              data-bill
                              id="reg-password"
                            />
                          </div>
                        </div>
                      )}

                      <div className="u-s-m-b-10">
                        <label className="gl-label" htmlFor="order-note">
                          ORDER NOTE
                        </label>
                        <textarea className="text-area text-area--primary-style" id="order-note"></textarea>
                      </div>

                      <div>
                        <button className="btn btn--e-transparent-brand-b-2" type="submit">
                          SAVE
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Order Summary */}
                <div className="col-lg-6">
                  <h1 className="checkout-f__h1">ORDER SUMMARY</h1>

                  <div className="o-summary">
                    {/* Order Items */}
                    <div className="o-summary__section u-s-m-b-30">
                      <div className="o-summary__item-wrap gl-scroll">
                        {cartItems.map((item) => (
                          <div className="o-card" key={item.id}>
                            <div className="o-card__flex">
                              <div className="o-card__img-wrap">
                                <img className="u-img-fluid" src={item.image} alt={item.name} />
                              </div>
                              <div className="o-card__info-wrap">
                                <span className="o-card__name">
                                  <a href="product-detail.html">{item.name}</a>
                                </span>
                                <span className="o-card__quantity">Quantity x {item.quantity}</span>
                                <span className="o-card__price">${item.price.toFixed(2)}</span>
                              </div>
                            </div>
                            <a className="o-card__del far fa-trash-alt"></a>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping & Billing */}
                    <div className="o-summary__section u-s-m-b-30">
                      <div className="o-summary__box">
                        <h1 className="checkout-f__h1">SHIPPING & BILLING</h1>
                        <div className="ship-b">
                          <span className="ship-b__text">Ship to:</span>
                          <div className="ship-b__box u-s-m-b-10">
                            <p className="ship-b__p">
                              4247 Ashford Drive Virginia VA-20006 USA (+0) 900901904
                            </p>
                            <a className="ship-b__edit btn--e-transparent-platinum-b-2">
                              Edit
                            </a>
                          </div>
                          <div className="ship-b__box">
                            <span className="ship-b__text">Bill to default billing address</span>
                            <a className="ship-b__edit btn--e-transparent-platinum-b-2">
                              Edit
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Total */}
                    <div className="o-summary__section u-s-m-b-30">
                      <div className="o-summary__box">
                        <table className="o-summary__table">
                          <tbody>
                            <tr>
                              <td>SHIPPING</td>
                              <td>${shipping.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td>TAX</td>
                              <td>${tax.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td>SUBTOTAL</td>
                              <td>${subtotal.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td>GRAND TOTAL</td>
                              <td>${grandTotal.toFixed(2)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="o-summary__section u-s-m-b-30">
                      <div className="o-summary__box">
                        <h1 className="checkout-f__h1">PAYMENT INFORMATION</h1>
                        <form className="checkout-f__payment">
                          {[
                            { id: 'cash-on-delivery', label: 'Cash on Delivery', description: 'Pay Upon Cash on delivery. (This service is only available for some countries)' },
                            { id: 'direct-bank-transfer', label: 'Direct Bank Transfer', description: 'Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.' },
                            { id: 'pay-with-check', label: 'Pay With Check', description: 'Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.' },
                            { id: 'pay-with-card', label: 'Pay With Credit / Debit Card', description: 'International Credit Cards must be eligible for use within the United States.' },
                            { id: 'pay-pal', label: 'Pay Pal', description: 'When you click "Place Order" below we\'ll take you to Paypal\'s site to set up your billing information.' }
                          ].map((payment) => (
                            <div className="u-s-m-b-10" key={payment.id}>
                              <div className="radio-box">
                                <input
                                  type="radio"
                                  id={payment.id}
                                  name="payment"
                                  checked={paymentMethod === payment.id}
                                  onChange={() => handlePaymentChange(payment.id)}
                                />
                                <div className="radio-box__state radio-box__state--primary">
                                  <label className="radio-box__label" htmlFor={payment.id}>
                                    {payment.label}
                                  </label>
                                </div>
                              </div>
                              <span className="gl-text u-s-m-t-6">{payment.description}</span>
                            </div>
                          ))}

                          <div className="u-s-m-b-15">
                            <div className="check-box">
                              <input
                                type="checkbox"
                                id="term-and-condition"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                              />
                              <div className="check-box__state check-box__state--primary">
                                <label className="check-box__label" htmlFor="term-and-condition">
                                  I consent to the
                                </label>
                              </div>
                            </div>
                            <a className="gl-link">Terms of Service.</a>
                          </div>

                          <div>
                            <button 
                              className="btn btn--e-brand-b-2" 
                              type="button"
                              onClick={handlePlaceOrder}
                              disabled={!paymentMethod || !agreeTerms}
                            >
                              PLACE ORDER
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;