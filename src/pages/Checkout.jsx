import React, { useState, useEffect } from 'react';
import { getPaymentMethods } from '../services/CheckoutService';
import { getUserAddresses } from '../services/AddressService';
const Checkout = () => {
  const [showReturnCustomer, setShowReturnCustomer] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [makeDefaultAddress, setMakeDefaultAddress] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };
  const [userAddress, setUserAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: ''
  });
  const handlePlaceOrder = () => {
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

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const res = await getPaymentMethods();
        setPaymentMethods(res.data);
      } catch (error) {
        console.error('Không thể tải danh sách phương thức thanh toán:', error);
      }
    };

    fetchPaymentMethods();
  }, []);

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const res = await getUserAddresses();
        const defaultAddress = Array.isArray(res.data)
          ? res.data.find((addr) => addr.isDefault) || res.data[0]
          : res.data;

        if (defaultAddress) {
          setUserAddress({
            firstName: defaultAddress.firstName || '',
            lastName: defaultAddress.lastName || '',
            email: storedUser.email || '', 
            phone: defaultAddress.phoneNumber || '',
            street: defaultAddress.location || ''
          });
        }
      } catch (error) {
        console.error('❌ Lỗi khi tải địa chỉ người dùng:', error);
      }
    };

    fetchUserAddress();
  }, []);

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
                      <div className="gl-inline">
                        <div className="u-s-m-b-15">
                          <label className="gl-label" htmlFor="billing-fname">FIRST NAME *</label>
                          <input
                            className="input-text input-text--primary-style"
                            type="text"
                            id="billing-fname"
                            value={userAddress.firstName}
                            onChange={(e) => setUserAddress({ ...userAddress, firstName: e.target.value })}
                          />
                        </div>

                        <div className="u-s-m-b-15">
                          <label className="gl-label" htmlFor="billing-lname">LAST NAME *</label>
                          <input
                            className="input-text input-text--primary-style"
                            type="text"
                            id="billing-lname"
                            value={userAddress.lastName}
                            onChange={(e) => setUserAddress({ ...userAddress, lastName: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="u-s-m-b-15">
                        <label className="gl-label" htmlFor="billing-email">E-MAIL *</label>
                        <input
                          className="input-text input-text--primary-style"
                          type="text"
                          id="billing-email"
                          value={userAddress.email}
                          onChange={(e) => setUserAddress({ ...userAddress, email: e.target.value })}
                        />
                      </div>

                      <div className="u-s-m-b-15">
                        <label className="gl-label" htmlFor="billing-phone">PHONE *</label>
                        <input
                          className="input-text input-text--primary-style"
                          type="text"
                          id="billing-phone"
                          value={userAddress.phone}
                          onChange={(e) => setUserAddress({ ...userAddress, phone: e.target.value })}
                        />
                      </div>

                      <div className="u-s-m-b-15">
                        <label className="gl-label" htmlFor="billing-street">STREET ADDRESS *</label>
                        <input
                          className="input-text input-text--primary-style"
                          type="text"
                          id="billing-street"
                          placeholder="House name and street name"
                          value={userAddress.street}
                          onChange={(e) => setUserAddress({ ...userAddress, street: e.target.value })}
                        />
                      </div>

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
                          {paymentMethods.length > 0 ? (
                            paymentMethods
                              .filter((p) => p.isActive)
                              .map((payment) => (
                                <div className="u-s-m-b-10" key={payment.id}>
                                  <div className="radio-box">
                                    <input
                                      type="radio"
                                      id={payment.id}
                                      name="payment"
                                      checked={paymentMethod === payment.type}
                                      onChange={() => handlePaymentChange(payment.type)}
                                    />
                                    <div className="radio-box__state radio-box__state--primary">
                                      <label className="radio-box__label" htmlFor={payment.id}>
                                        {payment.name}
                                      </label>
                                    </div>
                                  </div>

                                  {payment.description && (
                                    <span className="gl-text u-s-m-t-6">{payment.description}</span>
                                  )}
                                </div>
                              ))
                          ) : (
                            <p>Đang tải danh sách phương thức thanh toán...</p>
                          )}

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