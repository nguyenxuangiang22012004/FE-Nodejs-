import React from 'react';

const DashboardSidebar = ({ activePage }) => {
  return (
    <>
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
              <a className={activePage === 'address-book' ? 'dash-active' : ''} href="dash-address-book.html">
                Address Book
              </a>
            </li>
            <li>
              <a href="dash-track-order.html">Track Order</a>
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
      {/*====== End - Dashboard Features ======*/}
    </>
  );
};

export default DashboardSidebar;