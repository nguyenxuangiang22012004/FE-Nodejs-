import React, { useState } from 'react';

const DashTrackOrder = () => {
  const [trackingData, setTrackingData] = useState({
    orderId: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTrackingData(prevState => ({
      ...prevState,
      [id === 'order-id' ? 'orderId' : 'email']: value
    }));
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    console.log('Tracking order with:', trackingData);
    // Xử lý logic track order ở đây
  };

  return (
    <>
      {/*====== Section 1 - Breadcrumb ======*/}
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
                    <a href="dash-track-order.html">My Account</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*====== Section 2 - Track Order Content ======*/}
      <div className="u-s-p-b-60">
        <div className="section__content">
          <div className="dash">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-12">
                  {/*====== Dashboard Features ======*/}
                  <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                    <div className="dash__pad-1">
                      <span className="dash__text u-s-m-b-16">Hello, John Doe</span>
                      <ul className="dash__f-list">
                        <li>
                          <a href="dashboard.html">Manage My Account</a>
                        </li>
                        <li>
                          <a href="dash-my-profile.html">My Profile</a>
                        </li>
                        <li>
                          <a href="dash-address-book.html">Address Book</a>
                        </li>
                        <li>
                          <a className="dash-active" href="dash-track-order.html">Track Order</a>
                        </li>
                        <li>
                          <a href="dash-my-order.html">My Orders</a>
                        </li>
                        <li>
                          <a href="dash-payment-option.html">My Payment Options</a>
                        </li>
                        <li>
                          <a href="dash-cancellation.html">My Returns & Cancellations</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="dash__box dash__box--bg-white dash__box--shadow dash__box--w">
                    <div className="dash__pad-1">
                      <ul className="dash__w-list">
                        <li>
                          <div className="dash__w-wrap">
                            <span className="dash__w-icon dash__w-icon-style-1">
                              <i className="fas fa-cart-arrow-down"></i>
                            </span>
                            <span className="dash__w-text">4</span>
                            <span className="dash__w-name">Orders Placed</span>
                          </div>
                        </li>
                        <li>
                          <div className="dash__w-wrap">
                            <span className="dash__w-icon dash__w-icon-style-2">
                              <i className="fas fa-times"></i>
                            </span>
                            <span className="dash__w-text">0</span>
                            <span className="dash__w-name">Cancel Orders</span>
                          </div>
                        </li>
                        <li>
                          <div className="dash__w-wrap">
                            <span className="dash__w-icon dash__w-icon-style-3">
                              <i className="far fa-heart"></i>
                            </span>
                            <span className="dash__w-text">0</span>
                            <span className="dash__w-name">Wishlist</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-9 col-md-12">
                  <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
                    <div className="dash__pad-2">
                      <h1 className="dash__h1 u-s-m-b-14">Track your Order</h1>
                      
                      <span className="dash__text u-s-m-b-30">
                        To track your order please enter your Order ID in the box below and press the "Track" button. 
                        This was given to you on your receipt and in the confirmation email you should have received.
                      </span>
                      
                      <form className="dash-track-order" onSubmit={handleTrackOrder}>
                        <div className="gl-inline">
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="order-id">Order ID *</label>
                            <input 
                              className="input-text input-text--primary-style" 
                              type="text" 
                              id="order-id" 
                              placeholder="Found in your confirmation email"
                              value={trackingData.orderId}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="track-email">Email *</label>
                            <input 
                              className="input-text input-text--primary-style" 
                              type="email" 
                              id="track-email" 
                              placeholder="Email you used during checkout"
                              value={trackingData.email}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        
                        <button className="btn btn--e-brand-b-2" type="submit">
                          TRACK
                        </button>
                      </form>
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

export default DashTrackOrder;