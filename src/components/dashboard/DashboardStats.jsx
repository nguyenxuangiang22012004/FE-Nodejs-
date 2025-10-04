import React from 'react';

const DashboardStats = () => {
  return (
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
  );
};

export default DashboardStats;